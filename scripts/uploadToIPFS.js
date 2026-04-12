require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const JWT = process.env.PINATA_JWT;

async function uploadFile() {
  try {
    const data = new FormData();

    data.append("file", fs.createReadStream("./sample.txt"));

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
          ...data.getHeaders(),
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    console.log("✅ CID:", res.data.IpfsHash);
  } catch (error) {
    console.error("❌ Upload failed:");
    console.error(error.response?.data || error.message);
  }
}

uploadFile();