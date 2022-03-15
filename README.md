# Dojima wallet npm packages.

Npm packages are written to support dojima-wallet UI.

Below are the list of packages available:

- @dojima-wallet/types
- @dojima-wallet/connection
- @dojima-wallet/account
- @dojima-wallet/transfer

## Description

Wallet-js is a lerna repository which allows to manage multiple npm packages. This repo contains packages to create accounts, transfer tokens, get balance from layer1, layer2 blockchains. Currently supported blockchains are Dojima, Ethereum, Solana, Polkadot, Binance, Polygon, Arweave e.t.c

## Types package

This package contains globally required packages like network type e.t.c

## Connection package

This package is used for creating blockchain instances which is useful for blockchain functionalities to create, transfer, balance functionalities.

## Account package

This package is used for creating accounts to layer1 blockchains like arweave, solana, evm chains.

## Transfer package

This package is used for quering balance, transfer tokens to blockchains.

## Non-native package

This package is used for querying non-native token functionalities for multiple blockchains like ethereum - USDT, USDC, BNB, UNI; Arweave - ArDrive, Verto.
