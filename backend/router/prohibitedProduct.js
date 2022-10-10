import express from "express"
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import ProhibitedProduct from "../model/ProhibitedProduct.js"

const prohibitedProductRoute = express.Router()

/**
 * @route GET /api/prohibited-product
 * @description get all prohibited product
 * @access public
 */
prohibitedProductRoute.get('/',
    async (req, res) => {
        try {
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
            const page = req.query.page ? parseInt(req.query.page) : 0
            const { limit, sortBy, keyword } = req.query
            console.log(limit, sortBy, keyword)

            var listKeyword = keyword ? {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                ]
            } : {}

            const length = await ProhibitedProduct.find(listKeyword).count()
            const listCar = await ProhibitedProduct.find(listKeyword)            
            .limit(pageSize)
            .skip(pageSize*page)
            .sort(`${sortBy}`)
            
            if (listCar) return sendSuccess(res, "Get prohobited product successful.", {length, listCar})
            return sendError(res, "Information not found.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
 * @route GET /api/prohibited-product/:id
 * @description get a prohibited product by id
 * @access public
 */
prohibitedProductRoute.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prohibitedProduct = await ProhibitedProduct.findById(id)
        if (prohibitedProduct)
            return sendSuccess(res, 'get information of prohibited product successfully.', prohibitedProduct)
        return sendError(res, 'information of prohibited product  is not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})



export default prohibitedProductRoute