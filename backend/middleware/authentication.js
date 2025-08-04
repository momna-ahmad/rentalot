import jwt from 'jsonwebtoken' ;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default function authenticate(req, res, next) {
    console.log('authentication middleware') ;
  try {
    const sessionCookie = req.cookies.session;
    if (!sessionCookie){
        console.log('unauthorized') ;
         return res.status(401).json({ error: 'Unauthorized: No session' });
    }

    const session = JSON.parse(sessionCookie);
    const token = session.token.access_token ;

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid Supabase token' });
  }
}


