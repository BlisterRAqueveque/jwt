const { request, response } = require("express");
const { uploadFiles } = require("../helpers/uploader");

const postFile = async (req = request, res = response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      //* If hasn't a file:
      res.status(204).send("Files where not uploaded");
      return;
    }

    //* Get the file name and assemble to the object
    const img_id = await uploadFiles(req.files);

    const record = { img_id: img_id }; //* Create the object

    res.status(200).json({ ok: true, record, msg: "Uploaded" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, err });
  }
};

module.exports = { postFile };




