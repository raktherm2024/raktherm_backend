import Order from "../model/OrderModel.js";

export const getExistingOrder = async (req, res) => {
  const { id } = req.params;

  const getOrder = await Order.findOne({
    user: id,
    status: "Unfinished",
  });

  res.status(200).json(getOrder);
};

export const deleteExistingOrder = async (req, res) => {
  const { id } = req.params;

  await Order.findOneAndDelete({
    user: id,
    status: "Unfinished",
  });
};

export const getOrderDetails = async (req, res) => {
  const { userId, orderNo } = req.body;

  const checkOrder = await Order.findOne({
    user: userId,
    status: "Unfinished",
  });

  if (!checkOrder) {
    const createOrder = await Order.create({
      user: userId,
      orderNo,
    });
    return res.status(200).json(createOrder);
  }

  res.status(200).json(checkOrder);
};

export const addOrder = async (req, res) => {
  const { id } = req.params;
  const { itemCode, itemName, quantity, oem } = req.body;

  const checkExistItem = await Order.findById(id);

  let exist = "";

  checkExistItem.orders.forEach((element) => {
    if (element.itemName === itemName && element.itemCode === itemCode) {
      return (exist = true);
    }
    return (exist = false);
  });

  if (exist)
    return res
      .status(400)
      .json({ message: "Item is already exist in your order list." });

  try {
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      {
        $push: {
          orders: {
            itemName: itemName,
            itemCode: itemCode,
            quantity: quantity,
            oem: oem,
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const removeSpecificOrder = async (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  const updateOrder = await Order.findByIdAndUpdate(
    id,
    {
      $pull: {
        orders: {
          _id: itemId,
        },
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json(updateOrder);
};
