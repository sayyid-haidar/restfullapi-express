"use stric";
const OrderController = require("../controller/orderController");
const chackAuth = require("../middleware/chackAuth");

const express = require("express");
const router = express.Router();

router.get("/", chackAuth, OrderController.GetAll);
router.get("/:orderId", chackAuth, OrderController.GetOne);
router.post("/", chackAuth, OrderController.PostCreate);
router.patch("/:orderId", chackAuth, OrderController.PatchUpdate);
router.delete("/:orderId", chackAuth, OrderController.DeleteOne);

module.exports = router;
