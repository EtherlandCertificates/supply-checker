# Etherland supply checker

This repo contains a small Express server using Ethers and Alchemy to retrieve information about the ELAND token on the mainnet at `0x33e07f5055173cf8febede8b21b12d1e2b523205`.

It exposes 3 routes:

- `/api/totalsupply`: return the total supply of ELAND tokens.
- `/api/circulatingsupply`: return the circulating supply of ELAND tokens (total supply minus supply reserved for the protocol development).
- `/api/etherlandwallets`: return the supply reserved for the protocol development.

If you want to run it locally, you will have to first create a `.env` file like so:
```
PORT=<optional port>
RPC_KEY=<your alchemy mainnet app key>
PRIVATE_KEY=<your private key>
```

Then, you need to install the dependencies and run the server:
```
$ npm install
$ node app.js
```

You can see the result in your browser by running: `http://localhost:3000/api/totalsupply`.