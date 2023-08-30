import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./Mocks/browser";
import "./index.css";

// Used only during development
if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
