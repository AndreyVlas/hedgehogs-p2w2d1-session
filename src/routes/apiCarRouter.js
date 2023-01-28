import express from 'express';
import { Car, User } from '../../db/models';
import checkPrivMiddleware from '../middlewares/checkPrivMiddleware';

const apiCarRouter = express.Router();

apiCarRouter.post('/', async (req, res) => {
  try {
    const newCar = await Car.create({
      ...req.body,
      ownerId: req.session.user.id,
    });
    const carWithUser = await Car.findOne({
      where: { id: newCar.id },
      include: User,
    });
    res.json(carWithUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

apiCarRouter.get('/', async (req, res) => {
  try {
    const allCars = await Car.findAll();
    res.json(allCars);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

apiCarRouter.patch('/:id', checkPrivMiddleware, (req, res) => {
  res.sendStatus(200);
});

apiCarRouter.delete('/:id', checkPrivMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Car.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default apiCarRouter;
