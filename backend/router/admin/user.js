import express from 'express'
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js";
import Customer from '../../model/Customer.js';
import Staff from '../../model/Staff.js';
import User from "../../model/User.js";

const userAdminRoute = express.Router()

/**
 * @route DELETE /api/admin/user/:id
 * @description delete a user existing 
 * @access private
 */
userAdminRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const isExit = await User.exists({ _id: id })
        if (!isExit)
            return sendError(res, "User not exists")

        const customerID = await User.findById(id, { role: true })
        const userRole = (customerID.role).toString()
        console.log(userRole)

        const data = await User.findByIdAndRemove(id)
            .then(() => {
                return sendSuccess(res, "Delete user successfully.")
            })
            .catch((err) => {
                return sendError(res, err)
            })

        const isExitstaff = await Staff.exists({ _id: userRole })
        if (isExitstaff)
            await Staff.findByIdAndRemove({_id: userRole})
            
        const isExitCustomer = await Customer.exists({ _id: userRole })
        if (isExitCustomer) 
            await Customer.findByIdAndRemove({_id: userRole})
    }
    catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route PUT /api/admin/user/acive/:id
 * @description update active of staff user
 * @access private
 */
userAdminRoute.put('/active/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body

        const isExit = await User.exists({ _id: id })
        if (!isExit)
            return sendError(res, "User not exists")

        if (!isActive) return sendError(res, "Active is required")

        await User.findByIdAndUpdate(id, { isActive: isActive })
        return sendSuccess(res, "Update active account successfully", { isActive })

    } catch (error) {
        console.log(error)
        return sendServerError(res)
     }            
}) 
//! ------------------------------------------------------------------------------------------------
// userAdminRoute.post('/create/:email/:phone/:password/:role/:isActive', async (req, res) => {
//     let {email, phone, password, role, isActive} = req.params;
//     let user = new User({
//         email: email,
//         phone: phone,
//         password: password,
//         role: role,
//         isActive: isActive
//     })
//     user.save()
//     .then((result) => {
//         res.send("User created successfully")
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

export default userAdminRoute