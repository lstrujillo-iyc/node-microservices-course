exports.success = (req, res, message, status) => {
  const statusCode = status || 200;
  const statusMessage = message || 'OK';
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage,
  });
};

exports.error = (req, res, message, status) => {
  const statusCode = status || 500;
  const statusMessage = message || 'Internal Server Error';
  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage,
  });
};
