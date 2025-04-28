import "./Menu.css";

const Menu = ({ onSceneChange, currentScene }) => {
  return (
    <nav className="game-menu">
      <button
        className={currentScene === "home" ? "active" : ""}
        onClick={() => onSceneChange("home")}
      >
        Home
      </button>
      <button
        className={currentScene === "about" ? "active" : ""}
        onClick={() => onSceneChange("about")}
      >
        About
      </button>
      <button
        className={currentScene === "game" ? "active" : ""}
        onClick={() => onSceneChange("game")}
      >
        Play
      </button>
    </nav>
  );
};

export default Menu;
