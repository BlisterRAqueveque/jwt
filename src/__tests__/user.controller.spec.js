const { login } = require("../controllers/users.controller");
const { getConnection, closeConnection } = require("../database/database");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../middlewares/jwt");

jest.mock("../database/database"); // Mock de la conexión a la base de datos
jest.mock("bcrypt"); // Mock de bcrypt
jest.mock("../middlewares/jwt"); // Mock de la generación del token

describe("Pruebas del controlador login", () => {
  let req, res;

  beforeEach(() => {
    // Mock de req y res
    req = {
      body: { username: "testuser", password: "testpass" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(async () => {
    await closeConnection(); // Cerrar conexión después de cada test
  });

  test("Debe devolver 404 si el usuario no existe", async () => {
    getConnection.mockResolvedValue({
      query: jest.fn().mockResolvedValue([[]]), // Simulamos resultado vacío (usuario no encontrado)
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Usuario no encontrado",
    });
  });

  test("Debe devolver 401 si la contraseña es incorrecta", async () => {
    getConnection.mockResolvedValue({
      query: jest
        .fn()
        .mockResolvedValue([
          [{ username: "testuser", password: "hashedpassword" }],
        ]), // Simulamos que el usuario fue encontrado
    });

    bcrypt.compare.mockResolvedValue(false); // Contraseña incorrecta

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Contraseña incorrecta",
    });
  });

  test("Debe devolver un token si las credenciales son correctas", async () => {
    getConnection.mockResolvedValue({
      query: jest
        .fn()
        .mockResolvedValue([
          [{ username: "testuser", password: "hashedpassword" }],
        ]), // Simulamos que el usuario fue encontrado
    });

    bcrypt.compare.mockResolvedValue(true); // Contraseña correcta
    generateJwt.mockResolvedValue("fakeToken"); // Token simulado

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      token: "fakeToken",
      msg: "login",
    });
  });

  test("Debe manejar un error del servidor", async () => {
    getConnection.mockRejectedValue(new Error("DB error")); // Simulamos un error de la DB

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Server error",
    });
  });
});
