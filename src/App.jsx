import { useState } from "react";
import SnakeGame  from "./Projects/Snake/SnakeGame";
import TicTacToe  from "./Projects/TicTacToe/tictactoe";
import Calculator from "./Projects/Calculator/Calculator";
import Weather from "./Projects/Weather/weather";
import ProfileImg from "./Public/profile.jpg";
import BannerImg  from "./Public/bannerimg.jpg";
import GithubIcon  from "./Public/github.png";
import LinkedInIcon from "./Public/linkedin.png";
import EmailIcon   from "./Public/email.png";
import "./index.css";

const projects = [
  { id: "snake",      label: "Snake",       desc: "Classic arcade game with wrapping edges", iconBg: "#2e0a10", iconColor: "#e94560", icon: "01", component: <SnakeGame />  },
  { id: "tictactoe",  label: "Tic Tac Toe", desc: "Two player strategy game",                iconBg: "#1a1040", iconColor: "#a78bfa", icon: "02", component: <TicTacToe />  },
  { id: "calculator", label: "Calculator",  desc: "Simple arithmetic calculator",            iconBg: "#2e1a00", iconColor: "#f59e0b", icon: "03", component: <Calculator /> },
  { id: "weather",    label: "Weather App", desc: "Real-time weather information",           iconBg: "#001f3f", iconColor: "#0074D9", icon: "04", component: <Weather />    },
];

const education = [
  {
    level:  "Higher Secondary Education",
    school: "PSBB Millennium School",
    board:  "CBSE",
    year:   "2024-25",
    score:  "481/500 (96.2%)",
  },
  {
    level:  "Bachelor of Technology (B.Tech)",
    school: "VIT University, Vellore",
    board:  "Electronics & Communication Engineering",
    year:   "2024 – Present",
    score:  "CGPA: 9.02 / 10",
  },
];

const skills = [
  { category: "Programming  Languages",   items: ["C", "Python", "JavaScript","C++","Java"] },
  { category: "Frontend Development",    items: ["React", "HTML", "CSS",] },
  { category: "Tools",       items: ["Git", "GitHub", "KiCAD"] },
  { category: "Electronics", items: ["Circuit Design", "Embedded Systems", "Logic Design","Verilog","FPGA","PCB Design","Verilog Testbenches"] },
];

const contacts = [
  {
    href:    "https://github.com/Nikhilamithkumar",
    icon:    GithubIcon,
    iconBg:  "#161b22",
    label:   "GitHub",
    value:   "Nikhilamithkumar",
  },
  {
    href:    "https://www.linkedin.com/in/nikhil-amith-22b427202/",
    icon:    LinkedInIcon,
    iconBg:  "#0a66c200",
    label:   "LinkedIn",
    value:   "Nikhil Amith",
  },
  {
    href:    "mailto:nikhilamithkumar@gmail.com",
    icon:    EmailIcon,
    iconBg:  "#1a3a2a",
    label:   "Email",
    value:   "nikhilamithkumar@gmail.com",
  },
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
    <div className="portfolio">
      <div className="header">
        <div className="header-banner"><img src={BannerImg} alt="Banner" /></div>
        <div className="header-profile">
          <img src={ProfileImg} className="profile-img" alt="Profile" />
          <div className="header-info">
            <h1 className="header-name">Nikhil A</h1>
            <p className="header-role">Electronics Engineering Student</p>
            <p className="header-college">Your College Name · Chennai, India</p>
          </div>
        </div>
        <div className="header-divider" />
        <p className="header-desc">
          First year Electronics Engineering student with a passion for
          building things — from circuits to code.
        </p>
      </div>

      <section className="section">
        <p className="section-heading">Education</p>
        <div className="edu-grid">
          {education.map((e, i) => (
            <div key={i} className="edu-card">
              <span className="edu-level">{e.level}</span>
              <h3 className="edu-school">{e.school}</h3>
              <p className="edu-board">{e.board}</p>
              <div className="edu-footer">
                <span className="edu-year">{e.year}</span>
                <span className="edu-score">{e.score}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-heading">Skills</p>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-card">
              <div className="skill-card-inner">
                <div className="skill-card-front">
                  <p className="skill-category">{s.category}</p>
                </div>
                <div className="skill-card-back">
                  <p className="skill-category-back">{s.category}</p>
                  <div className="skill-items">
                    {s.items.map((item, j) => (
                      <span key={j} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-heading">Projects</p>
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
      </section>

      <section className="section">
        <p className="section-heading">Contact</p>
        <div className="contact-grid">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon" style={{ background: c.iconBg }}>
                <img src={c.icon} alt={c.label} className="contact-icon-img" />
              </div>
              <div className="contact-info">
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Built with React · Nikhil A · 2026</p>
      </footer>
    </div>
  );
}