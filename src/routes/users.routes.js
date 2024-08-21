const { Router } = require("express");
const methods = require("../controllers/users.controller");
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

router.post("/users/register", methods.register);
router.post("/users/login", methods.login);
router.get("/users/:id", authenticateJWT, methods.getOne);

module.exports = router;
