import passport from "passport";

// Protefe con passport-jwt leyendo la cookie 'acces_token'
export const requiereJwtCookie = passport.authenticate('jwt-cookie', {session: false});

// Autorizacion por rol simple
export const requireRole = (...roles) => (req, res, next) => {
    // passport coloca al user en req.user
    if(!req.user) return res.status(401).json({error: 'Unauthorized'});
    if(!roles.includes(req.user.role)) return res.status(403).json({error: 'Cannot continue.'});
    next();
};

// Autorizacion por rol simple
export const policies = (...roles) => (req, res, next) => {
    // passport coloca al user en req.user
    if(!req.user) return res.status(401).json({error: 'Unauthorized'});
    if(!roles.includes(req.user.role)) return res.status(403).json({error: 'Cannot continue.'});
    next();
};

export const extractUserId = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'User not found.' });
  }
  req.userId = req.user._id.toString(); 
  next();
};
