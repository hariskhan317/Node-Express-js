const customerSchema = mongoose.schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    phone: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    isGold: {
        type: Boolean,
        default: false
    },
})

const Customers = mongoose.Model('Customers', customerSchema)

function validateSchema(customer) {
    const schema = {
        name: Joi.string().min(3)
            .max(30)
            .required(),
        phone: Joi.integer().min(3)
            .max(30)
            .required(),
        isGold: Joi.boolean().required()
    }
    return Joi.validate(customer, schema)
}

module.exports.Customers = Customers;
module.exports.validateSchema = validateSchema;