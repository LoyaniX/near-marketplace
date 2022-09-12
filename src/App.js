import React, { useEffect, useCallback, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Products from "./components/marketplace/Products";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/sandwich.jpg";
import "./App.css";

const container = document.getElementById('root');
const root = createRoot(container);

const App = function AppWrapper() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  }, [account]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const application = (
    <>
    <React.StrictMode>
      {<Notification />}
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>{<Products />}</main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
      </React.StrictMode>
    </>
  );

  root.render(application);
};

export default App;