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
    req.session.user = user;
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

apiUserRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

export default apiUserRouter;
