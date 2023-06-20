function requireAuth(req, res, next) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  next();
  return res.status(200).json({ message: 'Autorisé' });
}

module.exports = requireAuth;
