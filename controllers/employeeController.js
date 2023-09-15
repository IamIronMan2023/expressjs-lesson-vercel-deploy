import Employee from "../models/Employee.js";
import mongoose from "mongoose";

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    throw error;
  }
};

const getEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      //400 status code is invalid parameter
      res.status(400).json({ message: "Invalid parameter." });
      return;
    }

    const employee = await Employee.findById(id);
    if (employee) {
      res.json(employee);
    } else {
      //404 record not found
      res.status(404).json({ message: "Record not found." });
    }
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (req, res) => {
  const { first_name, last_name, email, age } = req.body;
  try {
    const employee = await Employee.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
    });

    if (employee) {
      res.status(201).json({
        message: "employee created successfully",
        data: employee,
      });
    } else {
      res.status(204).json({ message: "failed to create employee record." });
    }
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid parameter." });
    return;
  }

  try {
    const { first_name, last_name, email, age } = req.body;
    const employee = await Employee.findByIdAndUpdate(id, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
    });

    if (employee) {
      res.status(200).json({
        message: "employee updated successfully",
      });
    } else {
      res.status(204).json({ message: "failed to update employee record." });
    }
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid parameter." });
    return;
  }

  try {
    try {
      const result = await Employee.findByIdAndDelete(id);
      res.json({ message: "employee deleted successfully", data: result });
    } catch (err) {
      res.json({ message: "failed to delete employee record." });
    }
  } catch (error) {
    throw error;
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
