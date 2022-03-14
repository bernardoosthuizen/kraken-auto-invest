import KrakenClient from 'kraken-api';
import dotenv  from "dotenv";

dotenv.config();

const key = process.env.KRAKEN_API_KEY
const secret = process.env.KRAKEN_PRIVATE_KEY
const kraken = new KrakenClient(key, secret);

// Add the coins to invest in here
const coins = [
    {ticker: 'AVAX', amount: 100},
    {ticker: 'KAVA', amount: 100}
]

 
function getRequiredBalance() {
	var requiredBalance = 0;
	coins.map((coin) => {
		return requiredBalance = coin.amount + requiredBalance;
	});
	return requiredBalance;
}

(async () => {

	// Save my USD balance
	const usdBalance = Number((await kraken.api('Balance')).result.ZUSD);

	// Check how much USD we need
	const requiredBalance = Number(getRequiredBalance());
	
	// Check if you have enough money to buy your chosen coins
	if (usdBalance > requiredBalance) {
		console.log("you are rich")
	} 
	else {
		console.log("You are poor")
	}
    

	// Get Ticker Info
	// console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));

	
})();