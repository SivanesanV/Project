import express from 'express';
import { placeOrder, verifyOrder,useOrders, listOrders, updateStatus } from '../controlers/orderControler.js';
import authMiddleware from '../middleware/authMiddleware.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware, useOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;
