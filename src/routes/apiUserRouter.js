import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const apiUserRouter = express.Router();

apiUserRouter.post('/signup', async (req, res) => {
  try {
    const { pass, email, username } = req.body;
    const hashpass = await bcrypt.hash(pass, 10);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        hashpass, username,
      },
    });
    if (!created) {
      return res.status(401).send('Email is already in use');
    }
    const newUser = JSON.parse(JSON.stringify(user));
    delete newUser.hashpass;
    req.session.user = newUser;
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

apiUserRouter.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const foundUser = await User.findOne({
      where: { email },
    });
    if (!(foundUser && await bcrypt.compare(pass, foundUser.hashpass))) {
      return res.sendStatus(401);
    }
    const user = JSON.parse(JSON.stringify(foundUser));
    delete user.hashpass;
    req.session.user = user;
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

apiUserRouter.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default apiUserRouter;
