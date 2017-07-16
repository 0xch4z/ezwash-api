export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error('Not Found'));
};

export const returnError = (err, req, res, next) => {
  if (!res.statusCode) res.status(500);
  res.json({
    error: true,
    message: err.message
  });
};

export default {
  notFound,
  returnError,
};
