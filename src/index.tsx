import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./App";
import "./styles/build/style.css";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);

serviceWorkerRegistration.register(); 
