import jwt from 'jsonwebtoken'


const adminAuth = async (req, res, next ) =>{
  

  try {
    // let {token} = req.cookies
    let token = req.cookies.adminToken;


  if(!token) {
    return res.status(400).json({message:"Not Authorzed Login Again"})
  }
  let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

  if(!verifyToken){
     return res.status(400).json({message:"Not Authorzed Login Again, Invalid Token"})
  }

  req.adminEmail = verifyToken.email; // correct decoded token


  next()
  } catch (error) {
    console.log("adminAuth error")
     return res.status(500).json({message:`adminAuth error ${error}` })
  }
}

export default adminAuth