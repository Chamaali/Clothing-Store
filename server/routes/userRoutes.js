import express from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { clothModel } from "../models/clothModel.js";
import { cartModel } from "../models/cartModel.js";
import { authToken } from "../middleware/auth.js";
import { orderModel } from "../models/orderModel.js";

const router = express.Router()

//signup
router.post('/signup', async(req, res) =>{
    try{
        const {email, password, ...userData} = req.body
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return res.status(400).json({ message: 'Email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new userModel({...userData, password:hashedPassword, email})
        await newUser.save()
        return res.status(201).json({ message: 'Signup successfull' })
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//login
router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:'Please signup first'})
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if(!passwordMatch){
            return res.status(401).json({message:'Invalid password'})
        }

        const user = {userId:existingUser._id, userRole:existingUser.role}
        const token = jwt.sign(user, process.env.TOKEN_KEY)
        const expireTime = 60 * 60 * 1000
        res.cookie('token', token, {httpOnly: true, path: '/', maxAge: expireTime, secure: true, sameSite: 'none'})

        return res.status(200).json({message:'Login successfull', token, userRole:existingUser.role})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//logout
router.post('/logout', (req, res)=>{
    res.clearCookie('token', { path: '/', sameSite: 'None', secure: true })
    return res.status(200).json({ message: 'Logout success'});
})

//get cloths by category
router.get('/get_byCategoryuser/:category', async(req, res) => {
    try{
        const {category} = req.params
        const clothsBycategory = await clothModel.find({category})
        return res.status(200).json({clothsBycategory})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//get cloth by category and type
router.get('/getby_type/:category/:type', async(req,res)=>{
    try{
        const {category,type} = req.params
        const clothByCategoryAndType = await clothModel.find({category, subCategory: type})
        return res.status(200).json({clothByCategoryAndType})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Server error' })
    }
})

//add to cart
router.post('/addto_cart',authToken, async(req, res) =>{
    try{
        const userId = req.user.userId
        const {clothId, price, ...rest} = req.body
      
        const existingCart = await cartModel.findOne({userId})
        if(existingCart){

            const existingItem = await existingCart.cartDetails.find(item => item.clothId === clothId)
            if(existingItem){
                existingItem.quantity += 1
                existingItem.total += existingItem.price
            }
            else{
                existingCart.cartDetails.push({clothId,price,total:price, ...rest})
            }
            await existingCart.save()
            return res.status(201).json({message: 'Item added to cart successfully'})
        }
        else{
            const newCart = new cartModel({
                userId,
                cartDetails:[{clothId,price,total:price, ...rest}]
            })
            await newCart.save()
            return res.status(201).json({message: 'Item added to cart successfully'})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'Server error'})
    }
})

//get cart items
router.get('/cart', authToken, async(req, res)=>{
    try{
        const userId = req.user.userId
        const userCart = await cartModel.findOne({userId})
        if(!userCart || userCart.cartDetails.length===0){
            return res.status(404).json({message: 'No items in the cart'})
        }
        const cartDetails = userCart.cartDetails
        return res.status(200).json({cartDetails})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error'})
    }
})

//delete cart item
router.delete('/delete_item/:itemId', authToken, async(req,res) =>{
    try{
        const userId = req.user.userId
        const {itemId} = req.params
        
        const userCart = await cartModel.findOne({userId})
        userCart.cartDetails.remove({_id: itemId})
        await userCart.save()
        return res.status(200).json({message: 'Item removed'})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error'})
    }
})

//get user address
router.get('/address', authToken, async(req,res)=>{
    try{
        const userId = req.user.userId
        const userDetails = await userModel.findById({_id:userId})
        const userAddress = userDetails.address
        return res.status(200).json({userAddress})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error'})
    }
})

//update address
router.put('/update_address', authToken, async(req,res) =>{
    try{
        const userId = req.user.userId
        const userDetails = await userModel.findById({_id:userId})
      
        userDetails.address.addressLine1 = req.body.formData.addressLine1
        userDetails.address.addressLine2 = req.body.formData.addressLine2
        userDetails.address.city = req.body.formData.city
        userDetails.address.zipCode = req.body.formData.zipCode
        userDetails.address.country = req.body.formData.country

        await userDetails.save()
        return res.status(200).json({ message: 'Updated successfully'})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error'})
    }
})

//place order
router.post('/place_order', authToken, async(req, res)=>{
    try{
        const userId = req.user.userId
        const existingOrders = await orderModel.findOne({userId})
        const {items, address, grandTotal} = req.body
        
        if(existingOrders){
            existingOrders.orders.push(
                {
                    items,
                    address,
                    grandTotal
                }
            )
            existingOrders.save()
            return res.status(201).json({message: 'Order Placed successfully!'})
        }
        else{
            const newOrder = new orderModel({
                userId,
                orders: [
                    {
                        items,
                        address,
                        grandTotal
                    },
                ]
            })
            await newOrder.save()
            return res.status(201).json({message: 'Order Placed successfully!'})
        }
        
    }
    catch(err){
        return res.status(500).json({error: 'Server error'})
    }
})

//get order details
router.get('/order_details', authToken, async(req,res)=>{
    try{
        const userId = req.user.userId
        const orderDetails = await orderModel.findOne({userId})
        return res.status(200).json({orderDetails})
    }
    catch(err){
        return res.status(500).json({error: 'Server error'})
    }
})

export {router}