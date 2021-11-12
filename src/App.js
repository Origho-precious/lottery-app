import { useEffect, useState } from "react";
import lotteryContract from "./configs/lottery";
import web3 from "./configs/web3";

const App = () => {
	const [manager, setManager] = useState("");
	const [players, setPlayers] = useState([]);
	const [balance, setBalance] = useState("");
	const [amount, setAmount] = useState("");
	const [message, setMessage] = useState("");
	const [reload, setReload] = useState(false);

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
	}, [reload]);

	const onSubmit = async (e) => {
		try {
			e.preventDefault();

			const accounts = await web3.eth.getAccounts();

			setMessage("Waiting on transaction success...");

			await lotteryContract.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(amount, "ether"),
			});

			setMessage("You have been entered!");
			setAmount("");
			setReload(!reload);
		} catch (error) {
			setMessage("Oops, something went wrong!");
			console.log(error);
		}
	};

	const pickWinner = async () => {
		try {
			const accounts = await web3.eth.getAccounts();

			setMessage("Processing transaction...");

			await lotteryContract.methods.pickWinner().send({ from: accounts[0] });

			const winner = await lotteryContract.methods.winner().call();

			setMessage(`${winner} is the winner`);
			setReload(!reload);
		} catch (error) {
			setMessage("Oops, something went wrong!");
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Lottery Contract</h2>
			<p>This Contract is managed by {manager}</p>
			<p>
				They {players?.length < 2 ? "is" : "are"} currently {players?.length}{" "}
				{players?.length < 2 ? "person" : "people"} competing to win {balance}{" "}
				ether
			</p>
			<br />
			<form onSubmit={onSubmit}>
				<h4>Want to try your luck?</h4>
				<div>
					<label htmlFor="amount">Amount to ether to enter</label>
					<input
						type="text"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<div>
						<small>minimum of 0.001 ETH</small>
					</div>
				</div>
				<button type="submit">Enter</button>
			</form>
			<br />
			<h4>Ready to pick a winner?</h4>
			<button onClick={pickWinner}>Pick a winner</button>

			<br />
			<h2>{message}</h2>
		</div>
	);
};

export default App;
