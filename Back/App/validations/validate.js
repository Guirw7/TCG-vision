function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      messages: {
        'string.pattern.base': 'Password doit contenir au moins 1 lettres minuscule et majuscule, 1 chiffre et doit faire au minimum 8 caractères.',
      },
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ status: 'error', errors });
    }

    return next();
  };
}

module.exports = validate;
