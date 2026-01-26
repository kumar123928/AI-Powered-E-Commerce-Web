import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
try {
    const {itemId, size} = req.body;
    
    const userData = await User.findById(req.userId);

    if(!userData){
        return res.status(404).json({message: "User not found"});

    }
    let CartData = userData.CartData || {};

    if(CartData[itemId]){
        if(CartData[itemId][size]){
            CartData[itemId][size] +=1;
        }else{
             CartData[itemId][size] = 1;
        }
    }else{
        CartData[itemId] = {};
        CartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(req.userId, {CartData});
    return res.status(201).json({message : "Added to cart"});
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "addToCart error"});
}
}



export const updateCart = async(req, res) => {
    try {
     const {itemId, size, quantity} = req.body
     const userData = await User.findById(req.userId)
     let CartData = await userData.CartData;
     
     CartData[itemId][size] = quantity

     await User.findByIdAndUpdate(req.userId, {CartData})
     return res.status(201).json({message: "cart updated"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "UpdateCart error"})
    }
}



export const getUserCart =  async(req, res) => {
    try {
        
        const userData = await User.findById(req.userId)
        let CartData = await userData.CartData

        return res.status(200).json(CartData)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"getUserCart error"})
    }
}

