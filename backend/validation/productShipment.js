import Error from "../helper/error.js"

export const createProductShipmentValidate = data => {
    const error = new Error()

    error.isRequired(data.quantity, 'quantity')
    
    return error.get()
}
