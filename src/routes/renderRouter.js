import express from 'express';
import { Car, User } from '../../db/models';

const renderRouter = express.Router();

renderRouter.get('/', (req, res) => {
  res.render('Layout');
});

renderRouter.get('/login', (req, res) => {
  res.render('Layout');
});

renderRouter.get('/signup', (req, res) => {
  res.render('Layout');
});

renderRouter.get('/cars', async (req, res) => {
  const allCars = await Car.findAll({ include: User });
  const initState = { allCars };
  res.render('Layout', initState);
});

export default renderRouter;
