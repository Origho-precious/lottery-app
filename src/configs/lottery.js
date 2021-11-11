import contractAbi from "../data/abi";
import web3 from "./web3";

const contractAddress = 0x3a5e124d69c1789a97baa632089067ebe94147b8;

const localContract = new web3.eth.Contract(contractAbi, contractAddress);

export default localContract;
