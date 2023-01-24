export default function noAuthCheck(req, res, next) {
  if (!req.session?.user?.id) {
    return next();
  }
  return res.sendStatus(403);
}
