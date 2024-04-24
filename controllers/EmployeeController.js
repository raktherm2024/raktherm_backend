import Employee from "../model/EmployeeModel.js";
import Auth from "../model/AuthModel.js";

const getEmployee = async (req, res) => {
  const employee = await Employee.aggregate([
    {
      $lookup: {
        from: "auths",
        localField: "_id",
        foreignField: "user",
        pipeline: [{ $project: { _id: 0, email: 1, userType: 1 } }],
        as: "account",
      },
    },
  ]);

  res.status(200).json(employee);
};

const getSpecificEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.aggregate([
    {
      $match: {
        $expr: { $eq: ["$_id", { $toObjectId: id }] },
      },
    },
    {
      $lookup: {
        from: "auths",
        localField: "_id",
        foreignField: "user",
        pipeline: [{ $project: { _id: 0, email: 1, password: 1 } }],
        as: "account",
      },
    },
  ]);

  res.status(200).json(employee);
};

const addEmployee = async (req, res) => {
  const { employeeCode, employeeName, location, type, email, password } =
    req.body;

  if (
    !employeeCode ||
    !employeeName ||
    !location ||
    !type ||
    !email ||
    !password
  ) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const checkEmployee = await Employee.findOne({ employeeCode });
  const checkAccount = await Auth.findOne({ email });

  if (checkEmployee && checkAccount)
    return res.status(400).json({ message: "Employee is already exist" });

  if (checkEmployee)
    return res.status(400).json({
      message: "Employee Code is already exist.",
    });

  if (checkAccount)
    return res.status(400).json({
      message: "Email is already exist.",
    });

  const newEmployee = await Employee.create({
    employeeCode,
    employeeName,
    location,
    type: type,
  });

  const newAccount = await Auth.create({
    user: newEmployee.id,
    email,
    password,
    userType: type,
  });

  res.status(200).json({ newEmployee, newAccount });
};

const removeEmployee = async (req, res) => {
  const { id } = req.params;

  const remove = await Employee.findByIdAndDelete(id);
  const authDetails = await Auth.findOne({ user: id });

  await Auth.findByIdAndDelete(authDetails._id);

  if (remove) {
    res.status(200).json({ message: "Employee has been removed!" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeCode, employeeName, location, type, email, password } =
    req.body;

  const update = await Employee.findByIdAndUpdate(
    id,
    {
      employeeCode: employeeCode,
      employeeName: employeeName,
      location: location,
      type: type,
    },
    {
      new: true,
    }
  );

  if (update) {
    res.status(200).json({ message: "Employee has been updated." });
  }
};

export {
  getEmployee,
  addEmployee,
  removeEmployee,
  getSpecificEmployee,
  updateEmployee,
};
