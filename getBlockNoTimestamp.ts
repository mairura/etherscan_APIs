import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const API_KEY = process.env.API_KEY;

async function getBlockNumberByTime() {
  const url = "https://api-goerli.etherscan.io/api";
  const timestamp = "1672434000";
  const closest = "before";
  const apiKey = API_KEY;

  const response = await axios.get(url, {
    params: {
      module: "block",
      action: "getblocknobytime",
      timestamp,
      closest,
      apikey: apiKey,
    },
  });

  console.log(response.data.result);
}

getBlockNumberByTime();