export default function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message, name: err.name };

  if (error.isOperational) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    console.error("ERROR", error);
    res.status(500).json({
      success: false,
      message: "Something went very wrong!",
    });
  }
}
