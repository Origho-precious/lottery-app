import web3Config from "./configs/web3";

const App = () => {
	console.log(web3Config().eth.getAccounts().then(console.log));
	return <div>Hi</div>;
};

export default App;
