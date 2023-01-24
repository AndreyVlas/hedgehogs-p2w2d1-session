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

renderRouter.get('/cars', checkAuth, async (req, res) => {
  const allCars = await Car.findAll({ include: User });
  const initState = { allCars };
  res.render('Layout', initState);
});

export default renderRouter;
