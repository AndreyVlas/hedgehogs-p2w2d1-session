import express from 'express';
import { Car, User } from '../../db/models';

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

const checkPrivMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundCar = await Car.findOne({ where: { id } });
    if (foundCar?.ownerId === req?.session?.user?.id) {
      return next();
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
  return res.sendStatus(401);
};

apiCarRouter.get('/delete/:id', checkPrivMiddleware, async (req, res) => {
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
