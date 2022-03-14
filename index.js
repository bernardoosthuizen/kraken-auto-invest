import KrakenClient from 'kraken-api';
import dotenv  from "dotenv";

dotenv.config();

const key = process.env.KRAKEN_API_KEY
const secret = process.env.KRAKEN_PRIVATE_KEY
const kraken = new KrakenClient(key, secret);

// Add the coins to invest in here
const coins = [
    {ticker: 'AVAXUSD', amount: 100},
    {ticker: 'KAVAUSD', amount: 100}
]

 
function getRequiredBalance() {
	var requiredBalance = 0;
	coins.map((coin) => {
		return requiredBalance = coin.amount + requiredBalance;
	});
	return requiredBalance;
}

// Function to delay actions - avoid hitting API rate call limit
async function wait() {
	return new Promise((resolve) => setTimeout(resolve, 3000))
}

(async () => {

	// Save my USD balance
	const usdBalance = Number((await kraken.api('Balance')).result.ZUSD);

	// Check how much USD we need to buy our selected coins
	const requiredBalance = Number(getRequiredBalance());

	// Get Ticker Info
	const tickerInfo = await kraken.api('Ticker', { pair : coins.map(coin => coin.ticker).join(',') });

	// Add current prices to COINS array
	coins.forEach(coin => {
		coin.currentPrice = parseFloat(tickerInfo.result[coin.ticker].a[0])
	})

	
	
	//Check if you have enough money to buy your chosen coins
	if (usdBalance >= requiredBalance) {
		// Buy your coins
		for(const coin of coins) {
			await wait();

			try {
				const volume = coin.amount / coin.currentPrice;

				const result = await kraken.api('AddOrder', { 
					pair : coin.ticker,
					type: 'buy',
					ordertype: 'market',
					volume,
				});
				console.log(result);
				console.log('You just bought' + volume + 'of' + pair);
			} catch (error) {
				console.error(error);
			}
			
		}
	} 
	else {
		// Do not buy - notify my somehow
		console.error("You are too poor")
	}
})();