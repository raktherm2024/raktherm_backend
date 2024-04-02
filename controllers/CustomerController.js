import Customer from "../model/CustomerModel.js";
import Auth from "../model/AuthModel.js";

const getCustomers = async (req, res) => {
  const customer = await Customer.aggregate([
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

  res.status(200).json(customer);
};

const addCustomers = async (req, res) => {
  const { customerCode, customerName, location, contact, email, password } =
    req.body;

  if (
    !customerCode ||
    !customerName ||
    !location ||
    !contact ||
    !email ||
    !password
  ) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const checkCustomer = await Customer.findOne({ customerCode });
  const checkAccount = await Auth.findOne({ email });

  if (checkCustomer && checkAccount)
    return res.status(400).json({ message: "Customer is already exist" });

  const newCustomer = await Customer.create({
    customerCode,
    customerName,
    location,
    contact,
  });

  const newAccount = await Auth.create({
    user: newCustomer.id,
    email,
    password,
  });

  res.status(200).json({ newCustomer, newAccount });
};

export { getCustomers, addCustomers };
