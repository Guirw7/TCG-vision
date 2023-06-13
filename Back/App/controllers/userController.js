// On require le module bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
// On require notre userDataMapper qui contient nos requête SQL
const userDataMapper = require('../datamappers/userDataMapper');

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
    res.status(200).json(user);// On renvoie la réponse au format JSON avec un status 200 (OK)
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
};

module.exports = userController;
