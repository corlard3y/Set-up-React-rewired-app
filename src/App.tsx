import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as PushAPI from "@pushprotocol/restapi";

function App() {
   const [walletAddress, setWalletAddress] = useState<string>(
    "0xD8634C39BBFd4033c0d3289C4515275102423681"
  );

  useEffect(() => {
    console.log("walletAddress:", walletAddress);
    async function fetchNotifications() {
      const res = await PushAPI.user.getFeeds({
        user: `eip155:5:${walletAddress}`, // user address in CAIP
        env: "staging" as any,
      });
      console.log(res);
    }

    fetchNotifications();
  }, [walletAddress]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
