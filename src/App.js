import "./App.css";
// import { NavBar } from "./components/NavBar";
// import { Banner } from "./components/Banner";
// import { Skills } from "./components/Skills";
// import { Projects } from "./components/Projects";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
//import Menu from "./pages/menu";
import CanvasMenu from "./components/Menu";

function App() {
  return (
    <div className="App">
      {/* <Menu /> */}

      <CanvasMenu />
    </div>
  );
}

export default App;
