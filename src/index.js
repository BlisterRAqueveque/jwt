const app = require("./app");
const envs = require("./configuration/envs");

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on port ${envs.port}`);
};
main();
