import { useEffect, useRef, type ReactNode } from "react";
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => previous?.focus();
  }, []);
  return (
    <dialog ref={ref} onCancel={onClose}>
      <div className="modal-head">
        <h2>{title}</h2>
        <button onClick={onClose} aria-label="Tutup">
          ✕
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Airport() {
  return (
    <svg
      className="airport"
      viewBox="0 0 700 480"
      role="img"
      aria-label="Ilustrasi terminal lapangan terbang dengan kapal terbang, beg dan pegawai pemeriksaan"
    >
      <defs>
        <pattern
          id="floor"
          width="90"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 40H90M45 0V40" fill="none" stroke="#dce9e7" />
        </pattern>
      </defs>
      <rect x="15" y="20" width="670" height="440" rx="32" fill="#e8f4f3" />
      <rect x="40" y="40" width="620" height="270" rx="20" fill="#bfe7ed" />
      <path d="M40 225Q180 155 310 230T660 210V310H40Z" fill="#98ccd0" />
      <path
        className="airport-clouds"
        d="M70 95Q95 55 125 85Q170 62 177 106H70M420 80Q455 44 480 76Q515 60 535 97H420"
        fill="#fff"
        opacity=".8"
      />
      <g className="airport-plane">
        <path
          d="M270 152l178-20 60-61 20 2-30 62 85 10q24 6 2 16l-94 7-43 66-20 2 21-66-142 4-34-37 16-3Z"
          fill="#fff"
          stroke="#58838a"
          strokeWidth="3"
        />
        <path
          d="M335 151l113-10"
          stroke="#ecaa35"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M235 40V310M460 40V310M40 310H660"
        stroke="#fff"
        strokeWidth="12"
      />
      <path
        d="M16 330H685V440Q685 460 665 460H35Q15 460 15 440Z"
        fill="url(#floor)"
      />
      <rect x="55" y="55" width="156" height="80" rx="8" fill="#173f46" />
      <text x="73" y="83" fill="#f6c95e" fontSize="14" fontFamily="sans-serif">
        PELEPASAN ✈
      </text>
      <text x="73" y="115" fill="white" fontSize="24" fontFamily="monospace">
        KUL → SIN
      </text>
      <rect x="100" y="250" width="270" height="136" rx="18" fill="#476e74" />
      <rect x="122" y="270" width="220" height="99" rx="9" fill="#173f46" />
      <path
        d="M145 276v87m25-87v87m25-87v87m25-87v87m25-87v87m25-87v87m25-87v87m25-87v87"
        stroke="#295961"
        strokeWidth="8"
      />
      <rect x="51" y="365" width="369" height="31" rx="15" fill="#173f46" />
      <path
        className="conveyor-motion"
        d="M70 380H400"
        stroke="#88aaa9"
        strokeWidth="8"
        strokeDasharray="13 8"
      />
      <path d="M90 397v35m293-35v35" stroke="#476e74" strokeWidth="12" />
      <g className="airport-luggage">
        <rect x="182" y="307" width="71" height="60" rx="10" fill="#f4be54" />
        <path
          d="M200 307v-13h34v13m-34 13v34m35-34v34"
          fill="none"
          stroke="#b97c28"
          strokeWidth="5"
        />
        <rect
          x="231"
          y="315"
          width="28"
          height="18"
          rx="3"
          fill="#fff7dc"
          transform="rotate(15 231 315)"
        />
      </g>
      <rect
        className="scanner-beam"
        x="128"
        y="278"
        width="5"
        height="84"
        rx="2"
        fill="#80ffdf"
      />
      <circle cx="520" cy="255" r="44" fill="#e8ab7d" />
      <path d="M477 246q-5-57 43-53 46 0 43 53l-25-14-61 7" fill="#173f46" />
      <path d="M470 225q49-21 99 0l-1-26q-48-26-95 1Z" fill="#2a707b" />
      <rect x="511" y="199" width="18" height="16" rx="4" fill="#f4be54" />
      <circle cx="505" cy="253" r="3" fill="#173f46" />
      <circle cx="538" cy="253" r="3" fill="#173f46" />
      <path
        d="M510 270q12 12 24 0"
        fill="none"
        stroke="#934f37"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M480 303q40-23 80 0l22 78H460Z" fill="#2a707b" />
      <path d="M520 299v80" stroke="#17464e" strokeWidth="4" />
      <rect x="538" y="316" width="16" height="21" rx="3" fill="#f4be54" />
      <path
        d="M485 381l-8 54m71-54 10 54"
        stroke="#173f46"
        strokeWidth="23"
        strokeLinecap="round"
      />
      <path
        d="M479 313l-40 33"
        stroke="#e8ab7d"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <g className="officer-wave">
        <path
          d="M559 312l38-45"
          stroke="#e8ab7d"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <circle cx="600" cy="260" r="13" fill="#e8ab7d" />
      </g>
      <g className="scanner-check">
        <circle cx="372" cy="287" r="27" fill="#d6edbe" />
        <path
          d="m359 286 9 10 17-19"
          fill="none"
          stroke="#397453"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
