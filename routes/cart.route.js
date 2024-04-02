import express from "express";
import { addToCart, fetchCart, removefromCart } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/add-to-cart",addToCart);
router.get("/items/:userId",fetchCart);
router.post("/remove",removefromCart);
export default router;