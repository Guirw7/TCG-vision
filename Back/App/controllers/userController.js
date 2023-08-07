/* eslint-disable max-len */
// On require le module bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../middlewares/nodemailer');
const sendEmailResetPassword = require('../middlewares/sendMailForPassword');

const { JWT_SECRET } = process.env;
const { ACCESS_TOKEN_EXPIRATION } = process.env;

// On require notre userDataMapper qui contient nos requête SQL
const userDataMapper = require('../datamappers/userDataMapper');

const revokedTokens = require('../middlewares/revokedToken');
const { removeRevokedTokens } = require('../middlewares/auth');

const userController = {

  /**
 * Function to add a user to the database.
 * @param {Object} req - The HTTP request object, expected to have an 'email', 'username' and 'password' in the body.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - A JSON response with a status of 200 (OK) and the added user's data. If an error occurs, it returns an error message.
 */
  async addUserForm(req, res) {
  // Retrieve the information sent by the user
    const { email, username, password } = req.body;
    const saltRounds = 10;
    // Hash the password before passing it to our user object
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const existEmail = await userDataMapper.getByEmail(email);
    const existUsername = await userDataMapper.getByUsername(username);

    // Create an object with the information that the user has sent in the form
    const user = {
      email,
      username,
      password: passwordHash,
    };

    if (existEmail) {
      res.status(409).json('Email already exists');
      return;
    }

    if (existUsername) {
      res.status(409).json('Username already exists');
      return;
    }

    const filePath = path.resolve(__dirname, '..', '..', 'nodemailer.html');
    const content = fs.readFileSync(filePath, 'utf8');

    sendEmail(user.email, content);
    // Create a variable using the addUserInDB method by passing our user object
    const newUser = await userDataMapper.addUserInDB(user);

    // Return the response in JSON format with a status of 200 (OK)
    res.status(200).json(newUser);
  },

  /**
   * Fonction pour modifié les infos de l'utilsateur.
   */
  async modifyUser(req, res) {
    const id = Number(req.params.id);
    const {
      email, username, password,
    } = req.body;
    // recherche et modification d'un profil d'utilisateur
    const user = await userDataMapper.getOneProfil(id);
    if (user) {
      user.email = email || user.email;
      user.username = username || user.username;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword || user.password;
      }
    }
    const updateUser = await userDataMapper.modifyUser(user);
    // On renvoie la réponse au format JSON avec un status 200 (OK)
    res.status(200).json(updateUser);
  },

  /**
   * On créer une variable en utilisant la méthode detailUsers
   */
  async detailUsers(req, res) {
    const results = await userDataMapper.detailUsers();
    res.status(200).json(results);
  },

  /**
   * Fonction pour récuperer le profil d'un utilisateur,
   * On récupere l'utilisateur via son id,
   * On renvoie la réponse au format json avec un status 200 (OK).
   */
  async getOneUser(req, res) {
    const id = Number(req.params.id);
    const user = await userDataMapper.getOneProfil(id);
    res.status(200).json(user);
  },

  /**
   * Fonction pour delete le profil d'un utilisateur,
   * On récupere l'utilisateur via son id,
   * On renvoie la réponse au format json avec un status 200 (OK).
   */
  async deleteUser(req, res) {
    const id = Number(req.params.id);
    const user = await userDataMapper.getOneProfil(id);
    if (user) {
      await userDataMapper.deleteUser(user);
      res.status(200).json({ message: 'Votre compte à bien été supprimer !' });
    }
  },

  /**
 * Middleware for user login.
 * @async
 * @param {Object} req - The HTTP request object, expected to have a body with 'username' and 'password'.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - A JSON response with either a token (in case of success) or an error message.
 */
  async login(req, res) {
    const { username, password } = req.body;

    // Check if both username and password are present in the request
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password.' });
    }
    // Search for the user in the database using the username
    const user = await userDataMapper.getByUsername(username);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }
    const data = await userDataMapper.getDetailsForToken(username);
    const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });

    // Return a successful response
    return res.json(token);
  },

  /**
   * Function to perform the user logout.
   * @param {Object} req - The HTTP request object, expected to have an 'authorization' header.
   * @param {Object} res - The HTTP response object.
   * @returns {Object} - A JSON response indicating successful logout.
  */
  logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];

    revokedTokens.push(token);

    setTimeout(removeRevokedTokens, 3600000);

    res.status(200).json({ message: 'Successful logout.' });
  },

  async sendPasswordResetEmail(req, res) {
    const { email } = req.body;
    const userEmail = await userDataMapper.getByEmail(email);

    // Vérifiez si l'e-mail est présent dans la demande
    if (!userEmail) {
      return res.status(400).json({ message: 'Veuillez fournir un e-mail.' });
    }
    // générer un token
    const token = jwt.sign({ userEmail }, JWT_SECRET, { expiresIn: '1h' });
    // envoyer un email
    const filePath = path.resolve(__dirname, '..', '..', 'resetPassword.html');
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace('{{token}}', token); // Remplacer {{token}} par le token JWT

    sendEmailResetPassword(userEmail.email, content);
    // Renvoyez une réponse réussie
    return res.json({ message: 'Email envoyé.' });
  },

  async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    // vérifier le token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({ message: 'Token invalide.' });
    }
    // vérifier si l'utilisateur existe
    const user = await userDataMapper.getByEmail(decodedToken.userEmail.email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
    // mettre à jour le mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userDataMapper.modifyPassword(user);
    // Renvoyez une réponse réussie
    return res.json({ message: 'Mot de passe mis à jour.' });
  },
};

module.exports = userController;
