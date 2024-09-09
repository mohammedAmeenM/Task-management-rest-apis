const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(400).json({ status: 'failure', message: err.message });
      break;
    case 'DatabaseError':
      res.status(500).json({ status: 'failure', message: 'Database error occurred', details: err.details });
      break;
    case 'NotFoundError':
      res.status(404).json({ status: 'failure', message: 'Not Found' });
      break;
    default:
      res.status(500).json({ status: 'failure', message: 'An unexpected error occurred', details: err.message });
      break;
  }
};

module.exports = errorHandler;
