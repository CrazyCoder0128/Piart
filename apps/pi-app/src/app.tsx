import { Button } from "@piart/ui";

export function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>PiArt Exchange</h1>
      <p>Pi Browser DApp</p>
      <Button variant="primary">Connect with Pi</Button>
    </div>
  );
}
