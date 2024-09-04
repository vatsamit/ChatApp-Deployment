import jwt from "jsonwebtoken" 

const createWebTokenAndSaveCookie = (userId , res) => {
 const token = jwt.sign({userId},process.env.JWT_TOKEN ,{
    expiresIn:"10d"
 })
 res.cookie("jwt",token,{
    httpOnly :true, // to protect from ssr attack
    secure: true , 
    sameSite : "strict" // to protect from csrf attack



 })
}
export default createWebTokenAndSaveCookie ;