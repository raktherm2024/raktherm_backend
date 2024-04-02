import Auth from "../model/AuthModel.js";
import Customer from "../model/CustomerModel.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email });

  if (user && user.password === password) {
    const customerData = await Customer.findById(user.user);

    res.status(200).json({
      userId: user.user,
      customerName: customerData.customerName,
      customerCode: customerData.customerCode,
      location: customerData.location,
      contact: customerData.contact,
      email: user.email,
      userType: user.userType,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
