const { Router } = require("express");
const { authenticateJWT } = require("../middlewares/jwt");
const methods = require("../controllers/upload-file.controller");

const router = Router();

router.post("/upload", authenticateJWT, methods.postFile);

module.exports = router;



