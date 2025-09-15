import jwt from 'jsonwebtoken'


const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: "Not Available the Token" })
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user ID",decoded.id);
        
        req.userId = decoded.id;
        next();

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
    console.log("Incoming token:", token);
}



export default authMiddleware;