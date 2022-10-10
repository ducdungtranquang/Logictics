import express from "express"
import Warehouse from "../../model/Warehouse.js"
import { sendError, sendRequest, sendServerError, sendSuccess } from "../../helper/client.js"
import ProductShipment from "../../model/ProductShipment.js"
import {createWarehouseValidate} from "../../validation/warehouse.js"
import opencage from "opencage-api-client"
const OPENCAGE_API_KEY='7f8d6f65dfd846748331d3c5e0a52070'
const warehouseAdminRoute = express.Router()

/**
 * @route POST /api/admin/warehouse/create
 * @description create new warehouse
 * @access private
 */
warehouseAdminRoute.post('/',
    async (req, res) => {
        const errors = createWarehouseValidate(req.body)
        if (errors)
            return sendError(res, errors)

        const { name, phone, street, ward, district, province} = req.body
        try {
            const isExist = await Warehouse.exists({ name })
            if (isExist) return sendError(res, 'the warehouse\'s name is existed.')
            var lat = 0, lon = 0
            const data = await opencage.geocode({q: `${street},${ward},${district},${province}`, key: OPENCAGE_API_KEY})            
            if(data) {
                if (data.status.code == 200 && data.results.length > 0) {
                    lat = data.results[0].geometry.lat
                    lon = data.results[0].geometry.lng 
                }
            }
            if(lon || lat) {
                await Warehouse.create({
                    name, phone, street, ward, district, province, lon, lat
                })
                return sendSuccess(res, 'create new warehouse successfully.')
            }
            return sendError(res, 'supplied address does not exist.')
        }
        catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
* @route PUT /api/admin/warehouse/:id
* @description update information of a warehouse
* @access private
*/
warehouseAdminRoute.put('/:id', 
    async (req, res) => {
        try{
            const {id} = req.params
            const {name, phone, street, ward, district, province} = req.body
            const warehouse = await Warehouse.findById(id)
            if (warehouse){
                var lat = 0, lon = 0
                console.log(name && name !== warehouse.name)
                if (name && name !== warehouse.name){
                    const isExistName = await Warehouse.exists({name:name})
                    if(isExistName) return sendError(res, "New name is existed.")                    
                }
                
                if (street && ward && district && province){
                    const data = await opencage.geocode({q: `${street},${ward},${district},${province}`, key: OPENCAGE_API_KEY})            
                    if(data) {
                        if (data.status.code == 200 && data.results.length > 0) {
                            lat = data.results[0].geometry.lat
                            lon = data.results[0].geometry.lng 
                        }
                    }
                    if(lon || lat) {
                        await Warehouse.findByIdAndUpdate(id, {name, phone, street, ward, district, province, lon, lat})
                        return sendSuccess(res, "Update warehouse successfully",{name, phone, street, ward, district, province, lon, lat})
                    } else return sendError(res, "supplied address does not exist.")
                    
                }
            }
            return sendError(res, "This warehouse name is not existed.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }             
    }
)

/**
* @route DELETE /api/admin/warehouse/:id
* @description delete a existing warehouse
* @access private
*/
warehouseAdminRoute.delete('/:id',
    async (req, res) => {
        const {id} = req.params;    
        try {
            const isExist = await Warehouse.exists({_id: id});
            if (!isExist) return sendError(res, "Warehouse not exist");
            
            const data = await Warehouse.findByIdAndRemove(id)
            return sendSuccess(res, "Delete warehouse successfully.", data)
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

export default warehouseAdminRoute