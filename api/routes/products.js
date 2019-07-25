"use stric";
const ProductController = require("../controller/productController");
const chackAuth = require("../middleware/chackAuth");
const upload = require("../middleware/uploads");

const express = require("express");
const router = express.Router();

router.get("/", ProductController.GetAll);
router.get("/:productId", ProductController.GetOne);
router.post("/", chackAuth, upload.single("image"), ProductController.PostCreate);
router.patch("/:productId", chackAuth, ProductController.PostCreate);
router.delete("/:productId", chackAuth, ProductController.DeleteOne);

module.exports = router;
