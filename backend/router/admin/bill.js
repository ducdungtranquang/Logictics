import express from "express"
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import Bill from "../../model/Bill.js"
import DeliveryService from "../../model/DeliveryService.js"
import Road from "../../model/Road.js"
import Car from "../../model/Car.js"
import CarFleet from "../../model/CarFleet.js"
import Staff from "../../model/Staff.js"
import ProductShipment from "../../model/ProductShipment.js"
import { createBillValidate } from "../../validation/bill.js"


const billAdminRoute = express.Router()

/**
 * @route GET /api/admin/bill
 * @description get about information
 * @access private
 */
billAdminRoute.get("/", async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const { keyword, sortBy, limit, service, road, car, driver, product_shipments, status } = req.query;
        console.log(keyword, sortBy, limit, service, road, car, driver, product_shipments, status)

        var query = {};
        var keywordList = keyword
            ? {
                $or: [
                    { service: { $regex: keyword, $options: "i" } },
                    { road: { $regex: keyword, $options: "i" } },
                    { car: { $regex: keyword, $options: "i" } },
                    { driver: { $regex: keyword, $options: "i" } },
                    { product_shipments: { $regex: keyword, $options: "i" } },
                    { status: { $regex: keyword, $options: "i" } },
                ],
            }
            : {};

        if (service) {
            query.service = service;
        }
        if (road) {
            query.road = road;
        }
        if (car) {
            query.car = car;
        }
        if (driver) {
            query.driver = driver;
        }
        if (product_shipments) {
            query.product_shipments = product_shipments;
        }
        if (status) {
            query.status = status;
        }

        const length = await Bill.find({ $and: [query, keywordList] }).count()
        const bills = await Bill.find({ $and: [query, keywordList] })
            .skip(pageSize * page)
            .limit(pageSize)
            .sort(`${sortBy}`);

        if (bills)
            return sendSuccess(res, "Get bill information successfully.", { length, bills });
        return sendError(res, "Bill information is not found.");
    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
});

/**
 * @route GET /api/admin/bill/:id
 * @description get about information of bill by id
 * @access private
 */
billAdminRoute.get('/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const bills = await Bill.findById(id)
            if (bills) return sendSuccess(res, "Get bill successful.", bills)
            return sendError(res, "Not information found.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
 * @route POST /api/admin/bill/create
 * @description create information of bill
 * @access private
 */
billAdminRoute.post('/create', async (req, res) => {
    const errors = createBillValidate(req.body)
    if (errors)
        return sendError(res, errors)
    try {
        const { service, road, car, driver, status, actual_fuel, theoretical_fuel } = req.body

        const isExistService = await DeliveryService.exists({ _id: service })
        const isExistRoad = await Road.exists({ _id: road })
        const isExistCar = await Car.findOne({ _id: car })
        const isExistDriver = await Staff.exists({ _id: driver })
        if (!isExistService)
            return sendError(res, 'Service does not exist.')
        if (!isExistRoad)
            return sendError(res, 'Road does not exist.')
        if (!isExistCar) {
            return sendError(res, 'Car does not exist.')
        }
        const carfleet_id = isExistCar.car_fleet
        if (!carfleet_id) {
            return sendError(res, 'Car fleet does not exist.')
        }
        if (!isExistDriver)
            return sendError(res, 'Driver does not exist.')
        console.log(isExistCar,carfleet_id);
        const bill = await Bill.create({ service, road, car, driver, status, actual_fuel, theoretical_fuel })

        const updateCarFleet = await CarFleet.findOneAndUpdate(
            { _id: carfleet_id },
            { $push: { bills: bill } }
        );
        if (!updateCarFleet)
            return sendServerError(res, "Update failed")

        return sendSuccess(res, 'Set bill information successfully.')
    }
    catch (error) {
        console.log(error)
        return sendServerError(res)
    }
});


/**
 * @route POST /api/admin/bill/
 * @description create information of bill
 * @access private
 */
billAdminRoute.post("/product_shipments/:billId", async (req, res) => {
    const { shipment, turnover } = req.body;

    try {
        const isExist = await Bill.exists({
            _id: req.params.billId,
        })

        if (!isExist) {
            return sendError(res, 'bill not exists')
        }
        const shipmentExist = await ProductShipment.exists({
            _id: shipment
        })
        if (!shipmentExist) {
            return sendError(res, 'the shipment is not exists.')
        }

        await Bill.updateOne(
            {
                _id: req.params.billId,
            },
            {
                $push: { product_shipments: { shipment, turnover } },
            }
        );
        return sendSuccess(res, "upload bill successfully");

    } catch (error) {
        return sendServerError(res);

    }
})

/**
 * @route DELETE /api/admin/bill/:id
 * @description delete a product shipment existing 
 * @access private
 */
billAdminRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const isExit = await Bill.exists({ _id: id })
        if (!isExit)
            return sendError(res, "Bill not exists")

        await CarFleet.updateMany({}, { $pull: { bills: id } });

        const data = await Bill.findByIdAndRemove(id)
        return sendSuccess(res, "Delete product shipment successfully.", data)

    }
    catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route PUT /api/admin/bill/:id
 * @description update information of product shipment
 * @access private
 */
billAdminRoute.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { service, road, car, driver, status, actual_fuel, theoretical_fuel } = req.body

        const errors = createBillValidate(req.body)
        if (errors)
            return sendError(res, errors)

        const isExist = await Bill.exists({
            service: service, road: road, car: car,
            driver: driver, status: status, actual_fuel: actual_fuel, theoretical_fuel: theoretical_fuel
        })
        if (isExist)
            return sendError(res, "This bill is existed.")

        await Bill.findByIdAndUpdate(id, {
            service: service, road: road, car: car,
            driver: driver, status: status, actual_fuel: actual_fuel, theoretical_fuel: theoretical_fuel
        })
        return sendSuccess(res, "Update bill successfully", { service, road, car, driver, status, actual_fuel, theoretical_fuel })

    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default billAdminRoute