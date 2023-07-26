const express = require("express");
// const { router } = require("../app");
const router = express.Router()
const { getAllproduct, createproduct, updateProductdetails, deleteProductdetails, getSingleProductdetails } = require("../controller/productcontroller");
router.route("/products", getAllproduct).get(getAllproduct)
router.route("/product/new", createproduct).post(createproduct)

router.route("/product/:id", updateProductdetails).put(updateProductdetails).delete(deleteProductdetails).get(getSingleProductdetails)
module.exports = router 