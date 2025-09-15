import foodModel from "../models/Foodmodels.js";
import fs from 'fs'

//add food item
const addFood = async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);

  try {
    let image_filename = req.file.filename;
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error", error });
  }
};
//add food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
}
//remove food item 
const removeFood = async (req,res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => { })

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

export { listFood, addFood, removeFood }