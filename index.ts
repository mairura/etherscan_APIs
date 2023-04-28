// Endpoint that gets transactions made to a wallet address between january 1 2022 and december 31 2022
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const API_KEY = process.env.API_KEY;
const ADDRESS = process.env.WALLET_ADDRESS;
const START_BLOCK = 6121236; // block number when 2022 started
const END_BLOCK = 8229567; // block number when 2022 ended

const API_URL = `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${ADDRESS}&startblock=${START_BLOCK}&endblock=${END_BLOCK}&page=1&offset=10&sort=asc&apikey=${API_KEY}`;
console.log("The URL:", API_URL)

type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
};

const getAllTransactions = async (): Promise<Transaction[]> => {
  let retries = 0;
  const maxRetries = 3;
  while (retries < maxRetries) {
    try {
      const response = await fetch(API_URL);
      console.log("Print result:", response)
      if (response.ok) {
        const data = await response.json();
        console.log("Print result:", data)
        return data.result;
      }
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    } catch (error: any) {
      if (error.code === 'ECONNABORTED' && retries < maxRetries) {
        // Retry the request if there was a timeout error
        console.log(`Timeout error occurred, retrying... (${retries + 1}/${maxRetries})`);
        retries++;
      } else {
        throw new Error(`Failed to fetch transactions: ${error.message}`);
      }
    }
  }
  throw new Error(`Failed to fetch transactions after ${maxRetries} retries.`);
};

getAllTransactions().then((transactions: Transaction[]) => console.log("Transaction Made", transactions));
