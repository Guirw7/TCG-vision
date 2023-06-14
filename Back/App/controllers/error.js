const errors = {

  /**
   * Fonction pour gérer l'erreur 404
   */
  error404(req, res) {
    res.status(404).json({ status: 'error', message: 'Page non trouvée' });
  },
};

module.exports = errors;
