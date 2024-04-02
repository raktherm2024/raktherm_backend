import PEX_Adapters from "../model/PEXAdaptersModel.js";
import PEX_Pipes from "../model/PEXPipesModel.js";

// PIPES

export const getAllPexPipes = async (req, res) => {
  const allPipes = await PEX_Pipes.find({}).sort({ name: 1 });

  res.status(200).json(allPipes);
};

export const getPexPipes = async (req, res) => {
  const allPipes = await PEX_Pipes.find(
    {},
    { _id: 0, items: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).sort({ name: 1 });

  res.status(200).json(allPipes);
};

export const addPexPipes = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const findPipe = await PEX_Pipes.findOne({ name: itemName });

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
      const updateProduct = await PEX_Pipes.findByIdAndUpdate(
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
    const newProduct = await PEX_Pipes.create({
      name: itemName,
      items: [{ itemCode: itemCode }],
    });

    res.status(200).json(newProduct);
  }
};

export const removePexPipes = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const removePexPipes = await PEX_Pipes.findOneAndUpdate(
    { name: itemName },
    {
      $pull: {
        items: {
          itemCode: itemCode,
        },
      },
    }
  );

  if (removePexPipes) {
    const allPipes = await PEX_Pipes.find({}).sort({ name: 1 });

    return res.status(200).json(allPipes);
  }
};

// ADAPTERS

export const getAllPexAdapters = async (req, res) => {
  const allAdapters = await PEX_Adapters.find({}).sort({ name: 1 });

  res.status(200).json(allAdapters);
};

export const getPexAdapters = async (req, res) => {
  const allAdapters = await PEX_Adapters.find(
    {},
    { _id: 0, items: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).sort({ name: 1 });

  res.status(200).json(allAdapters);
};

export const addPexAdapters = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const findPipe = await PEX_Adapters.findOne({ name: itemName });

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
      const updateProduct = await PEX_Adapters.findByIdAndUpdate(
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
    const newProduct = await PEX_Adapters.create({
      name: itemName,
      items: [{ itemCode: itemCode }],
    });

    res.status(200).json(newProduct);
  }
};

export const removePexAdapters = async (req, res) => {
  const { itemName, itemCode } = req.body;

  const pexAdapters = await PEX_Adapters.findOneAndUpdate(
    { name: itemName },
    {
      $pull: {
        items: {
          itemCode: itemCode,
        },
      },
    }
  );

  if (pexAdapters) {
    const allPipes = await PEX_Adapters.find({}).sort({ name: 1 });

    return res.status(200).json(allPipes);
  }
};
