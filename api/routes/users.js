"use stric";
const UserController = require("../controller/userController");
// const checkAuth = require("../middleware/chackAuth");
const express = require("express");
const router = express.Router();

router.post("/login", UserController.Login);
router.post("/signup", UserController.Signup);
router.delete("/:userId", UserController.DeleteUser);

// router.get("/", (req, res, next) => {});
// router.get("/:userId", (req, res, next) => {});
// router.petch("/:userId", (req, res, next) => {});

module.exports = router;
