import Error from "../helper/error.js"

export const createOrderValidate = data => {
    const error = new Error()

    error.isOnlyRequiredOneOf([{field: data.serviceId, name:'serviceId'}, {field: data.serviceName,name:'serviceName'}])
    .isRequired(data.receiver, 'receiver')
    .isRequired(data.origin, 'origin')
    .isRequired(data.destination, 'destination')  
    
    return error.get()
}