import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { worker } from "./Mocks/browser.ts";
import "./index.css";

// Used only during development
if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
