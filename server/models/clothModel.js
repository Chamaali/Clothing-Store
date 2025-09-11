import mongoose from "mongoose";

const clothSchema = mongoose.Schema({
    category: { type: String, require: true},
    subCategory: { type: String, require: true},
    title: { type: String, require: true},
    subTitle: { type: String, require: true},
    price: { type: Number, require: true},
    image: { type: String, require: true},
    clothDiscription: { type: String, require: true},
})

const clothModel = mongoose.model('cloth', clothSchema)
export {clothModel}