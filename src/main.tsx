import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initCalendlyConversionTracking } from "./lib/analytics";
import "./index.css";

initCalendlyConversionTracking();

createRoot(document.getElementById("root")!).render(<App />);
