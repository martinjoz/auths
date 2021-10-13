let Controller = require("../controller/mailController");
let express = require("express");

let routes = express.Router();

routes.get("/", Controller.getAllMail);
routes.get("/:id", Controller.getOne);
routes.post("/", Controller.add);
routes.delete("/:id", Controller.delete);
routes.patch("/:id", Controller.update);

module.exports = routes;
