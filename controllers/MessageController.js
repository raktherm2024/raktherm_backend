import Message from "../model/MessageModel.js";
import { Infobip, AuthType } from "@infobip-api/sdk";
import dotenv from "dotenv";
dotenv.config();

const infobipClient = new Infobip({
  baseUrl: process.env.INFOBIP_URL,
  apiKey: process.env.INFOBIP_KEY,
  authType: AuthType.ApiKey,
});

export const getMessage = async (req, res) => {
  const allMessage = await Message.find();

  res.status(200).json(allMessage);
};

export const saveMessage = async (req, res) => {
  const { customerList, messageContent, sentFrom } = req.body;

  for (let index = 0; index < customerList.length; index++) {
    Message.create({
      sentFrom: sentFrom,
      name: customerList[index].name,
      sentTo: customerList[index].contact,
      message: messageContent,
    });
  }

  res.status(200).json({ message: "Success" });
};

export const sendMessage = async (req, res) => {
  const { contactList, messageContent } = req.body;

  for (let index = 0; index < contactList.length; index++) {
    await infobipClient.channels.sms.send(
      {
        type: "text",
        messages: [
          {
            destinations: [
              {
                to: contactList[index],
              },
            ],
            from: "RAKtherm",
            text: messageContent,
          },
        ],
      },
      {}
    );
  }
  res.status(200).json({ message: "Messages successfully sent" });
};

export const clearHistory = async (req, res) => {
  await Message.deleteMany();

  const allMessage = await Message.find();

  res.status(200).json(allMessage);
};
