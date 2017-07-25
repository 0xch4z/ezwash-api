export const notFound = (req, res, next) => {
  const err = new Error('Not found'); err.status = 404;
  next(err);
};

/* eslint-disable */
export const returnError = (err, req, res, next) => {
  console.log(res.statusCode);
  res.status(err.status || 500).json({
    error: true,
    message: err.message
  });
};
/* eslint-enable */

export default {
  notFound,
  returnError,
};
