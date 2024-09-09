const config = require("dotenv");
const joi = require("joi");

config.config();

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars = value;

const envs = {
  port: envVars.PORT,
};

module.exports = envs;
