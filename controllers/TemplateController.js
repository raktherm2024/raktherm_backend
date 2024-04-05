import Template from "../model/TemplateModel.js";

export const getTemplate = async (req, res) => {
  const allTemplate = await Template.find();

  res.status(200).json(allTemplate);
};

export const addTemplate = async (req, res) => {
  const { title, message } = req.body;

  const newTemplate = await Template.create({
    title,
    message,
  });

  res.status(200).json(newTemplate);
};

export const removeTemplate = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const deleteTemplate = await Template.findByIdAndDelete(id);

  res.status(200).json(deleteTemplate);
};
