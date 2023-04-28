import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const API_KEY = process.env.API_KEY;
const API_ENDPOINT =`https://api-goerli.etherscan.io/api?module=block&action=getblocknobytime&timestamp=1640984400&closest=before&apikey=${API_KEY}`;
console.log("Print the endpoint:",API_ENDPOINT);

const ADDRESS: any = process.env.WALLET_ADDRESS;

async function getBalance(address: string): Promise<string> {
  const params = {
    module: "account",
    action: "balance",
    address: address,
    tag: "latest",
    apikey: API_KEY,
  };

  const response = await axios.get(API_ENDPOINT, { params });
  return response.data.result;
}

// Example usage:
getBalance(ADDRESS).then((balance) => {
  console.log("Balance:", balance);
});