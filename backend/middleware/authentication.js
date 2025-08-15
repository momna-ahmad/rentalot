import jwt from 'jsonwebtoken' ;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default function authenticate(req, res, next) {
    
  try {
    
    const authHeader = req.headers.authorization;
    
    const token = authHeader.split(' ')[1]; // Get the token part

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid Supabase token' });
  }
}


