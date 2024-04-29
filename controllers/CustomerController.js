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

const getSpecificCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.aggregate([
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

  res.status(200).json(customer);
};

const addCustomers = async (req, res) => {
  const { customerCode, customerName, location, contact, email, password } =
    req.body;

  if (!customerCode || !customerName || !location || !contact) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const checkCustomer = await Customer.findOne({ customerCode });

  if (checkCustomer)
    return res.status(400).json({ message: "Customer is already exist" });

  const newCustomer = await Customer.create({
    customerCode,
    customerName,
    location,
    contact,
    type: "customer",
  });

  res.status(200).json({ newCustomer });
};

const removeCustomer = async (req, res) => {
  const { id } = req.params;

  const remove = await Customer.findByIdAndDelete(id);

  if (remove) {
    res.status(200).json({ message: "Customer has been removed!" });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { customerName, location, contact } = req.body;

  const update = await Customer.findByIdAndUpdate(
    id,
    {
      customerName: customerName,
      location: location,
      contact: contact,
    },
    {
      new: true,
    }
  );

  if (update) {
    res.status(200).json({ message: "Customer has been updated." });
  }
};

export {
  getCustomers,
  addCustomers,
  removeCustomer,
  getSpecificCustomer,
  updateCustomer,
};
