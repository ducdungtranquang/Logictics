import express from "express";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import Career from "../../model/Career.js";
import { careerValidate } from "../../validation/career.js";
import Department from "../../model/Department.js";

const careerAdminRoute = express.Router();

/**
 * @route POST /api/admin/career/:departmentId
 * @description register new career offer
 * @access private
 */
careerAdminRoute.post("/:departmentId", async (req, res) => {
  const errors = careerValidate(req.body);
  if (errors) return sendError(res, errors);

  let { name, type, description, location, state, bonus, deadline } = req.body;

  try {
    const career = await Career.create({
      name,
      type,
      description,
      location,
      state,
      bonus,
      deadline,
    });

    const department = await Department.exists({
      _id: req.params.departmentId,
    });
    if (department) {
      await Department.updateOne(
        {
          _id: department._id,
        },
        {
          $push: { careers: career },
        }
      );
      return sendSuccess(res, "Added career in department file successfully");
    }
  } catch (error) {
    return sendServerError(res);
  }
  return sendSuccess(res, "career registered successfully.");
});

/**
 * @route PUT /api/admin/career/:id
 * @description update details of an existing career
 * @access private
 */
careerAdminRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const errors = careerValidate(req.body);
  if (errors) return sendError(res, errors);
  let { name, type, description, location, state, bonus, deadline } = req.body;
  try {
    const career = await Career.findById(id);
    if (career) {
      await Career.findByIdAndUpdate(id, {
        name: name,
        type: type,
        description: description,
        location: location,
        state: state,
        bonus: bonus,
        deadline: deadline,
      });
      return sendSuccess(res, "Update career successfully.", {
        name: name,
        type: type,
        description: description,
        location: location,
        state: state,
        bonus: bonus,
        deadline: deadline,
      });
    }
    return sendError(res, "Career does not exist.");
  } catch (error) {
    return sendServerError(res);
  }
});

/**
 * @route DELETE /api/admin/career/:id
 * @description delete an existing career
 * @access private
 */
careerAdminRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Career.exists({ _id: id });
    if (!isExist) return sendError(res, "Career does not exist.");
    await Department.updateOne({}, { $pull: { careers: id } });
    const career = await Career.findByIdAndRemove(id)
    return sendSuccess(res, "Delete career successfully.", career);
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

export default careerAdminRoute;
