// Manejo de las solicitudes HTTP Con express

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
var cors = require("cors");

//*Routes
const users = require("./routes/users.routes");
const files = require("./routes/upload-file.routes");
const envs = require("./configuration/envs");


//* Express
const app = express();

//* Cors
app.use(cors({
  origin: '*.its.edu.ar'
}));

//* Settings
app.set("port", envs); //! The port
app.use(express.urlencoded({ extended: false })); //! Parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.json()); //! Return the petition as an object json

//* MiddleWares
app.use(morgan("dev"));

//* FileUpload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  })
);

//* Routes direction
app.use(/* Routes */ users, files);

module.exports = app;
