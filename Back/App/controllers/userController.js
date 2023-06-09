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
};

module.exports = userController;
