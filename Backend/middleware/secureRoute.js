import jwt from "jsonwebtoken" ;
import User from "../model/user.model.js";

const secureRoute = async(req , res , next) =>{
try {
    const token = req.cookies.jwt ;
    if(!token){
        return res.status(401).json({error :"No token, Denied authorization"});
    }
   const decoded = jwt.verify(token,process.env.JWT_TOKEN);
   if(!decoded){
    return res.status(401).json({error :"Invalid Token"});
   }
const user = await User.findById(decoded.userId).select("-password"); //current loggedin user
if(!user){
    return res.status(401).json({message:"User not found!!"})
}
req.user=user;
next();
} catch (error) {
    connsole.log("Error in Secure Route " , error)
    res.status(500).json({error:"Internal server error"})
}
}
export default secureRoute ;