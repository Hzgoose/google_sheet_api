const Validator = require('jsonschema').Validator;
const v = new Validator();

function validateCreateRow(data) {
    let schema = {
        "id": "/create",
        "type": "object",
        "properties": {
            "orderID": {
                "type": "string",
                "minLength": 1,

            },
            "district": {
                "type": "string",
                "minLength": 1
            },
            "phone": {
                "type": "string",
                "minLength": 1
            },
            "customer": {
                "type": "string",
                "minLength": 1
            },
            "address": {
                "type": "string",
                "minLength": 1
            },
            "note_to_shop": {
                "type": "string",
                "minLength": 1
            },
            "note_to_customer": {
                "type": "string",
                "minLength": 1
            },
            "isConfirmByCall": {
                "type": "boolean",
            },
            "kgRequest": {
                "type": "number",
                "minimum": 0
            },
            "kgActually": {
                "type": "number",
                "minimum": 0
            },
            "price": {
                "type": "number",
                "minimum": 0
            },
            "totalPrice": {
                "type": "number",
                "minimum": 0
            },
            "shipFee": {
                "type": "number",
                "minimum": 0
            },
            "total": {
                "type": "number",
                "minimum": 0
            },
            "discount": {
                "type": "number",
                "minimum": 0
            },
        },
        "required": [
            "orderID",
            "district",
            "phone",
            "customer",
            "address",
            "kgRequest",
            "kgActually",
            "price",
            "totalPrice",
            "shipFee",
            "total",
            "discount",
        ]

    };

    return v.validate(data, schema).valid;
}

module.exports={
    validateCreateRow:validateCreateRow,
};
