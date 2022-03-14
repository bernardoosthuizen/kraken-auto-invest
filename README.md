# Kraken - Auto Invest

## Description
This is a simple bot that helps you automatically and periodically buy selected cryptocurrencies on Kraken crypto exchange. I hope to gain confidence in using APIs and their documentation with Node.js.

![kraken-project-banner](https://user-images.githubusercontent.com/46342592/156112167-9bf78e1e-6d43-4756-b869-26e7a1ab9877.png)

### Installation and Setup Instructions
Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`   

- Add .env file to root folder with KRAKEN_API_KEY and KRAKEN_PRIVATE_KEY variables. See https://support.kraken.com/hc/en-us/articles/360000919966-How-to-generate-an-API-key-pair- for more info.
- Modify desired coin and amount in USD to purchase everytime the bot runs. (COINS array, line 11)

NOTE: This bot places a market order. To modify this please see Kraken API docs.

To run bot locally:

`node index.js`  

To run this as a cron job on Google Cloud Functions:
- Create a new Google Cloud project
- Create a new cloud function (https://cloud.google.com/functions/docs/create-deploy-nodejs)
- Deploy your function (https://cloud.google.com/functions/docs/deploying)
- Set event trigger to Google pub/sub (https://cloud.google.com/functions/docs/calling/pubsub)
- Configure a cron job on Google Scheduler to specify a Pub/Sub topic as the job target (https://cloud.google.com/scheduler/docs/schedule-run-cron-job)

### Reflections
This project was more challenging than expected. Initially, I intended not to use any helper packages. After going through their API documentation and other resources I realised for the time being I will need to use a helper package (npm-kraken-api). I was taken aback as to how unclear the API documentation was for me. Once I have a bit more experience I will redo this project as initially intended. This project has been a really good learning experience, which I enjoyed.
