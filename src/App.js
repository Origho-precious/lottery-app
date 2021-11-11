import { useEffect, useState } from "react";
import lotteryContract from "./configs/lottery";
import web3 from "./configs/web3";

const App = () => {
	const [manager, setManager] = useState("");
	const [players, setPlayers] = useState([]);
	const [balance, setBalance] = useState("");

	useEffect(() => {
		const asynFunctions = async () => {
			try {
				const getManager = await lotteryContract.methods.manager().call();
				const getPlayers = await lotteryContract.methods.getPlayers().call();
				const getBalance = await web3.eth.getBalance(
					lotteryContract.options.address
				);

				const [manager, players, balance] = await Promise.all([
					getManager,
					getPlayers,
					getBalance,
				]);

				setManager(manager);
				setPlayers(players);
				setBalance(web3.utils.fromWei(balance, "ether"));
			} catch (error) {
				console.log(error);
			}
		};

		asynFunctions();
	}, []);

	return (
		<div>
			<h2>Lottery Contract</h2>
			<p>This Contract is managed by {manager}</p>
			<p>
				They are currently {players?.length} people entered competing to win{" "}
				{balance} ether
			</p>
		</div>
	);
};

export default App;
