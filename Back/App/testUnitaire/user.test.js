const userController = require('../controllers/userController');
const userDataMapper = require('../datamappers/userDataMapper');
/* const jest = require('jest'); */
const bcrypt = require('bcrypt');

// Mock du userDataMapper
jest.mock('../datamappers/userDataMapper');

describe('User Controller', () => {
  describe('addUserForm', () => {
    it('should add a user and return the new user', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          username: 'testuser',
          password: 'testpassword',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        id: 1,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      };

      userDataMapper.addUserInDB.mockResolvedValue(newUser);

      await userController.addUserForm(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });

  describe('modifyUser', () => {
    it('should modify user information and return the updated user', async () => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          email: 'newemail@example.com',
          username: 'newusername',
          password: 'newpassword',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const existingUser = {
        id: req.params.id,
        email: 'oldemail@example.com',
        username: 'oldusername',
        password: 'oldpassword',
      };

      const modifiedUser = {
        id: req.params.id,
        email: req.body.email,
        username: req.body.username,
        password: 'newhashedpassword',
      };

      bcrypt.hash = jest.fn().mockResolvedValue('newhashedpassword');
      userDataMapper.getOneProfil.mockResolvedValue(existingUser);
      userDataMapper.modifyUser.mockResolvedValue(modifiedUser);

      await userController.modifyUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(modifiedUser);
    });
  });

  // Exemple de test pour getOneUser
  describe('getOneUser', () => {
    it('should get the user with the specified id', async () => {
      const req = {
        params: {
          id: 1,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword',
      };

      userDataMapper.getOneProfil.mockResolvedValue(user);

      await userController.getOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});
