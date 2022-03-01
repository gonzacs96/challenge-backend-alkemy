const { AUTH_SECRET } = process.env;

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Acceso no autorizado" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, AUTH_SECRET, (error, decoded) => {
      if (error) {
        next(error);
      } else {
        next();
      }
    });
  }
}

module.exports = auth;
