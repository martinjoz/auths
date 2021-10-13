let projectController = require("./../controller/projectController");
let express = require("express");

let routes = express.Router();

routes.get("/", projectController.getAllProjects);
routes.get("/:id", projectController.getOne);
routes.post("/", projectController.add);
routes.delete("/:id", projectController.delete);
routes.patch("/:id", projectController.update);

module.exports = routes;
