import Error from "../helper/error.js"

export const addProductValidate = data => {
    const error = new Error()

    error.isRequired(data.name, 'name')
    .isRequired(data.quantity, 'quantity')
    .isRequired(data.unit, 'unit')

    return error.get()
}