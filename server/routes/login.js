const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDAO = require('../daos/user');
const { secret, isLoggedIn } = require('../middleware/auth');

// Login
router.post('/', async (req, res, next) => {
  try {
    const user = req.body;
    if (
      !user ||
      JSON.stringify(user) === '{}' ||
      !user.email ||
      !user.password
    ) {
      return res.status(400).send('User email and password are required!');
    }

    const savedUser = await userDAO.getUser(user.email);
    const comparePasswords = await bcrypt.compare(
      user.password,
      savedUser.password
    );
    if (comparePasswords) {
      const token = jwt.sign(
        {
          _id: savedUser._id,
          email: savedUser.email,
          roles: savedUser.roles,
        },
        secret
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).send('User email or password incorrect!');
    }
  } catch (e) {
    res.status(401).send(e.message);
    next(e);
  }
});

// Sign up
router.post('/signup', async (req, res, next) => {
  try {
    const user = req.body;
    if (
      !user ||
      JSON.stringify(user) === '{}' ||
      !user.email ||
      !user.password
    ) {
      return res.status(400).send('User email and password are required!');
    }

    const existingUser = await userDAO.getUser(user.email);
    if (existingUser) {
      return res.status(409).send('A user with that email already exists!');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await userDAO.createUser({
      email: user.email,
      password: hashedPassword,
      roles: ['user'],
    });
    res.status(200).send('User successfuly created!');
  } catch (e) {
    next(e);
  }
});

// Password Change
router.post('/password', isLoggedIn, async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      res.status(400).send('new password is required');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userDAO.updateUserPassword(req.user._id, hashedPassword);
      res.status(200).send('Password succesfully updated!');
    }
  } catch (e) {
    res.send(e.message);
    next(e);
  }
});

module.exports = router;
