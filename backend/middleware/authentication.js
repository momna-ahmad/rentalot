import jwt from 'jsonwebtoken' ;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default function authenticate(req, res, next) {
    
  try {
    
    let token;

  // Check for token in Authorization header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    
  } else if (req.cookies.token) {
    console.log('Token found in cookies' , req.cookies) ;
    token = req.cookies.token;
    
  }
  if (!token) {
    console.log("No token found in request");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid Supabase token' });
  }
}


