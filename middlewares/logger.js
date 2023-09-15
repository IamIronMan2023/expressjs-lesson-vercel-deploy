const logger = (req, res, next) => {
  console.log("Logger middleware");
  next();
};

export default logger;
