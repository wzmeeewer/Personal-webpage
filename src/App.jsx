import "./App.css";
import Experience from "./Experience/Experience";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import PortfolioNav from "./components/PortfolioNav/PortfolioNav";
import ContentOverlay from "./components/ContentOverlay/ContentOverlay";

function App() {
  return (
    <>
      <LoadingScreen />
      <PortfolioNav />
      <ContentOverlay />
      <Experience />
    </>
  );
}

export default App;
