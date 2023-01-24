import { Car } from '../../db/models';

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

export default checkPrivMiddleware;
