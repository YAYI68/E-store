function errorHandler (err, req, res,next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({message: 'The user is not authorized to access this'});
    }

    if (err.name === 'ValidationError') {
      res.status(401).json({message: err})
    }
    else {
      next(err);
      return res.status(500).json({message: err})
    }
}

module.exports = errorHandler;