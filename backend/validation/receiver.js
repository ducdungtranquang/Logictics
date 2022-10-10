import Error from "../helper/error.js"

export const createReceiverValidate = data => {
    const error = new Error()

    error.isRequired(data.name, 'name')
    .isRequired(data.phone, 'phone')
    .isRequired(data.identity, 'identity')  
    
    return error.get()
}