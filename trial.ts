import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api-goerli.etherscan.io/api';

const timestamp = '1675285200';

axios.get(`${BASE_URL}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${API_KEY}`)
  .then((response) => {
    const blockNumber = response.data.result;
    console.log(`Block number mined at timestamp ${timestamp}: ${blockNumber}`);
  })
  .catch((error) => {
    console.error(error);
  });