const express = require("express");
const router = express.Router();

const controllerAdmin = require("../controllers/adminController");

router.post("/addAdmin", controllerAdmin.createAdmin);

router.post("/login", controllerAdmin.loginAdmin);

router.get("/", controllerAdmin.getAdmin);

router.get("/:id", controllerAdmin.getOneAdmin);

router.put("/:id", controllerAdmin.updateAdmin);

router.delete("/:id", controllerAdmin.deleteAdmin);


module.exports = router;