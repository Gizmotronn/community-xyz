#!/bin/sh
# Start Hardhat node in background, deploy contract, then keep node alive
npx hardhat node &
sleep 5
npx hardhat run scripts/deploy.ts --network localhost
wait
