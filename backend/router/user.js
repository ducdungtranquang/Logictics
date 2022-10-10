import express from "express"
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import User from "../model/User.js"
import { verifyToken } from '../middleware/index.js'
import Staff from "../model/Staff.js"
import Customer from "../model/Customer.js"

const userRoute = express.Router()

/**
 * @route GET /api/user
 * @description get about information
 * @access public
 */
userRoute.get('/',
    async (req, res) => {
        try {
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
            const page = req.query.page ? parseInt(req.query.page) : 0
            const { limit, sortBy, keyword } = req.query
            console.log(limit, sortBy, keyword)

            var listKeyword = keyword ? {
                $or: [
                    { email: { $regex: keyword, $options: 'i' } },
                    { phone: { $regex: keyword, $options: 'i' } },
                ]
            } : {}

            const length = await User.find({listKeyword}, {password: false}).count()
            const listUser = await User.find({listKeyword}, {password: false})
            .limit(pageSize)
            .skip(pageSize*page)
            .sort(`${sortBy}`)

            if (listUser) return sendSuccess(res, "Get user successful.", {length, listUser})
            return sendError(res, "Information not found.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
* @route GET /api/user/:id
* @description get about information by id
* @access public
*/
userRoute.get('/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id, {password: false})

            if (user) return sendSuccess(res, "Get user successful.", user)
            return sendError(res, "Not information found.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
 * @route PUT /api/user/customer/:id
 * @description update information of customer user
 * @access private
 */
userRoute.put('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const { email } = req.body
        const { phone } = req.body
        if (!name) return sendError(res, "Name is required")
        if (!email) return sendError(res, "Email is required")
        if (!phone) return sendError(res, "Phone is required")

        const isExist = await User.exists({ email: email })
        if (isExist)
            return sendError(res, "This email existed.")


        await User.findByIdAndUpdate(id, { phone: phone, email: email, name: name })
        return sendSuccess(res, "Update information account successfully", { phone, email, name })

    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})
/**
 * @route PUT /api/user/staff/:id
 * @description update information of staff user
 * @access private
 */
userRoute.put('/staff/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const { email } = req.body
        const { phone } = req.body
        if (!name) return sendError(res, "Name is required")
        if (!email) return sendError(res, "Email is required")
        if (!phone) return sendError(res, "Phone is required")

        const isExist = await User.exists({ email: email })
        if (isExist)
            return sendError(res, "This email existed.")

        await User.findByIdAndUpdate(id, { phone: phone, email: email, name: name })
        return sendSuccess(res, "Update information account successfully", { phone, email, name })

    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


export default userRoute