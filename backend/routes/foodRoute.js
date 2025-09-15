import express from 'express';
import {addFood, listFood,removeFood} from '../controlers/foodControler.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage:storage });

// app.post("/api/food/add",upload.single("image"),addFood);
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood)

export default foodRouter;