// On require le module bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../middlewares/nodemailer');
const logger = require('../log');

const { JWT_SECRET } = process.env;
const { ACCESS_TOKEN_EXPIRATION } = process.env;

// On require notre userDataMapper qui contient nos requête SQL
const userDataMapper = require('../datamappers/userDataMapper');

const revokedTokens = require('../middlewares/revokedToken');
const { removeRevokedTokens } = require('../middlewares/auth');


const userController = {

  /**
   * Fonction pour ajouter un utilisateur en base de données
   */
  async addUserForm(req, res) {
    // On récupère les infos envoyer par l'utilisateur
    const { email, username, password } = req.body;
    const saltRounds = 10;
    // On hash le mot de passe avant de le passer à notre objet user
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // On créer un objet avec les infos que l'utilisateur à envoyer dans le formulaire
    const user = {
      email,
      username,
      password: passwordHash,
    };
    logger.log(user.email);

    const filePath = path.resolve(__dirname, '..', '..', 'nodemailer.html');
    const content = fs.readFileSync(filePath, 'utf8');

    sendEmail(user.email, content);
    // On créer une variable en utilisant la méthode addUserInDB en lui passant notre objet user
    const newUser = await userDataMapper.addUserInDB(user);

    // On renvoie la réponse au format JSON avec un status 200 (OK)
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
      const result = await userDataMapper.deleteUser(user);
      res.status(200).json(result);
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    // Vérifiez si l'e-mail et le mot de passe sont présents dans la demande
    if (!username || !password) {
      return res.status(400).json({ message: 'Veuillez fournir un pseudo et un mot de passe.' });
    }
    // Recherchez l'utilisateur dans la base de données en utilisant le username
    const user = await userDataMapper.getByUsername(username);

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Vérifiez si le mot de passe correspond
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
    const data = await userDataMapper.getDetailsForToken(username);
    const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });

    // Renvoyez une réponse réussie
    return res.json(token);
  },

  /**
   * Fonction pour effectuer la déconnexion de l'utilisateur.
   * Récupère le token d'authentification à partir de l'en-tête Authorization.
   * Ajoute le token à la liste des tokens révoqués.
   * Exécution de la fonction removeRevokedTokens toutes les 1 heure (3600000 ms)
   * Renvoie une réponse JSON avec un statut 200 (OK) indiquant que la déconnexion a réussi.
   */
  logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];

    revokedTokens.push(token);

    setTimeout(removeRevokedTokens, 3600000);

    res.status(200).json({ message: 'Déconnexion réussie.' });
  },
};

module.exports = userController;
