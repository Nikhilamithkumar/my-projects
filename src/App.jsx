import { useState } from "react";
import SnakeGame  from "./Projects/Snake/SnakeGame";
import TicTacToe  from "./Projects/TicTacToe/tictactoe";
import Calculator from "./Projects/Calculator/Calculator";
import Weather from "./Projects/Weather/weather";
import ProfileImg from "./Public/profile.jpg";
import "./index.css";

const projects = [
  {
    id: "snake",
    label: "Snake",
    desc: "Classic arcade game with wrapping edges",
    iconBg: "#2e0a10",
    iconColor: "#e94560",
    icon: "01",
    component: <SnakeGame />,
  },
  {
    id: "tictactoe",
    label: "Tic Tac Toe",
    desc: "Two player strategy game",
    iconBg: "#1a1040",
    iconColor: "#a78bfa",
    icon: "02",
    component: <TicTacToe />,
  },
  {
    id: "calculator",
    label: "Calculator",
    desc: "Simple arithmetic calculator",
    iconBg: "#2e1a00",
    iconColor: "#f59e0b",
    icon: "03",
    component: <Calculator />,
  },
  {
    id: "weather",
    label: "Weather App",
    desc: "Real-time weather information",
    iconBg: "#001f3f",
    iconColor: "#0074D9",
    icon: "04",
    component: <Weather />,
  }
];

export default function App() {
  const [active, setActive] = useState(null);

  if (active) {
    const project = projects.find(p => p.id === active);
    return (
      <>
        <button className="back-btn" onClick={() => setActive(null)}>← Back</button>
        {project.component}
      </>
    );
  }

  return (
    <>
      <div className="header">
        <img src={ProfileImg} className="profile-img" />
        <div className="header-text">
          <h1 className="header-name">Nikhil A</h1>
          <p className="header-tagline"></p>
          <div className="header-divider" />
          <p className="header-desc">
            A collection of projects built while learning React —
            from classic games to everyday tools.
          </p>
        </div>
      </div>

      <div className="menu">
        <p className="menu-heading">Projects</p>
        <div className="menu-grid">
          {projects.map(p => (
            <div key={p.id} className="menu-card" onClick={() => setActive(p.id)}>
              <div className="card-icon" style={{ background: p.iconBg, color: p.iconColor }}>
                {p.icon}
              </div>
              <span className="card-label">{p.label}</span>
              <span className="card-desc">{p.desc}</span>
              <span className="card-cta">View Project</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}