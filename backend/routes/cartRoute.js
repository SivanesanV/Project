import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controlers/cartControl.js';
import authMiddleware from '../middleware/authMiddleware.js';
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCart)
cartRouter.post("/get", authMiddleware, getCart)

export default cartRouter;