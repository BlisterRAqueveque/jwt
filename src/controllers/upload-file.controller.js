const { request, response } = require("express");
const { getConnection } = require("../database/database");
const path = require("path");
const fs = require("fs"); //* File system
const { uploadFiles } = require("../helpers/uploader");

const postFile = async (req = request, res = response) => {
  //! Reference key: "file"
  const id = req.params.id; //* user's id

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    //* If hasn't a file:
    res.status(204).send("Files where not uploaded");
    return;
  }

  //* Get the file name and assemble to the object
  const img_id = await uploadFiles(req.files);

  const record = { img_id: img_id }; //* Create the object

  console.log(record);
  try {
    // const connection = await getConnection();
    // //* Update the user
    // const result = await connection.query(
    //   `UPDATE ${table} SET ? WHERE id = ?`,
    //   [record, id]
    // );
    res.status(201).json({
      ok: true,
      record,
      msg: "approved",
    });
  } catch (err) {
    res.status(404).json({
      ok: false,
      err,
      msg: "rejected",
    });
  }
};

module.exports = { postFile };
