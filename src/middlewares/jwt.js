const jwt = require("jsonwebtoken");
const config = require("../config"); // Asegúrate de tener tu clave secreta en el archivo de configuración
const { response, request, next } = require("express");

const authenticateJWT = (req = request, res = response, next = next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Si no hay token, devolver error 401

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Si hay error en la verificación, devolver error 403
    req.user = user; // Guardar el usuario en el request para usar en rutas protegidas
    next(); // Pasar al siguiente middleware o ruta
  });
};

const generateJwt = async (user) => {
  const payload = { //* Generamos el payload con la información del usuario
    sub: user.id,
    username: user.username,
    name: user.nombre,
  };

  const options = { //* Le damos una validez al token de 24 horas
    expiresIn: "24h",
  };
  //! Retornamos el token
  return jwt.sign(payload, config.secretKey, options);
};

module.exports = { authenticateJWT, generateJwt };



