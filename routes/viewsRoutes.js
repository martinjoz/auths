let express = require("express");
let authController = require("./../controller/authControler");
let viewController = require("./../controller/viewsController");

let router = express.Router();

router.use(authController.isLoggedin);
//pug rendering
router.get("/", authController.isLoggedin, viewController.root);
router.get("/register", authController.isLoggedin, viewController.register);
router.get("/dash", authController.isLoggedin, viewController.dash);
router.get("/mail", authController.isLoggedin, viewController.mail);
router.get("/domain", authController.isLoggedin, viewController.domain);
router.get("/projects", authController.isLoggedin, viewController.projects);
router.get("/profile", authController.isLoggedin, viewController.profile);
router.get("/invoice", authController.isLoggedin, viewController.invoice);
router.get("/payment", authController.isLoggedin, viewController.payment);
router.get(
  "/domaindetails",
  authController.isLoggedin,
  viewController.domaindetails
);

module.exports = router;
//modules.export =router
