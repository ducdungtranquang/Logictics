import express from "express"
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"

const publicRoute = express.Router()

/**
 * @route GET /api/public/uploads/:dirName/:fileName
 * @description get an upload file
 * @access public
 */
publicRoute.get('/uploads/:dirName/:fileName',
    async (req, res) => {
        const { dirName, fileName } = req.params
        try {
            res.download(`../backend/public/uploads/${dirName}/${fileName}`)
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
 * @route GET /api/public/:dirName/:fileName
 * @description get a public logo and banner
 * @access public
 */
publicRoute.get('/:dirName/:fileName',
    async (req, res) => {
        const { dirName, fileName } = req.params
        try {
            res.download(`../backend/public/${dirName}/${fileName}`)
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })


export default publicRoute