import express from "express";
import { sendError, sendServerError, sendSuccess } from "../helper/client.js";
import Career from "../model/Career.js";
import Department from "../model/Department.js";

const careerRoute = express.Router();

/**
 * @route GET /api/career/:id
 * @description get a single career information
 * @access public
 */

careerRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById({ _id: id });
    if (!career) return sendError(res, "Career does not exist.");

    if (career)
      return sendSuccess(res, "get career information successfully.", career);
    return sendError(res, "career information is not found.");
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

/**
 * @route GET /api/career
 * @description get career information
 * @access public
 */

careerRoute.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const { keyword, sortBy, department, type, location, state } = req.query;
    var query = {};
    var keywordCondition = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { type: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
            { state: { $regex: keyword, $options: "i" } },
            { bonus: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};
    if (department) {
      var departmentQuery = {};
      departmentQuery.name = department;
      const departments = await Department.find(departmentQuery);
      const ids = [];
      for (let j = 0; j < departments.length; j++) {
        for (let i = 0; i < departments[j].careers.length; i++) {
          if (departments[j].careers.length) {
            ids.push(departments[j].careers[i]);
          }
        }
      }
      query._id = ids;
    }
    if (type) {
      query.type = type;
    }
    if (location) {
      query.location = location;
    }
    if (state) {
      query.state = state;
    }
    const career = await Career.find({ $and: [query, keywordCondition] })
      .limit(pageSize)
      .skip(pageSize * page)
      .sort(`${sortBy}`);
    var length = await Career.find({ $and: [query, keywordCondition] }).count();
    if (career)
      return sendSuccess(res, "Get career information successfully.", {
        length,
        career,
      });
    return sendError(res, "Career information is not found.");
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

export default careerRoute;
