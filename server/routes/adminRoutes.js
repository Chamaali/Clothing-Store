import express from 'express'
import { clothModel } from '../models/clothModel.js'
import { authToken, isAdmin } from '../middleware/auth.js'

const router = express.Router()

//create
router.post('/add_cloth',authToken, isAdmin, async(req, res)=>{
    try{
        const {subTitle} = req.body
        const existingCloth = await clothModel.findOne({subTitle})
        if(existingCloth){
            return res.status(400).json({message: 'Item already exists'})
        }
        const newCloth = new clothModel(req.body)
        await newCloth.save()
        return res.status(201).json({message: 'Saved successfully'})
    }
    catch(err){
        return res.status(500).json({error: 'Server error'})
    }
})

//get all
router.get('/all_cloths', async(req, res)=> {
    try{
        const allCloths = await clothModel.find({})
        return res.status(200).json({allCloths:allCloths})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//get using id
router.get('/get_byId/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const clothDetails = await clothModel.findById(id)
        return res.status(200).json({clothDetails : clothDetails})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//get using category
router.get('/get_byCategory/:category', authToken, isAdmin, async(req, res) => {
    try{
        const {category} = req.params
        const clothsBycategory = await clothModel.find({category})
        return res.status(200).json({clothsBycategory : clothsBycategory})
    }
    catch(err){
        return res.status(500).json({ error: 'Server error' })
    }
})

//Delete
router.delete('/delete_cloth/:id', authToken, isAdmin, async(req, res)=>{
    try{
        const {id} = req.params
        await clothModel.findByIdAndDelete(id)
        return res.status(200).json({message:'Deleted successfully'})
    }
    catch(err){
        return res.status(500).json({message:'Server error'})
    }
})

//update
router.put('/update_cloth/:id', authToken, isAdmin, async(req, res)=>{
    try{
        const {id} = req.params
        const updateData = req.body
        await clothModel.findByIdAndUpdate(id, updateData)
        return res.status(200).json({ message: 'Updated successfully' })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

export {router}