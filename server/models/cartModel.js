import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    userId : { type: String, require: true},
    cartDetails : [
        {
            clothId: { type: String, require: true},
            image: { type: String, require: true},
            title: { type: String, require: true},
            subTitle: { type: String, require: true},
            price: { type: Number, require: true},
            quantity: {type: Number, require: true, default:1},
            total:{ type: Number, require: true, default:0},
        }
    ]
})

const cartModel = mongoose.model('cart', cartSchema)
export {cartModel}