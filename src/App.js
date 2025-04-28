import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import GameCanvas from "./components/GameCanvas/GameCanvas";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentScene, setCurrentScene] = useState("home");

  const handleSceneChange = (scene) => {
    setCurrentScene(scene);
  };

  return (
    <div className="App">
      <Menu onSceneChange={handleSceneChange} currentScene={currentScene} />
      <GameCanvas currentScene={currentScene} />
    </div>
  );
}

export default App;
