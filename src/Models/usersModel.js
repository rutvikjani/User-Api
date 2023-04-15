const mongoose = require("mongoose");
const registrationSchema = require("../Schema/userRegistrationSchema");

const createDocument = async () => {
  try {
    const user = new mongoose.model("user", registrationSchema);
  } catch (err) {
    res.status(404).send({
        status: 404,
        message: "Database Not Found"
    })
  }
};

createDocument();

module.exports = mongoose.model("user", registrationSchema);
