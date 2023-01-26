import axios from 'axios';
import express from 'express';
import { Car, User } from '../../db/models';
import checkAuth from '../middlewares/checkAuth';
import noAuthCheck from '../middlewares/noAuthCheck';

const renderRouter = express.Router();

renderRouter.get('/', (req, res) => {
  res.render('Layout');
});

renderRouter.get('/login', noAuthCheck, (req, res) => {
  res.render('Layout');
});

renderRouter.get('/signup', noAuthCheck, (req, res) => {
  res.render('Layout');
});

renderRouter.get('/callapi', async (req, res) => {
  try {
    const { data } = await axios('https://api.waifu.im/');
    console.log(data);
    const initState = { apiData: data };
    res.render('Layout', initState);
  } catch (e) {
    console.log(e);
    res.render('Layout');
  }
});

renderRouter.get('/cars', checkAuth, async (req, res) => {
  try {
    const allCars = await Car.findAll({ include: User });
    const initState = { allCars };
    res.render('Layout', initState);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default renderRouter;
