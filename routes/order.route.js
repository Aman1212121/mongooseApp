import express from 'express';
import {getOrder, saveOrder } from '../controller/order.controller.js';

const router=express.Router();

router.post("/saveorder",saveOrder);
router.get("/getorder/:userid/:id",getOrder);

export default router;