import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>PiArt Pi Browser App</h1>
      <p>Authenticate with Pi and transact fixed-price NFT-backed art listings.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
