import ThemeConfig from "../theme";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <ThemeConfig>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ThemeConfig>
  );
}

export default MyApp;
