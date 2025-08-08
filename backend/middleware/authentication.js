import jwt from 'jsonwebtoken' ;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default function authenticate(req, res, next) {
    console.log('authentication middleware') ;
  try {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    
    const token = authHeader.split(' ')[1]; // Get the token part
    console.log('Extracted token from Authorization header:', token)

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = decoded; 
    console.log('user' ,req.user) ;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid Supabase token' });
  }
}


