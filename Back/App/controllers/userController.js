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
  async modifyUser(req, res) {
    const id = Number(req.params.id);
    const {
      email, username, password,
    } = req.body;
    const user = await userDataMapper.getOneProfil(id);
    if (user) {
      user.email = email ||user.email,
      user.username = username ||user.username,
      user.password = password ||user.password,

      
    }
    res.status(200).json(user);
  },
};

module.exports = userController;
