import { Client, dropsToXrp, rippleTimeToISOTime } from 'xrpl';

import addXrplLogo from './src/assets/helpers/render-xrpl-logo.js';
import getWalletDetails from './src/assets/helpers/get-wallet-details.js';
//import "./src/assets/shims.ts";

// Optional: Render the XRPL logo
addXrplLogo();

document.addEventListener('DOMContentLoaded', () => {
const client = new Client(import.meta.env.VITE_CLIENT); // Get the client from the environment variables

// Get the elements from the DOM
const sendXrpButton = document.querySelector('#send_xrp_button');
const connectWalletButton = document.querySelector('#connect_wallet_button'); // TODO: Implement this logic
const txHistoryButton = document.querySelector('#transaction_history_button');
const walletElement = document.querySelector('#wallet');
const walletLoadingDiv = document.querySelector('#loading_wallet_details');
const ledgerLoadingDiv = document.querySelector('#loading_ledger_details');

// Add event listeners to the buttons
sendXrpButton.addEventListener('click', () => {
    window.location.pathname = '/src/assets/send-xrp/send-xrp.html';
});

connectWalletButton.addEventListener('click', () => {
    window.location.pathname = '/src/assets/connect-wallet/connect-wallet.html';
});

txHistoryButton.addEventListener('click', () => {
    window.location.pathname = '/src/assets/transaction-history/transaction-history.html';
});

// Self-invoking function to connect to the client
(async () => {
    try {
        await client.connect(); // Connect to the client

        // Subscribe to the ledger stream
        await client.request({
            command: 'subscribe',
            streams: ['ledger'],
        });

        // Fetch the wallet details
        getWalletDetails({ client })
            .then(({ account_data, accountReserves, xAddress, address }) => {
                walletElement.querySelector('.wallet_address').textContent = `Wallet Address: ${account_data.Account}`;
                walletElement.querySelector('.wallet_balance').textContent = `Wallet Balance: ${dropsToXrp(account_data.Balance)} XRP`;
                walletElement.querySelector('.wallet_reserve').textContent = `Wallet Reserve: ${accountReserves} XRP`;
                walletElement.querySelector('.wallet_xaddress').textContent = `X-Address: ${xAddress}`;

                // Redirect on View More link click
                walletElement.querySelector('#view_more_button').addEventListener('click', () => {
                    window.open(`https://${import.meta.env.VITE_EXPLORER_NETWORK}.xrpl.org/accounts/${address}`, '_blank');
                });
            })
            .finally(() => {
                walletLoadingDiv.style.display = 'none';
            });


        // Fetch the latest ledger details
        client.on('ledgerClosed', (ledger) => {
            ledgerLoadingDiv.style.display = 'none';
            const ledgerIndex = document.querySelector('#ledger_index');
            const ledgerHash = document.querySelector('#ledger_hash');
            const closeTime = document.querySelector('#close_time');
            ledgerIndex.textContent = `Ledger Index: ${ledger.ledger_index}`;
            ledgerHash.textContent = `Ledger Hash: ${ledger.ledger_hash}`;
            closeTime.textContent = `Close Time: ${rippleTimeToISOTime(ledger.ledger_time)}`;
        });

    } catch (error) {
        await client.disconnect();
        console.log(error);
    }
})();
});