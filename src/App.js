import { useEffect, useState } from "react";
import localContract from "./configs/lottery";
import web3Config from "./configs/web3";

const App = () => {
	const [manager, setManager] = useState("");

	useEffect(() => {
		const getManager = async () => {
			try {
				const accounts = await web3Config.eth.getAccounts();
				console.log(accounts);

				const res = await localContract.methods.manager().call();

				console.log(res);

				setManager(res);
			} catch (error) {
				console.log(error);
			}
		};

		getManager();
	}, []);

	return (
		<div>
			<h2>Lottery Contract</h2>
			<p>This Contract is managed by {manager}</p>
		</div>
	);
};

export default App;
