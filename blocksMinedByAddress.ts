import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api-goerli.etherscan.io/api';
const ADDRESS: any = process.env.WALLET_ADDRESS;

axios.get(`${BASE_URL}?module=account&action=getminedblocks&address=${ADDRESS}&blocktype=blocks&offset=10&apikey=${API_KEY}`)
  .then((response) => {
    const blockNumber = response.data.result;
    console.log(blockNumber)
    console.log(`List of Blocks Mined: ${blockNumber}`);
  })
  .catch((error) => {
    console.error(error);
  });