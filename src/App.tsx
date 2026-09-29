import { useEffect, useMemo, useState } from "react";
import {
  Plane,
  ArrowRight,
  Volume2,
  VolumeX,
  Settings,
  Star,
  Check,
  Clock,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import {
  groups,
  selectQuestions,
  optionsFor,
  shuffle,
  objectiveMet,
  type Category,
  type Question,
} from "./data/questions";
import { Modal } from "./components/UI";
import { GameHome } from "./components/GameHome";
import { GameAudio } from "./audio/GameAudio";
type Screen =
  "home" | "groups" | "welcome" | "one" | "transition" | "two" | "results";
type Preferences = {
  sound: boolean;
  music: boolean;
  timer: boolean;
  hints: boolean;
  set: string;
};
const defaults: Preferences = {
  sound: true,
  music: true,
  timer: false,
  hints: true,
  set: "rawak",
};
function load(): Preferences {
  try {
    const p = JSON.parse(localStorage.getItem("pancaindera-settings") || "{}");
    return {
      sound: typeof p.sound === "boolean" ? p.sound : true,
      music: p.music !== false,
      timer: p.timer === true,
      hints: p.hints !== false,
      set: ["a", "b", "rawak"].includes(p.set) ? p.set : "rawak",
    };
  } catch {
    return defaults;
  }
}
export default function App() {
  const [gameAudio] = useState(() => new GameAudio());
  useEffect(() => {
    const visibility = () => gameAudio.setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      gameAudio.dispose();
    };
  }, [gameAudio]);
  const [screen, setScreen] = useState<Screen>("home"),
    [group, setGroup] = useState<Category>("Penglihatan"),
    [prefs, setPrefs] = useState(load),
    [modal, setModal] = useState<"help" | "settings" | null>(null);
  const [teacherGroup, setTeacherGroup] = useState<Category>("Penglihatan");
  const [deck, setDeck] = useState<Question[]>([]),
    [index, setIndex] = useState(0),
    [stars, setStars] = useState(0),
    [scores, setScores] = useState([0, 0]),
    [attempts, setAttempts] = useState(0),
    [feedback, setFeedback] = useState(""),
    [solved, setSolved] = useState(false),
    [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]),
    [selected, setSelected] = useState<number | null>(null),
    [seconds, setSeconds] = useState(0),
    [hint, setHint] = useState(false);
  useEffect(() => {
    gameAudio.configure(prefs.sound, prefs.music);
  }, [gameAudio, prefs.sound, prefs.music]);
  const q = deck[index];
  const choices = useMemo(() => (q ? optionsFor(q) : []), [q]);
  const chunkOrder = useMemo(() => shuffle([0, 1, 2, 3]), [q, screen]);
  const active = screen === "one" || screen === "two";
  const currentGroup = groups.find((g) => g.name === group)!;
  useEffect(() => {
    try {
      localStorage.setItem("pancaindera-settings", JSON.stringify(prefs));
    } catch {}
  }, [prefs]);
  useEffect(() => {
    if (!active || !prefs.timer || modal) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active, prefs.timer, modal]);
  useEffect(() => {
    document.querySelector<HTMLElement>("main h1,main h2")?.focus();
  }, [screen, index]);
  function clearQuestion() {
    setAttempts(0);
    setFeedback("");
    setSolved(false);
    setSlots([null, null, null, null]);
    setSelected(null);
    setHint(false);
  }
  function start(category = group) {
    gameAudio.effect("launch");
    setGroup(category);
    setDeck(selectQuestions(category, prefs.set));
    setIndex(0);
    setStars(0);
    setScores([0, 0]);
    setSeconds(0);
    clearQuestion();
    setScreen("one");
  }
  function answer(correct: boolean) {
    if (solved) return;
    gameAudio.effect(correct ? "correct" : "retry");
    if (correct) {
      setSolved(true);
      setStars((s) => s + 1);
      if (attempts === 0 && !hint)
        setScores((s) =>
          s.map((v, i) => (i === (screen === "one" ? 0 : 1) ? v + 1 : v)),
        );
      setFeedback(
        screen === "one" ? "Betul! Bagus!" : "Hebat! Struktur ayat betul.",
      );
    } else {
      setAttempts((a) => a + 1);
      setFeedback(
        screen === "one"
          ? "Belum tepat. Cuba lagi!"
          : "Hampir betul. Cuba susun semula.",
      );
    }
  }
  function next() {
    clearQuestion();
    if (index < 4) setIndex((i) => i + 1);
    else if (screen === "one") {
      gameAudio.effect("complete");
      setScreen("transition");
      setIndex(0);
    } else {
      gameAudio.effect("complete");
      setScreen("results");
    }
  }
  function reset() {
    setScreen("home");
    setStars(0);
    setScores([0, 0]);
    setSeconds(0);
    clearQuestion();
    setModal(null);
  }
  return (
    <div
      className={`app ${screen === "home" ? "home-app" : ""}`}
      onClickCapture={(event) => {
        gameAudio.configure(prefs.sound, prefs.music);
        gameAudio.unlock();
        const button = (event.target as Element).closest("button");
        if (
          button &&
          !button.hasAttribute("data-audio-control") &&
          !button.matches(".answer, .play-button") &&
          !button.textContent?.includes("SEMAK AYAT")
        )
          gameAudio.effect(button.matches(".slot, .chunk") ? "place" : "tap");
      }}
    >
      <header>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setModal("help");
          }}
          aria-label="Panduan Misi Pancaindera"
        >
          <span className="brand-icon">
            <Plane size={25} />
          </span>
          <span>
            MISI PEMERIKSAAN
            <br />
            <strong>PANCAINDERA</strong>
          </span>
        </a>
        <div className="header-right">
          <span className="subject">BAHASA MELAYU · TAHUN 4</span>
          {screen !== "home" && (
            <span className="stars">
              <Star size={19} fill="currentColor" /> {stars}
            </span>
          )}
          <button
            data-audio-control
            className="icon-button"
            aria-label={prefs.sound ? "Matikan bunyi" : "Hidupkan bunyi"}
            onClick={() => {
              const sound = !prefs.sound;
              gameAudio.configure(sound, prefs.music);
              if (sound) gameAudio.unlock();
              setPrefs({ ...prefs, sound });
            }}
          >
            {prefs.sound ? <Volume2 /> : <VolumeX />}
          </button>
        </div>
      </header>
      <main>
        {screen === "home" ? (
          <GameHome
            onStart={() => {
              gameAudio.effect("launch");
              setScreen("groups");
            }}
            onHelp={() => setModal("help")}
            music={prefs.music && prefs.sound}
            onMusic={() => {
              const music = !(prefs.music && prefs.sound);
              const sound = music || prefs.sound;
              gameAudio.configure(sound, music);
              if (music) gameAudio.unlock();
              setPrefs({ ...prefs, music, sound });
            }}
          />
        ) : (
          <>
            <nav className="journey" aria-label="Kemajuan misi">
              <span
                className={
                  ["groups", "welcome", "one"].includes(screen) ? "current" : ""
                }
              >
                01 · Kenal pasti
              </span>
              <i />
              <span
                className={
                  ["transition", "two"].includes(screen) ? "current" : ""
                }
              >
                02 · Bina ayat
              </span>
              <i />
              <span className={screen === "results" ? "current" : ""}>
                03 · Keputusan
              </span>
            </nav>
            {screen === "groups" && (
              <section className="center">
                <div className="eyebrow">DAFTAR MASUK PASUKAN</div>
                <h1 tabIndex={-1}>Pilih Pasukan Anda</h1>
                <p>
                  Setiap pasukan mempunyai deria istimewa. Yang manakah pasukan
                  anda?
                </p>
                <div className="group-grid">
                  {groups.map((g, i) => (
                    <button
                      className="group-card"
                      key={g.name}
                      style={{ "--tint": g.color } as React.CSSProperties}
                      onClick={() => {
                        setGroup(g.name);
                        setScreen("welcome");
                      }}
                    >
                      <span className="group-no">PASUKAN 0{i + 1}</span>
                      <span className="group-emoji">{g.icon}</span>
                      <strong>{g.name}</strong>
                      <small>{g.description}</small>
                      <span className="round-arrow">
                        <ArrowRight />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {screen === "welcome" && (
              <section className="center compact">
                <div
                  className="big-icon"
                  style={{ background: currentGroup.color }}
                >
                  {currentGroup.icon}
                </div>
                <div className="eyebrow">PASUKAN SUDAH BERSEDIA</div>
                <h1 tabIndex={-1}>
                  Selamat datang,
                  <br />
                  Pegawai {group}!
                </h1>
                <p>
                  Periksa lima objek, kemudian susun lima ayat.
                  <br />
                  Bincang bersama pasukan sebelum menjawab.
                </p>
                <button className="primary" onClick={() => start()}>
                  MULAKAN PEMERIKSAAN <ArrowRight />
                </button>
                <button
                  className="text-button"
                  onClick={() => setScreen("groups")}
                >
                  Pilih pasukan lain
                </button>
              </section>
            )}
            {active && q && (
              <section className="game">
                <div className="game-top">
                  <span className="team-pill">
                    {currentGroup.icon} Pasukan {group}
                  </span>
                  <div className="question-progress">
                    <span>Soalan {index + 1} / 5</span>
                    <div>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={
                            i < index ? "done" : i === index ? "now" : ""
                          }
                        />
                      ))}
                    </div>
                  </div>
                  {prefs.timer && (
                    <span className="timer">
                      <Clock size={17} />
                      {Math.floor(seconds / 60)}:
                      {String(seconds % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="exercise">
                  <div className="eyebrow">
                    MISI {screen === "one" ? "1 · KENAL PASTI" : "2 · APLIKASI"}
                  </div>
                  <h1 tabIndex={-1}>
                    {screen === "one"
                      ? "Pilih kata adjektif yang sesuai"
                      : "Bina ayat"}
                  </h1>
                  {screen === "one" ? (
                    <>
                      <div className="inspection">
                        <span className="object-emoji">{q.icon}</span>
                        <span className="inspection-tag">
                          BAGASI {String(index + 1).padStart(2, "0")}
                          <br />
                          <b>UNTUK DIPERIKSA</b>
                        </span>
                      </div>
                      <p className="question-sentence">{q.prompt}</p>
                      <div className="answer-grid">
                        {choices.map((option, i) => (
                          <button
                            disabled={solved}
                            key={option}
                            className={
                              "answer " +
                              (solved && option === q.answer ? "correct" : "")
                            }
                            onClick={() => answer(option === q.answer)}
                          >
                            <span>{String.fromCharCode(65 + i)}</span>
                            {option}
                            {solved && option === q.answer && (
                              <Check size={20} />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        Ketik satu cebisan ayat, kemudian ketik petak untuk
                        meletakkannya.
                      </p>
                      <div className="formula">
                        <b>S</b> + <b>KA</b> + <b>KH</b> + <b>K</b>
                      </div>
                      <div className="sentence-slots">
                        {[
                          "Subjek",
                          "Kata/Frasa Adjektif",
                          "Kata Hubung",
                          "Keterangan",
                        ].map((label, i) => (
                          <div key={label}>
                            <button
                              className={
                                "slot " + (slots[i] !== null ? "filled" : "")
                              }
                              disabled={solved}
                              aria-label={`Petak ${i + 1}: ${label}`}
                              onClick={() => {
                                const updated = [...slots];
                                if (selected !== null) {
                                  updated[i] = selected;
                                  setSelected(null);
                                } else updated[i] = null;
                                setSlots(updated);
                                setFeedback("");
                              }}
                            >
                              {slots[i] !== null
                                ? q.chunks[slots[i]!]
                                : `${i + 1}`}
                            </button>
                            <span>
                              <b>{["S", "KA", "KH", "K"][i]}</b> · {label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="chunks">
                        {chunkOrder.map((i) => (
                          <button
                            key={i}
                            className={
                              "chunk " + (selected === i ? "selected" : "")
                            }
                            aria-pressed={selected === i}
                            disabled={solved || slots.includes(i)}
                            onClick={() =>
                              setSelected(selected === i ? null : i)
                            }
                          >
                            {q.chunks[i]}
                          </button>
                        ))}
                      </div>
                      <div className="builder-actions">
                        <button
                          className="text-button"
                          disabled={solved}
                          onClick={() => {
                            setSlots([null, null, null, null]);
                            setSelected(null);
                            setFeedback("");
                          }}
                        >
                          <RotateCcw size={16} /> Susun semula
                        </button>
                        <button
                          className="primary"
                          disabled={solved || slots.includes(null)}
                          onClick={() => answer(slots.every((v, i) => v === i))}
                        >
                          SEMAK AYAT <Check size={19} />
                        </button>
                      </div>
                    </>
                  )}
                  <div
                    className={
                      "feedback " +
                      (solved ? "success" : feedback ? "retry" : "")
                    }
                    role="status"
                    key={`${attempts}-${solved}`}
                  >
                    {feedback && (
                      <>
                        <b>
                          {solved ? "✓" : "↻"} {feedback}
                        </b>
                        {solved && (
                          <span>⭐ Satu bintang pemeriksaan diperoleh!</span>
                        )}
                      </>
                    )}
                  </div>
                  {solved ? (
                    <button className="primary next" onClick={next}>
                      {index === 4 ? "SELESAIKAN MISI" : "SETERUSNYA"}{" "}
                      <ArrowRight />
                    </button>
                  ) : (
                    prefs.hints && (
                      <div className="hint">
                        <button
                          className="text-button"
                          onClick={() => setHint(true)}
                        >
                          <Lightbulb size={17} /> Perlukan petunjuk?
                        </button>
                        {hint && (
                          <p>
                            {screen === "one"
                              ? `Gunakan deria ${group.toLowerCase()}. Fikirkan sifat objek ${q.icon} itu.`
                              : `Mulakan ayat dengan “${q.chunks[0]}”. Kemudian nyatakan sifatnya.`}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
            {screen === "transition" && (
              <section className="center compact">
                <div className="big-icon">✓</div>
                <div className="eyebrow">MISI 1 SELESAI</div>
                <h1 tabIndex={-1}>
                  Hebat! Pemeriksaan
                  <br />
                  pertama selesai.
                </h1>
                <p>Sekarang, gunakan kata adjektif dalam ayat.</p>
                <div className="scaffold">
                  S + KA + KH + K
                  <small>
                    Subjek + Kata/Frasa Adjektif + Kata Hubung + Keterangan
                  </small>
                </div>
                <p className="example">
                  Bunga itu <b>sangat wangi</b> apabila dihidu.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    clearQuestion();
                    setScreen("two");
                  }}
                >
                  MISI 2 · BINA AYAT <ArrowRight />
                </button>
              </section>
            )}
            {screen === "results" && (
              <section className="center results">
                <div className="result-badge">
                  ★<span>PEGAWAI PANCAINDERA</span>
                </div>
                <div className="eyebrow">PEMERIKSAAN SELESAI!</div>
                <h1 tabIndex={-1}>Tahniah, Pasukan {group}!</h1>
                <div className="score-grid">
                  <div>
                    <Star />
                    <strong>{stars} / 10</strong>
                    <span>Bintang diperoleh</span>
                  </div>
                  <div>
                    <strong>{scores[0]} / 5</strong>
                    <span>Misi 1 · Kenal pasti</span>
                  </div>
                  <div>
                    <strong>{scores[1]} / 5</strong>
                    <span>Misi 2 · Bina ayat</span>
                  </div>
                </div>
                <p>
                  Markah menunjukkan jawapan betul pada percubaan pertama tanpa
                  petunjuk.
                  <br />✓ Kedua-dua misi selesai. Semua jawapan telah
                  dibetulkan.
                </p>
                <div className="objective">
                  <b>
                    {objectiveMet(scores[0], scores[1])
                      ? "TAHNIAH! OBJEKTIF MISI TERCAPAI"
                      : "USAHA YANG BAIK! CUBA SEKALI LAGI"}
                  </b>
                  <span>
                    Sasaran: sekurang-kurangnya 4 daripada 5 bagi setiap misi.
                  </span>
                </div>
                <div className="home-actions">
                  <button className="primary" onClick={() => start()}>
                    <RotateCcw size={18} /> MAIN SEMULA
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      setStars(0);
                      setScreen("groups");
                    }}
                  >
                    TUKAR PASUKAN
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <footer>
        <span>
          <span className="footer-dot" /> BBM INTERAKTIF <i>•</i> Keselamatan di
          Lapangan Terbang
        </span>
        <button
          className="text-button"
          onClick={() => {
            setTeacherGroup(group);
            setModal("settings");
          }}
        >
          <Settings size={16} /> Tetapan Guru
        </button>
      </footer>
      {modal === "help" && (
        <Modal title="Cara bermain" onClose={() => setModal(null)}>
          <ol className="instructions">
            <li>
              <b>Pilih pasukan anda.</b> Bincang dan jawab bersama-sama.
            </li>
            <li>
              <b>Misi 1:</b> Pilih kata adjektif yang sesuai untuk lima objek.
            </li>
            <li>
              <b>Misi 2:</b> Ketik cebisan ayat, kemudian ketik petak S, KA, KH
              atau K. Ketik petak berisi untuk mengosongkannya.
            </li>
            <li>
              <b>Kumpul 10 bintang.</b> Jika belum tepat, cuba lagi. Tiada had
              masa!
            </li>
          </ol>
          <p>
            Aktiviti ini ialah permainan bahasa. Jangan merasa atau menghidu
            bahan yang tidak dikenali.
          </p>
          <button className="primary" onClick={() => setModal(null)}>
            SAYA FAHAM <Check />
          </button>
        </Modal>
      )}
      {modal === "settings" && (
        <Modal title="Tetapan Guru" onClose={() => setModal(null)}>
          <p>SP 5.1.3 (iii) · Kata adjektif pancaindera</p>
          {(["timer", "sound", "music", "hints"] as const).map((key) => (
            <label className="setting" key={key}>
              <span>
                {key === "timer"
                  ? "Pemasa tanpa had masa"
                  : key === "sound"
                    ? "Bunyi permainan"
                    : key === "music"
                      ? "Muzik latar"
                      : "Petunjuk pembelajaran"}
              </span>
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={(e) =>
                  setPrefs({ ...prefs, [key]: e.target.checked })
                }
              />
            </label>
          ))}
          <label className="setting">
            Set soalan
            <select
              value={prefs.set}
              onChange={(e) => setPrefs({ ...prefs, set: e.target.value })}
            >
              <option value="rawak">Rawak</option>
              <option value="a">Set A</option>
              <option value="b">Set B</option>
            </select>
          </label>
          <label className="setting">
            Pasukan
            <select
              value={teacherGroup}
              onChange={(e) => setTeacherGroup(e.target.value as Category)}
            >
              {groups.map((g) => (
                <option key={g.name}>{g.name}</option>
              ))}
            </select>
          </label>
          <p className="settings-note">
            Pilihan pasukan dan set digunakan apabila misi dimulakan semula.
            Prestasi murid tidak disimpan.
          </p>
          <button
            className="primary"
            onClick={() => {
              start(teacherGroup);
              setModal(null);
            }}
          >
            MULAKAN MISI BAHARU
          </button>
          <button className="text-button" onClick={reset}>
            Tetapkan semula ke skrin mula
          </button>
        </Modal>
      )}
    </div>
  );
}
