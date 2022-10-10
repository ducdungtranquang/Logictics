import express from "express";
import { RETURN_ZONE } from "../../constant.js";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import Price from "../../model/Price.js";
import DeliveryService from "../../model/DeliveryService.js";
import { createPriceValidate } from "../../validation/price.js";

const priceAdminRoute = express.Router();

/**
 * @route POST /api/admin/price/create/:ServiceId
 * @description create price table for delivery price
 * @access private
 */
priceAdminRoute.post("/create/:serviceId", async (req, res) => {
  const errors = createPriceValidate(req.body);
  if (errors) return sendError(res, errors);

  const validateTypesOfData = Object.values(req.body).every((value) => {
    return (
      Array.isArray(value) &&
      value.every((v) => {
        return (
          v.hasOwnProperty("next") &&
          v.hasOwnProperty("sidestep") &&
          v.hasOwnProperty("prices") &&
          Array.isArray(v.prices) &&
          v.prices.length === Object.keys(RETURN_ZONE).length
        );
      })
    );
  });
  if (!validateTypesOfData)
    return sendError(res, "request's body is incorrect.");

  const { kg, ton, m3 } = req.body;
  const serviceId = req.params.serviceId;

  try {
    const service = await DeliveryService.exists({ _id: serviceId });
    if (service) {
      const price = await Price.create({
        uKG: kg,
        uM3: m3,
        uTON: ton,
      });

      await DeliveryService.findOneAndUpdate(
        { _id: service._id },
        { price: price._id }
      );
    }
    return sendSuccess(res, "create price table successfully.");
  } catch (error) {

    return sendServerError(res);
  }
});

/**
 * @route PUT /api/admin/price/:id
 * @description update details of an existing price
 * @access private
 */
priceAdminRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const errors = createPriceValidate(req.body);
  if (errors) return sendError(res, errors);
  let { kg, ton, m3 } = req.body;
  try {
    const price = await Price.findById(id);
    if (price) {
      await Price.findByIdAndUpdate(id, { kg: kg, ton: ton, m3: m3 });
      return sendSuccess(res, "Update price successfully.", {
        kg: kg,
        ton: ton,
        m3: m3,
      });
    }
    return sendError(res, "price does not exist.");
  } catch (error) {
    return sendServerError(res);
  }
});

/**
 * @route DELETE /api/admin/price/:id
 * @description delete an existing price
 * @access private
 */
priceAdminRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Price.exists({ _id: id });
    if (!isExist) return sendError(res, "price does not exist.");
    await DeliveryService.findOneAndUpdate({ price: id }, { $unset: { price: id } });
    const price = await Price.findByIdAndRemove(id)
    return sendSuccess(res, "Delete price successfully.", price);
  } catch (error) {
    return sendServerError(res);
  }
});

export default priceAdminRoute;
