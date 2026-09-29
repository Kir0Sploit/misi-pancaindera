import {
  ArrowRight,
  BookOpen,
  Music2,
  Pause,
  Play,
  Plane,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react";
import { Airport } from "./UI";
import { groups } from "../data/questions";
import { useState } from "react";

type Props = {
  onStart: () => void;
  onHelp: () => void;
  music: boolean;
  onMusic: () => void;
};
export function GameHome({ onStart, onHelp, music, onMusic }: Props) {
  const [motion, setMotion] = useState(true);
  return (
    <section
      className={`game-home ${motion ? "" : "motion-paused"}`}
      aria-label="Lobi permainan"
    >
      <div className="sky-grid" aria-hidden="true" />
      <div className="lobby-top">
        <span className="academy">
          <ShieldCheck size={18} /> AKADEMI PEGAWAI MUDA
        </span>
        <span className="flight-label">
          <Plane size={15} /> KUL <span>→</span> SIN <b>PINTU A04</b>
        </span>
      </div>
      <div className="lobby-content">
        <div className="lobby-menu">
          <div className="mission-label">
            <span /> PENGEMBARAAN BAHASA MELAYU
          </div>
          <h1 tabIndex={-1}>
            <span>MISI PEMERIKSAAN</span>
            <strong>
              PANCA<span>INDERA</span>
            </strong>
          </h1>
          <p className="lobby-subtitle">
            Jadilah Pegawai Pemeriksaan Pancaindera!
          </p>
          <p className="lobby-description">
            Bagasi sudah tiba. Lima deria anda diperlukan.
            <br />
            Bersedia untuk pemeriksaan?
          </p>
          <div className="lobby-buttons">
            <button className="play-button" onClick={onStart}>
              <span className="play-symbol">
                <Play fill="currentColor" size={23} />
              </span>
              MULA MISI
              <ArrowRight size={23} />
            </button>
            <button className="guide-button" onClick={onHelp}>
              <BookOpen size={19} /> CARA BERMAIN
            </button>
          </div>
          <div className="lobby-reward">
            <span>
              <Trophy size={19} />
            </span>
            <p>
              Lengkapkan 2 misi <b>dan kumpulkan 10 bintang!</b>
            </p>
            <div className="reward-stars" aria-hidden="true">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
        <div className="lobby-world">
          <div className="world-orbit" aria-hidden="true" />
          <span className="world-spark spark-one" aria-hidden="true">
            ✦
          </span>
          <span className="world-spark spark-two" aria-hidden="true">
            ✧
          </span>
          <div className="terminal-sign">
            <span className="signal-light" /> TERMINAL PANCAINDERA{" "}
            <span>01</span>
          </div>
          <Airport />
          <div className="officer-bubble">
            Hai, Pegawai! <span>Jom mulakan misi! ✨</span>
          </div>
          <div className="inspection-stamp">
            <ShieldCheck size={26} />
            <div>
              IMBASAN BAGASI<small>Menunggu pasukan anda</small>
            </div>
            <span className="scan-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="floating-star star-a" aria-hidden="true">
            <Star fill="currentColor" />
          </div>
          <div className="floating-star star-b" aria-hidden="true">
            <Star fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="lobby-bottom">
        <div className="senses-dock">
          <span className="dock-label">
            5 DERIA
            <br />
            <b>1 PASUKAN ANDA</b>
          </span>
          {groups.map((g) => (
            <div
              className="sense-token"
              key={g.name}
              style={{ "--sense-color": g.color } as React.CSSProperties}
            >
              <span>{g.icon}</span>
              <small>{g.name}</small>
            </div>
          ))}
        </div>
        <div className="lobby-controls">
          <button
            data-audio-control
            aria-label={music ? "Matikan muzik latar" : "Hidupkan muzik latar"}
            aria-pressed={music}
            onClick={onMusic}
          >
            <Music2 size={18} />
            <span>Muzik {music ? "ON" : "OFF"}</span>
            <span
              className={"equalizer " + (music ? "" : "muted")}
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>
          </button>
          <button
            onClick={() => setMotion(!motion)}
            aria-label={motion ? "Jeda animasi" : "Sambung animasi"}
          >
            {motion ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </div>
      <div className="runway-edge" aria-hidden="true" />
    </section>
  );
}
