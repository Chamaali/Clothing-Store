import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId : { type: String, require: true},
    orders : [
        {
            items: [
                {
                    subTitle: { type: String, require: true},
                    price: { type: Number, require: true},
                    imgURL: { type: String, require: true},
                    quantity: {type: Number, require: true},
                }
            ],
            address: {
                addressLine1 : { type: String, require: true},
                addressLine2 : { type: String, require: true},
                city : { type: String, require: true},
                zipCode : { type: String, require: true},
                country : { type: String, require: true},
            },
            grandTotal: {type: Number, require: true},
        }
    ]
})

const orderModel = mongoose.model('order', orderSchema)
export {orderModel}

