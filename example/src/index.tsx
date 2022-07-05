import { createRoot } from "react-dom/client";
import { a } from "use-headless";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(<>{a}</>);
