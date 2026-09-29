/** Original, locally synthesised adventure music; no media downloads required. */
export type SoundEffect =
  "tap" | "correct" | "retry" | "launch" | "complete" | "place";
export class GameAudio {
  private context?: AudioContext;
  private musicBus?: GainNode;
  private effectsBus?: GainNode;
  private clock?: ReturnType<typeof setInterval>;
  private sound = true;
  private music = true;
  private unlocked = false;
  private hidden = false;
  private step = 0;
  private nextNote = 0;
  private notes = new Set<OscillatorNode>();

  configure(sound: boolean, music: boolean) {
    this.sound = sound;
    this.music = music;
    this.sync();
  }

  /** Call only from a click/key activation to respect browser autoplay rules. */
  unlock() {
    try {
      if (!this.sound) return;
      if (!this.context) {
        this.context = new AudioContext();
        this.musicBus = this.context.createGain();
        this.effectsBus = this.context.createGain();
        this.musicBus.connect(this.context.destination);
        this.effectsBus.connect(this.context.destination);
      }
      this.unlocked = true;
      void this.context
        .resume()
        .then(() => this.sync())
        .catch(() => {});
      this.sync();
    } catch {
      /* Audio is optional on unsupported browsers. */
    }
  }

  setHidden(hidden: boolean) {
    this.hidden = hidden;
    this.sync();
    if (hidden && this.context) void this.context.suspend().catch(() => {});
    else if (this.unlocked && this.sound) this.unlock();
  }

  private sync() {
    const ctx = this.context;
    if (!ctx || !this.musicBus || !this.effectsBus) return;
    const audible = this.sound && !this.hidden;
    // Replace prior ramps so rapid toggles cannot leave stale gain automation.
    this.effectsBus.gain.cancelScheduledValues(ctx.currentTime);
    this.effectsBus.gain.setValueAtTime(audible ? 0.3 : 0, ctx.currentTime);
    const musicGain = this.musicBus.gain;
    const previousGain = musicGain.value;
    musicGain.cancelScheduledValues(ctx.currentTime);
    musicGain.setValueAtTime(previousGain, ctx.currentTime);
    musicGain.linearRampToValueAtTime(
      audible && this.music ? 0.22 : 0,
      ctx.currentTime + 0.08,
    );
    if (audible && this.music && this.unlocked && ctx.state === "running") {
      if (!this.clock) {
        this.nextNote = ctx.currentTime + 0.04;
        this.schedule();
        this.clock = setInterval(() => this.schedule(), 60);
      }
    } else {
      if (this.clock) clearInterval(this.clock);
      this.clock = undefined;
    }
  }

  private tone(
    midi: number,
    time: number,
    duration: number,
    volume: number,
    bus: GainNode,
    type: OscillatorType = "sine",
  ) {
    const ctx = this.context!;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(envelope);
    envelope.connect(bus);
    this.notes.add(oscillator);
    oscillator.onended = () => {
      this.notes.delete(oscillator);
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  private schedule() {
    const ctx = this.context;
    if (!ctx || ctx.state !== "running" || !this.musicBus) return;
    if (this.nextNote < ctx.currentTime) this.nextNote = ctx.currentTime + 0.04;
    // Eight bars in C major, 104 bpm: bell melody, soft arpeggios and warm bass.
    const chords = [
      [48, 52, 55],
      [45, 48, 52],
      [41, 45, 48],
      [43, 47, 50],
      [48, 52, 55],
      [45, 48, 52],
      [41, 45, 48],
      [43, 47, 50],
    ];
    const melody = [
      72, 0, 76, 79, 0, 76, 74, 0, 72, 0, 76, 0, 79, 81, 79, 0, 77, 0, 76, 0,
      72, 0, 69, 72, 74, 0, 71, 74, 79, 0, 0, 0, 76, 0, 79, 84, 0, 79, 76, 0,
      81, 0, 79, 76, 72, 0, 0, 0, 77, 0, 81, 79, 77, 76, 74, 0, 74, 0, 71, 67,
      72, 0, 0, 0,
    ];
    while (this.nextNote < ctx.currentTime + 0.18) {
      const i = this.step % 64;
      const chord = chords[Math.floor(i / 8)];
      if (melody[i])
        this.tone(melody[i], this.nextNote, 0.55, 0.2, this.musicBus);
      this.tone(
        chord[i % 3] + 12,
        this.nextNote,
        0.35,
        0.075,
        this.musicBus,
        "triangle",
      );
      if (i % 4 === 0)
        this.tone(
          chord[0] - 12,
          this.nextNote,
          0.85,
          0.2,
          this.musicBus,
          "triangle",
        );
      this.step++;
      this.nextNote += 60 / 104 / 2;
    }
  }

  effect(effect: SoundEffect) {
    try {
      if (
        !this.sound ||
        this.hidden ||
        !this.unlocked ||
        !this.context ||
        !this.effectsBus
      )
        return;
      const patterns: Record<SoundEffect, number[]> = {
        tap: [79],
        place: [72, 79],
        correct: [72, 76, 79, 84],
        retry: [60, 57],
        launch: [60, 64, 67, 72, 79],
        complete: [72, 76, 79, 84, 79, 84, 88],
      };
      patterns[effect].forEach((note, i) =>
        this.tone(
          note,
          this.context!.currentTime + i * 0.095,
          effect === "tap" ? 0.07 : 0.38,
          effect === "tap" ? 0.1 : 0.24,
          this.effectsBus!,
          "triangle",
        ),
      );
    } catch {
      /* Keep the game playable if the audio device disappears. */
    }
  }

  dispose() {
    if (this.clock) clearInterval(this.clock);
    this.clock = undefined;
    for (const note of this.notes) {
      try {
        note.stop();
      } catch {}
    }
    if (this.context) void this.context.close().catch(() => {});
    this.context = undefined;
    this.unlocked = false;
  }
}
