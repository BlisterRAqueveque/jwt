const { request, response } = require("express");
const { getConnection } = require("../database/database");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../middlewares/jwt");

const register = async (req = request, res = response) => {
  const user = { ...req.body };

  const salt = 12;

  user.password = await bcrypt.hash(user.password, salt);

  try {
    const connection = await getConnection();

    const result = await connection.query("INSERT INTO users SET ?", user);

    res.status(201).json({ ok: true, result, msg: "approved" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ ok: false, e, msg: "rejected" });
  }
};

const login = async (req = request, res = response) => {
  const user = { ...req.body };

  try {
    const connection = await getConnection();
    const [entity] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      user.username
    );

    const isPassword = await bcrypt.compare(user.password, entity[0].password);

    if (isPassword) {
      const token = await generateJwt(entity[0]);
      res.status(200).json({ ok: true, token, msg: "login" });
    } else {
      throw new Error("Unauthorize");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, e, msg: "rejected" });
  }
};

const getOne = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      id
    );

    res.status(200).json({ ok: true, result, msg: "approved" });
  } catch (error) {
    console.error(e);
  }
};

module.exports = { register, login, getOne };
