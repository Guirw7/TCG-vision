const bcrypt = require('bcrypt');
const userDataMapper = require('../datamappers/userDataMapper');

const userController = {

  async addUserForm(req, res) {
    const { email, username, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = {
      email,
      username,
      password: passwordHash,
    };

    const newUser = await userDataMapper.addUserInDB(user);

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
    const user = await userDataMapper.getOneProfil(id);// recherche et modification d'un profil d'utilisateur
    if (user) {
      user.email = email ||user.email,
      user.username = username ||user.username,
      user.password = password ||user.password,

      
    },
    res.status(200).json(user);// On renvoie la réponse au format JSON avec un status 200 (OK)
  },
};
module.exports = userController;
