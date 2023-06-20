function requireAuth(req, res, next) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  return next();
}

module.exports = requireAuth;
