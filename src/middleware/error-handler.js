export const notFound = (req, res, next) => {
  const err = new Error('Not found'); err.status = 500;
  next(err);
};

export const returnError = (err, req, res, next) => {
  console.log(res.statusCode);
  res.status(err.status || 500).json({
    error: true,
    message: err.message
  });
};

export default {
  notFound,
  returnError,
};
