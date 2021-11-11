import contractAbi, { contractAddress } from "../data/abi";
import web3 from "./web3";

const localContract = new web3.eth.Contract(contractAbi, contractAddress);

export default localContract;
