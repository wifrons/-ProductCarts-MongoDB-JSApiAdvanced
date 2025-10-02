import passport from "passport";

export const requiereJwtCookie = (req, res, next) => {

  passport.authenticate('jwt-cookie', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    req.user = user;
    next();
  })(req, res, next);
};

// Autorizacion por rol simple
export const requireRole = (...roles) => (req, res, next) => {

    if(!req.user) return res.status(401).json({error: 'Unauthorized'});
    if(!roles.includes(req.user.role)) return res.status(403).json({error: 'Unauthorized: Cannot continue.'});
    next();
};

// Autorizacion por rol simple
export const policies = (...roles) => (req, res, next) => {
    // passport coloca al user en req.user
    if(!req.user) return res.status(401).json({error: 'Unauthorized'});
    if(!roles.includes(req.user.role)) return res.status(403).json({error: 'Unauthorized: Cannot continue.'});
    next();
};

export const extractUserId = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'User not found.' });
  }
  req.userId = req.user._id.toString(); 
  next();
};
