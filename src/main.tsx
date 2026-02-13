import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { AppProviders } from "@/app/providers";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(<AppProviders />);