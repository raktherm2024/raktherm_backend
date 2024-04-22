import UPVC_Pipes from "../model/UPVCPipesModel.js";

// PIPES
export const getAllUpvcPipes = async (req, res) => {
  const allPipes = await UPVC_Pipes.find({}).sort({ name: 1 });

  res.status(200).json(allPipes);
};

export const getUpvcPipes = async (req, res) => {
  const allPipes = await UPVC_Pipes.find(
    {},
    { _id: 0, items: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).sort({ name: 1 });

  res.status(200).json(allPipes);
};

export const addUpvcPipes = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const findPipe = await UPVC_Pipes.findOne({ name: itemName });

  if (findPipe) {
    let exist;
    findPipe?.items.forEach((element) => {
      if (element.itemCode === itemCode) {
        return (exist = "true");
      }
      return (exist = false);
    });

    if (exist)
      return res.status(400).json({ message: "Product is already exist." });

    try {
      const updateProduct = await UPVC_Pipes.findByIdAndUpdate(
        findPipe._id,
        {
          $push: {
            items: {
              itemCode: itemCode,
            },
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    const newProduct = await UPVC_Pipes.create({
      name: itemName,
      items: [{ itemCode: itemCode }],
    });

    res.status(200).json(newProduct);
  }
};

export const removeUpvcPipes = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const removeUpvcPipes = await UPVC_Pipes.findOneAndUpdate(
    { name: itemName },
    {
      $pull: {
        items: {
          itemCode: itemCode,
        },
      },
    }
  );

  if (removeUpvcPipes) {
    const allPipes = await UPVC_Pipes.find({}).sort({ name: 1 });

    return res.status(200).json(allPipes);
  }
};
