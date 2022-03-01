const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;
const { User } = require("../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendgrid");

function login(req, res, next) {
  let { email, password } = req.body;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ msg: "Usuario o contraseña incorrectos" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });

          res.status(200).json({
            user: user,
            token: token,
          });
        } else {
          res.status(401).json({ msg: "Usuario o contraseña incorrectos" });
        }
      }
    })
    .catch((err) => {
      next(err);
    });
}

function register(req, res, next) {
  let { email, password } = req.body;
  if (password.length < 6 || password.length > 20) {
    return res
      .status(200)
      .json({ msg: "La contraseña debe tener entre 6 y 20 caracteres" });
  }
  //encriptamos password
  password = bcrypt.hashSync(password, parseInt(AUTH_ROUNDS));
  //creamos usuario
  User.create({
    email: email,
    password: password,
  })
    .then((user) => {
      //creamos el token
      let token = jwt.sign({ user: user }, AUTH_SECRET, {
        expiresIn: AUTH_EXPIRES,
      });

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
        },
        token: token,
      });
      sendEmail(email)
        .then(() => {
          console.log("Email enviado!");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  register,
  login,
};
