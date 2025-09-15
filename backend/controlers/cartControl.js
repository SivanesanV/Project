import userModel from '../models/userModels.js'


//Add items to user cart
const addToCart = async (req, res) => {
    try {
        console.log("Frontend request body:", req.body);
        console.log("Decoded userId from token:", req.userId);
        let userdata = await userModel.findById(req.userId);
        let cartData = userdata.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error });

    }
}

//Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId, { cartData })
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "error" })
    }
}

//Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId)
        if (!userData) {
            return res.json({ success: false, message: 'user not found' })
        }
        let cartData = userData.cartData;;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}

export { addToCart, removeFromCart, getCart }