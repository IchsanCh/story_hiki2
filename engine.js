/**
 * Desa Melati - Game Engine
 * Mengatur pemetaan aset, transisi background, tata letak & animasi sprite,
 * evaluasi ekspresi kondisi story.js, serta preload performa tinggi dengan decode().
 */

/* ─── AUDIO ENGINE (SYNTHESIS VIA WEB AUDIO API) ─── */
const AudioEngine = (() => {
  let ctx = null;
  let sfxEnabled = true;
  let bgmEnabled = true;
  let bgmNodes = null;
  let bgmInterval = null;

  function init() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
  }

  function beep(freq, duration, type = "sine", volume = 0.08) {
    if (!sfxEnabled) return;
    try {
      init();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  }

  /* Procedural Horror FX SFX */
  function playFx(fxType) {
    if (!sfxEnabled) return;
    try {
      init();
      if (!ctx) return;
      const t = ctx.currentTime;

      switch (fxType) {
        case "shake": {
          // Low earth-tremor thud (45Hz -> 25Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(55, t);
          osc.frequency.exponentialRampToValueAtTime(20, t + 0.45);
          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 0.45);
          break;
        }

        case "glitch": {
          // Static radio glitch burst
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, t);
          osc.frequency.setValueAtTime(1400, t + 0.05);
          osc.frequency.setValueAtTime(450, t + 0.1);
          osc.frequency.setValueAtTime(2800, t + 0.15);
          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 0.28);
          break;
        }

        case "flash": {
          // Sharp eerie high chime strike with long spooky decay
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(987.77, t); // B5 note
          osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.7);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 0.75);
          break;
        }

        case "flicker": {
          // Electrical buzz / flickering neon tube
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(100, t);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.setValueAtTime(0.01, t + 0.08);
          gain.gain.setValueAtTime(0.05, t + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 0.4);
          break;
        }

        case "blackout": {
          // Sudden heavy sub-bass descent
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(120, t);
          osc.frequency.exponentialRampToValueAtTime(25, t + 0.7);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 0.7);
          break;
        }

        case "fadeblack": {
          // Hollow wind breath
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(180, t);
          osc.frequency.exponentialRampToValueAtTime(40, t + 1.2);
          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(t + 1.2);
          break;
        }
      }
    } catch (_) {}
  }

  /* Procedural Horror Ambient BGM (Low atmospheric drone + eerie bells) */
  function startBgm() {
    if (!bgmEnabled) return;
    try {
      init();
      if (!ctx || bgmNodes) return;

      const t = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, t);
      masterGain.gain.exponentialRampToValueAtTime(0.065, t + 3.0); // Smooth fade in
      masterGain.connect(ctx.destination);

      // 1. Sub-bass horror drone (48Hz low G)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(48.99, t);

      // Low-pass filter to keep it dark and menacing
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(110, t);

      // Subtle LFO sweeping the filter (0.07 Hz eerie breathing)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.07, t);
      lfoGain.gain.setValueAtTime(45, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc1.connect(filter);
      filter.connect(masterGain);

      // 2. High detuned tension drone (fifth harmony, 73.4Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(73.42, t);
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.04, t);
      osc2.connect(osc2Gain);
      osc2Gain.connect(masterGain);

      osc1.start();
      osc2.start();
      lfo.start();

      bgmNodes = { masterGain, osc1, osc2, lfo };

      // 3. Periodic mysterious chime bell (every 14-22 seconds)
      const chimeNotes = [440, 523.25, 659.25, 783.99, 880]; // A4, C5, E5, G5, A5
      bgmInterval = setInterval(() => {
        if (!bgmEnabled || !ctx) return;
        try {
          const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
          const chimeOsc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chimeOsc.type = "sine";
          chimeOsc.frequency.setValueAtTime(note, ctx.currentTime);
          chimeGain.gain.setValueAtTime(0.025, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);
          chimeOsc.connect(chimeGain);
          chimeGain.connect(masterGain);
          chimeOsc.start();
          chimeOsc.stop(ctx.currentTime + 3.5);
        } catch (_) {}
      }, 16000);
    } catch (_) {}
  }

  function stopBgm() {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
    if (bgmNodes && ctx) {
      try {
        const t = ctx.currentTime;
        bgmNodes.masterGain.gain.setValueAtTime(bgmNodes.masterGain.gain.value, t);
        bgmNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
        setTimeout(() => {
          if (bgmNodes) {
            try {
              bgmNodes.osc1.stop();
              bgmNodes.osc2.stop();
              bgmNodes.lfo.stop();
            } catch (_) {}
            bgmNodes = null;
          }
        }, 1600);
      } catch (_) {
        bgmNodes = null;
      }
    }
  }

  let easterEggAudio = null;
  function playEasterEggVoice() {
    if (!sfxEnabled) return;
    try {
      init();
      if (!easterEggAudio) {
        easterEggAudio = new Audio("Voice/ara-ara.mp3");
      }
      easterEggAudio.currentTime = 0;
      easterEggAudio.volume = 0.95;
      const playPromise = easterEggAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Easter egg audio play error:", err);
        });
      }
    } catch (err) {
      console.warn("Easter egg audio error:", err);
    }
  }

  return {
    init,
    click: () => beep(650, 0.05, "sine", 0.06),
    select: () => beep(420, 0.08, "triangle", 0.08),
    typing: () => beep(1050, 0.015, "square", 0.015),
    ending: () => {
      beep(330, 0.25, "sine", 0.1);
      setTimeout(() => beep(261.63, 0.45, "sine", 0.12), 200);
    },
    playFx,
    playEasterEggVoice,
    startBgm,
    stopBgm,
    set sfxEnabled(v) { sfxEnabled = v; },
    get sfxEnabled() { return sfxEnabled; },
    set bgmEnabled(v) {
      bgmEnabled = v;
      if (v) startBgm();
      else stopBgm();
    },
    get bgmEnabled() { return bgmEnabled; }
  };
})();

/* ─── ASSET RESOLVER & CACHE ─── */
const warnedFiles = new Set();
const bgCache = new Map();
const spriteCache = new Map();

function warnOnce(fileName) {
  if (!warnedFiles.has(fileName)) {
    warnedFiles.add(fileName);
    console.warn(`File aset tidak ditemukan: ${fileName}`);
  }
}

/**
 * Memuat dan mendekode gambar menggunakan decode() agar tidak berkedip.
 */
async function tryLoadImage(src) {
  const img = new Image();
  img.src = src;
  try {
    if (img.decode) {
      await img.decode();
    } else {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    }
    return img;
  } catch (_) {
    return null;
  }
}

/**
 * Pemetaan Background:
 * node.bg adalah nama file tanpa ekstensi.
 * Cari assets/<bg>.jpg lalu .png.
 * Bila tidak ada: pakai warna dari story.bgFallback, console.warn 1x per file.
 */
async function resolveBackground(bgName) {
  if (!bgName) return null;
  if (bgCache.has(bgName)) return bgCache.get(bgName);

  // 1. Cek assets/<bg>.jpg
  const jpgSrc = `assets/${bgName}.jpg`;
  let img = await tryLoadImage(jpgSrc);
  if (img) {
    const res = { type: "image", src: jpgSrc, img };
    bgCache.set(bgName, res);
    return res;
  }

  // 2. Cek assets/<bg>.png
  const pngSrc = `assets/${bgName}.png`;
  img = await tryLoadImage(pngSrc);
  if (img) {
    const res = { type: "image", src: pngSrc, img };
    bgCache.set(bgName, res);
    return res;
  }

  // 3. Fallback warna
  warnOnce(`assets/${bgName}.(jpg/png)`);
  const color = (STORY.bgFallback && STORY.bgFallback[bgName]) || "#0b0c10";
  const res = { type: "color", color };
  bgCache.set(bgName, res);
  return res;
}

/**
 * Pemetaan Sprite:
 * node.chars adalah daftar nama file tanpa ekstensi.
 * Cari assets/<nama>.png.
 * Bila tidak ada: sprite dilewati, console.warn 1x per file.
 */
async function resolveSprite(charName) {
  if (!charName) return null;
  if (spriteCache.has(charName)) return spriteCache.get(charName);

  const pngSrc = `assets/${charName}.png`;
  const img = await tryLoadImage(pngSrc);
  if (img) {
    const res = { type: "image", src: pngSrc, img };
    spriteCache.set(charName, res);
    return res;
  }

  // Bila file tidak ada
  warnOnce(`assets/${charName}.png`);
  spriteCache.set(charName, null);
  return null;
}

/* ─── GAME STATE & PERSISTENCE ─── */
const SAVE_KEY = "desa_melati_save";
const ENDINGS_KEY = "desa_melati_endings";
const SETTINGS_KEY = "desa_melati_settings";

let state = {
  node: null,
  vars: {},
  history: [],
  visited: [],
  dialogLog: []
};

let settings = {
  textSpeed: "normal",
  soundEnabled: true,
  bgmEnabled: true
};

let currentBg = null;
let currentBgLayer = 1;

let isTyping = false;
let currentFullText = "";
let typingTimeout = null;
let typingResolve = null;
let toastTimeout = null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function showSaveToast() {
  const toast = $("#save-toast");
  if (!toast) return;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1600);
}

function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    showSaveToast();
  } catch (_) {}
}

function load() {
  try {
    const d = localStorage.getItem(SAVE_KEY);
    if (d) {
      state = JSON.parse(d);
      if (!state.dialogLog) state.dialogLog = [];
      return true;
    }
  } catch (_) {}
  return false;
}

function hasSave() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

function getEndingsFound() {
  try {
    const d = localStorage.getItem(ENDINGS_KEY);
    return d ? JSON.parse(d) : [];
  } catch (_) {
    return [];
  }
}

function addEndingFound(eid) {
  const endings = getEndingsFound();
  if (!endings.includes(eid)) {
    endings.push(eid);
    try {
      localStorage.setItem(ENDINGS_KEY, JSON.stringify(endings));
    } catch (_) {}
  }
  return endings;
}

function loadSettings() {
  try {
    const d = localStorage.getItem(SETTINGS_KEY);
    if (d) Object.assign(settings, JSON.parse(d));
  } catch (_) {}
  AudioEngine.sfxEnabled = settings.soundEnabled;
  AudioEngine.bgmEnabled = settings.bgmEnabled;
}

/* ─── EXPRESSION & VARIABLE ENGINE ─── */
/**
 * Evaluasi string kondisi (req, hide, if), contoh "tahu>=4 && percaya>=3".
 * Variabel tak dikenal bernilai 0.
 */
function evalExpression(expr, vars) {
  if (!expr || typeof expr !== "string" || !expr.trim()) return true;
  try {
    const context = { ...(STORY.vars || {}), ...(vars || {}) };
    const proxy = new Proxy(context, {
      has: () => true,
      get: (target, prop) => {
        if (prop in target) return target[prop];
        if (prop in globalThis) return globalThis[prop];
        return 0;
      }
    });
    const fn = new Function("ctx", `with(ctx) { return Boolean(${expr}); }`);
    return fn(proxy);
  } catch (err) {
    console.warn("Evaluasi ekspresi gagal:", expr, err);
    return true;
  }
}

/**
 * Terapkan operasi penjumlahan variabel (bisa negatif)
 */
function applySet(setObj) {
  if (!setObj) return;
  for (const [key, val] of Object.entries(setObj)) {
    state.vars[key] = (state.vars[key] || 0) + val;
  }
}

/* ─── BACKGROUND CONTROLLER (CROSSFADE 0.6s) ─── */
async function transitionBackground(bgName) {
  if (!bgName) return;

  // Jangan reload bila bg sama dengan scene sebelumnya
  if (bgName === currentBg) {
    return;
  }

  const resolved = await resolveBackground(bgName);
  const layer1 = $("#bg-layer-1");
  const layer2 = $("#bg-layer-2");
  const activeLayer = currentBgLayer === 1 ? layer1 : layer2;
  const nextLayer = currentBgLayer === 1 ? layer2 : layer1;

  if (resolved && resolved.type === "image") {
    if (resolved.img && resolved.img.decode) {
      try { await resolved.img.decode(); } catch (_) {}
    }
    nextLayer.style.backgroundColor = "transparent";
    nextLayer.style.backgroundImage = `url("${resolved.src}")`;
  } else {
    const fallbackColor = (resolved && resolved.color) || (STORY.bgFallback && STORY.bgFallback[bgName]) || "#0b0c10";
    nextLayer.style.backgroundImage = "none";
    nextLayer.style.backgroundColor = fallbackColor;
  }

  // Trigger crossfade (0.6 detik diatur di style.css)
  nextLayer.classList.add("active");
  activeLayer.classList.remove("active");
  currentBgLayer = currentBgLayer === 1 ? 2 : 1;
  currentBg = bgName;
}

/* ─── CHARACTER SPRITE CONTROLLER ─── */
/**
 * Menentukan apakah nama sprite milik speaker aktif.
 */
function isSpeakerChar(charName, speaker) {
  if (!speaker || speaker === "Narator") return false;
  const s = speaker.toLowerCase();
  const c = charName.toLowerCase();
  if (s.includes("lurah") || s.includes("wiryo")) return c.startsWith("pak_lurah");
  if (s.includes("karto")) return c.startsWith("pak_karto");
  if (s.includes("darmo")) return c.startsWith("mbah_darmo");
  if (s.includes("bayu")) return c.startsWith("bayu");
  if (s.includes("dina")) return c.startsWith("dina");
  if (s.includes("sari")) return c.startsWith("sari");
  if (s.includes("raka")) return c.startsWith("raka");
  if (s.includes("melati")) return c.startsWith("melati");
  if (s.includes("hantu") || s.includes("easter") || s.includes("gaib")) return c.includes("easter") || c.includes("ghost");
  return false;
}

/**
 * Tata letak:
 * 1 sprite di tengah (pos-center), 2 sprite di kiri dan kanan (pos-left, pos-right).
 * Tinggi ~80% layar, bawah sprite tertutup kotak dialog.
 * Fade in 0,3s saat ganti sprite.
 * Speaker normal, non-speaker redup dan lebih kecil.
 * melati_ melayang, bayu_kosong bergoyang pelan.
 */
async function updateCharacterSprites(chars, speaker) {
  const stage = $("#sprite-stage");
  if (!stage) return;

  if (!chars || !Array.isArray(chars) || chars.length === 0) {
    stage.innerHTML = "";
    return;
  }

  // 1. Resolve semua sprite; file tak ada dilewati tanpa crash
  const validSprites = [];
  for (const charName of chars) {
    const sp = await resolveSprite(charName);
    if (sp && sp.type === "image") {
      validSprites.push({ name: charName, src: sp.src, img: sp.img });
    }
  }

  if (validSprites.length === 0) {
    stage.innerHTML = "";
    return;
  }

  // 2. Decode semua gambar sebelum dimasukkan ke DOM
  await Promise.all(
    validSprites.map((s) => (s.img && s.img.decode ? s.img.decode().catch(() => {}) : Promise.resolve()))
  );

  // 3. Tentukan apakah ada salah satu karakter yang merupakan speaker
  const hasSpeakerMatch = validSprites.some((s) => isSpeakerChar(s.name, speaker));

  stage.innerHTML = "";

  validSprites.forEach((sprite, idx) => {
    const isSpeaker = hasSpeakerMatch ? isSpeakerChar(sprite.name, speaker) : true;

    // Posisi: 1 sprite di tengah, 2 sprite di kiri & kanan
    let posClass = "pos-center";
    if (validSprites.length >= 2) {
      posClass = idx === 0 ? "pos-left" : "pos-right";
    }

    const container = document.createElement("div");
    container.className = `sprite-container ${posClass}`;

    if (isSpeaker) {
      container.classList.add("is-speaker");
    } else {
      container.classList.add("is-dimmed");
    }

    // Animasi khusus
    if (sprite.name.startsWith("melati_") || sprite.name.includes("easter_egg") || sprite.name.includes("ghost")) {
      container.classList.add("anim-melati-float");
    }
    if (sprite.name === "bayu_kosong") {
      container.classList.add("anim-bayu-sway");
    }

    const img = document.createElement("img");
    img.className = "char-sprite-img";
    img.src = sprite.src;
    img.alt = sprite.name;

    container.appendChild(img);
    stage.appendChild(container);
  });
}

/* ─── TYPING EFFECT ─── */
function getTypingDelay() {
  switch (settings.textSpeed) {
    case "slow": return 45;
    case "fast": return 8;
    default: return 22;
  }
}

function typeText(targetEl, fullText) {
  currentFullText = fullText;
  return new Promise((resolve) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    isTyping = true;
    typingResolve = resolve;

    targetEl.textContent = "";
    let i = 0;
    const delay = getTypingDelay();

    function step() {
      if (!isTyping) {
        targetEl.textContent = fullText;
        if (typingResolve) typingResolve();
        typingResolve = null;
        return;
      }

      if (i < fullText.length) {
        targetEl.textContent += fullText.charAt(i);
        if (i % 3 === 0 && fullText.charAt(i) !== " " && fullText.charAt(i) !== "\n") {
          AudioEngine.typing();
        }
        i++;
        typingTimeout = setTimeout(step, delay);
      } else {
        isTyping = false;
        targetEl.textContent = fullText;
        if (typingResolve) typingResolve();
        typingResolve = null;
      }
    }

    step();
  });
}

function skipTyping() {
  if (isTyping) {
    isTyping = false;
    if (typingTimeout) clearTimeout(typingTimeout);
    const textEl = $("#story-text");
    if (textEl) textEl.textContent = currentFullText;
    if (typingResolve) typingResolve();
    typingResolve = null;
    return true;
  }
  return false;
}

/* ─── SCENE RENDERER ─── */
async function renderNode(nodeId, pushHistory = true) {
  const node = STORY.nodes[nodeId];
  if (!node) {
    console.error(`Node "${nodeId}" tidak ditemukan dalam STORY.`);
    return;
  }

  // Cek redirect sebelum menampilkan apa pun
  if (node.redirect && Array.isArray(node.redirect)) {
    for (const r of node.redirect) {
      if (!r.if || evalExpression(r.if, state.vars)) {
        renderNode(r.next, pushHistory);
        return;
      }
    }
  }

  // Terapkan node.set sekali saat node dimasuki
  if (node.set) {
    applySet(node.set);
  }

  if (pushHistory && state.node && state.node !== nodeId) {
    state.history.push({
      node: state.node,
      vars: { ...state.vars }
    });
  }

  state.node = nodeId;
  if (!state.visited.includes(nodeId)) {
    state.visited.push(nodeId);
  }
  save();

  // Lazy-load 3 node ke depan (terutama berguna di HP)
  lazyPreloadAhead(nodeId, 3);

  // Background transition (crossfade 0.6s)
  if (node.bg) {
    await transitionBackground(node.bg);
  }

  // Efek visual FX & Horror SFX (flicker, blackout, glitch, shake, flash, fadeblack)
  document.body.className = "";
  if (node.fx && Array.isArray(node.fx)) {
    node.fx.forEach((f) => {
      document.body.classList.add(`fx-${f}`);
      AudioEngine.playFx(f);
    });
  }

  // Update Karakter Sprite
  await updateCharacterSprites(node.chars, node.speaker);

  // Speaker name (sesuai story.js)
  const speakerEl = $("#speaker-name");
  if (node.speaker) {
    speakerEl.textContent = node.speaker;
    speakerEl.style.display = "flex";
    if (node.speaker === "Narator") {
      speakerEl.classList.add("speaker-narrator");
    } else {
      speakerEl.classList.remove("speaker-narrator");
    }
  } else {
    speakerEl.textContent = "";
    speakerEl.style.display = "none";
  }

  // Progress Bar & Bab Title & Scene Label (sesuai story.js)
  if (node.bab) {
    const babName = (STORY.babTitles && STORY.babTitles[node.bab]) || `Babak ${node.bab}`;
    $("#chapter-title").textContent = babName;
    const pct = Math.min(100, Math.round((node.bab / 5) * 100));
    $("#progress-fill").style.width = pct + "%";
  }
  const sceneLabelEl = $("#scene-label");
  if (sceneLabelEl) {
    if (node.label) {
      sceneLabelEl.textContent = node.label;
      sceneLabelEl.style.display = "inline-block";
    } else {
      sceneLabelEl.style.display = "none";
    }
  }

  // Rekam riwayat dialog untuk fitur Backlog (Log)
  if (node.text) {
    if (!state.dialogLog) state.dialogLog = [];
    state.dialogLog.push({
      bab: node.bab,
      label: node.label,
      speaker: node.speaker || "Narator",
      text: node.text
    });
  }

  // Cek Ending
  if (node.ending) {
    const obstacle = $("#secret-obstacle");
    if (obstacle) obstacle.classList.add("hidden");
    await handleEnding(node);
    return;
  }

  // Update kemunculan rintangan/benda rahasia (Easter Egg)
  updateSecretObstacle(nodeId);

  // Typewriter text
  const textEl = $("#story-text");
  const choicesEl = $("#choices");
  choicesEl.innerHTML = "";
  $("#key-hints").textContent = "";

  await typeText(textEl, node.text || "");

  // Render Choices atau tombol Lanjut (cont)
  renderChoices(node);
}

function renderChoices(node) {
  const choicesEl = $("#choices");
  choicesEl.innerHTML = "";

  // 1. Bila node memiliki cont (tombol Lanjut ke entri pertama yang valid)
  if (node.cont && Array.isArray(node.cont)) {
    const validCont = node.cont.find((c) => !c.if || evalExpression(c.if, state.vars));
    if (validCont) {
      const btn = document.createElement("button");
      btn.className = "choice-btn cont-btn";
      btn.textContent = "Lanjut ▸";
      btn.addEventListener("click", () => {
        AudioEngine.click();
        renderNode(validCont.next);
      });
      choicesEl.appendChild(btn);
      updateKeyHints(1, true);
      return;
    }
  }

  // 2. Bila node memiliki choices
  if (node.choices && Array.isArray(node.choices)) {
    let visibleCount = 0;
    node.choices.forEach((ch, idx) => {
      // Periksa hide
      if (ch.hide && evalExpression(ch.hide, state.vars)) {
        return;
      }

      visibleCount++;
      const isEnabled = !ch.req || evalExpression(ch.req, state.vars);
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.innerHTML = `<span class="choice-num">${visibleCount}</span><span class="choice-text">${ch.text}</span>`;

      if (!isEnabled) {
        btn.disabled = true;
        btn.title = "Syarat belum terpenuhi";
      } else {
        btn.addEventListener("click", () => {
          AudioEngine.select();
          if (ch.set) {
            applySet(ch.set);
          }
          renderNode(ch.next);
        });
      }

      choicesEl.appendChild(btn);
    });

    updateKeyHints(visibleCount, false);
  }
}

function updateKeyHints(count, isCont) {
  const hintEl = $("#key-hints");
  if (!hintEl) return;
  if (isCont) {
    hintEl.textContent = "Tekan Spasi atau Enter untuk melanjutkan";
  } else if (count > 0) {
    const keys = [];
    for (let i = 1; i <= count; i++) keys.push(i);
    hintEl.textContent = `Tombol angka: ${keys.join("/")} untuk memilih · Spasi untuk mempercepat teks`;
  } else {
    hintEl.textContent = "";
  }
}

/* ─── ENDING HANDLER ─── */
async function handleEnding(node) {
  AudioEngine.ending();
  const eid = (node.ending && node.ending.eid) || node.label || state.node;
  const endings = addEndingFound(eid);
  const totalEndings = STORY.endingsTotal || 7;

  $("#screen-story").classList.add("hidden");
  $("#screen-ending").classList.remove("hidden");

  const badgeEl = $("#ending-badge");
  if (node.ending && node.ending.kind) {
    badgeEl.textContent = `ENDING: ${node.ending.kind.toUpperCase()}`;
  }

  $("#ending-title").textContent = (node.ending && node.ending.title) || node.label || "Ending";
  $("#ending-text").textContent = node.text || "";
  $("#ending-count").textContent = `Ending ditemukan: ${endings.length}/${totalEndings}`;
}

/* ─── NAVIGATION & UNDO ─── */
function undo() {
  if (state.history.length === 0) return;
  AudioEngine.click();
  const prev = state.history.pop();
  state.vars = prev.vars;
  renderNode(prev.node, false);
}

function showTitle() {
  $("#screen-loading").classList.add("hidden");
  $("#screen-story").classList.add("hidden");
  $("#screen-ending").classList.add("hidden");
  $("#screen-title").classList.remove("hidden");

  const endings = getEndingsFound();
  const total = STORY.endingsTotal || 7;
  $("#title-endings").textContent = `Ending ditemukan: ${endings.length}/${total}`;

  updateCollectionBadge();

  if (hasSave()) {
    $("#btn-continue").classList.remove("hidden");
  } else {
    $("#btn-continue").classList.add("hidden");
  }
}

function startGame() {
  AudioEngine.click();
  state = {
    node: STORY.start || "start",
    vars: { ...(STORY.vars || {}) },
    history: [],
    visited: []
  };
  $("#screen-title").classList.add("hidden");
  $("#screen-ending").classList.add("hidden");
  $("#screen-story").classList.remove("hidden");

  renderNode(state.node, false);
}

function continueGame() {
  if (!load()) return;
  AudioEngine.click();
  $("#screen-title").classList.add("hidden");
  $("#screen-ending").classList.add("hidden");
  $("#screen-story").classList.remove("hidden");

  renderNode(state.node || STORY.start || "start", false);
}

function toggleSettings() {
  AudioEngine.click();
  $("#settings-panel").classList.toggle("hidden");
}

/* ─── PRELOAD PERFORMANCE & HP DETECTION ─── */
function isMobileDevice() {
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
  );
}

function getReachableNodes(startNodeId, depth = 3) {
  const visited = new Set();
  let currentLevel = [startNodeId];
  visited.add(startNodeId);

  for (let d = 0; d < depth; d++) {
    const nextLevel = [];
    for (const id of currentLevel) {
      const node = STORY.nodes[id];
      if (!node) continue;
      if (node.choices) {
        node.choices.forEach((c) => {
          if (c.next && !visited.has(c.next)) {
            visited.add(c.next);
            nextLevel.push(c.next);
          }
        });
      }
      if (node.cont) {
        node.cont.forEach((c) => {
          if (c.next && !visited.has(c.next)) {
            visited.add(c.next);
            nextLevel.push(c.next);
          }
        });
      }
      if (node.redirect) {
        node.redirect.forEach((r) => {
          if (r.next && !visited.has(r.next)) {
            visited.add(r.next);
            nextLevel.push(r.next);
          }
        });
      }
    }
    currentLevel = nextLevel;
  }
  return Array.from(visited);
}

function collectAssetsForNodes(nodeIds) {
  const bgs = new Set();
  const sprites = new Set();
  for (const id of nodeIds) {
    const node = STORY.nodes[id];
    if (node) {
      if (node.bg) bgs.add(node.bg);
      if (node.chars) node.chars.forEach((c) => sprites.add(c));
    }
  }
  return { bgs: Array.from(bgs), sprites: Array.from(sprites) };
}

function getAllStoryAssets() {
  const bgs = new Set();
  const sprites = new Set();
  for (const key in STORY.nodes) {
    const node = STORY.nodes[key];
    if (node.bg) bgs.add(node.bg);
    if (node.chars) node.chars.forEach((c) => sprites.add(c));
  }
  sprites.add("easter_egg_ghost");
  return { bgs: Array.from(bgs), sprites: Array.from(sprites) };
}

/**
 * Lazy-load background & sprite untuk 3 node ke depan
 */
function lazyPreloadAhead(currentNodeId, depth = 3) {
  const aheadNodes = getReachableNodes(currentNodeId, depth);
  const assets = collectAssetsForNodes(aheadNodes);
  assets.bgs.forEach((bg) => resolveBackground(bg));
  assets.sprites.forEach((sp) => resolveSprite(sp));
}

/**
 * Preload aset di awal:
 * Bila di HP/mobile: preload hanya 3 node ke depan, sisanya lazy-load.
 * Bila desktop: preload semua aset story.js.
 */
async function preloadInitialAssets() {
  const isMobile = isMobileDevice();
  let assetGroup;

  if (isMobile) {
    const startNodes = getReachableNodes(STORY.start || "start", 3);
    assetGroup = collectAssetsForNodes(startNodes);
  } else {
    assetGroup = getAllStoryAssets();
  }

  const tasks = [];
  assetGroup.bgs.forEach((bg) => tasks.push({ type: "bg", name: bg }));
  assetGroup.sprites.forEach((sp) => tasks.push({ type: "sprite", name: sp }));

  const total = tasks.length;
  if (total === 0) {
    showTitle();
    return;
  }

  let completed = 0;
  const updateBar = () => {
    const pct = Math.round((completed / total) * 100);
    const fillEl = $("#loading-fill");
    const statusEl = $("#loading-status");
    if (fillEl) fillEl.style.width = pct + "%";
    if (statusEl) statusEl.textContent = `${pct}% (${completed}/${total})`;
  };

  // Batas waktu fallback 3.5 detik agar loading tidak macet
  const fallbackTimeout = setTimeout(() => {
    if (!$("#screen-loading").classList.contains("hidden")) {
      showTitle();
    }
  }, 3500);

  const promises = tasks.map(async (task) => {
    try {
      if (task.type === "bg") {
        await resolveBackground(task.name);
      } else {
        await resolveSprite(task.name);
      }
    } catch (_) {}
    completed++;
    updateBar();
  });

  await Promise.all(promises);
  clearTimeout(fallbackTimeout);

  setTimeout(() => {
    showTitle();
  }, 250);
}

/* ─── BACKLOG / DIALOG LOG MODAL ─── */
function openLogModal() {
  AudioEngine.click();
  const listEl = $("#log-list");
  if (!listEl) return;
  listEl.innerHTML = "";

  const logs = state.dialogLog || [];
  if (logs.length === 0) {
    listEl.innerHTML = '<p style="color:#888;text-align:center;padding:2rem;">Belum ada riwayat dialog.</p>';
  } else {
    logs.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "log-entry";
      const isNarator = entry.speaker === "Narator";
      row.innerHTML = `
        <div class="log-speaker ${isNarator ? "narrator" : ""}">${entry.speaker}${entry.label ? ` · <span style="font-weight:normal;opacity:0.7">${entry.label}</span>` : ""}</div>
        <div class="log-text">${entry.text}</div>
      `;
      listEl.appendChild(row);
    });
  }

  $("#modal-log").classList.remove("hidden");
  listEl.scrollTop = listEl.scrollHeight;
}

function closeLogModal() {
  AudioEngine.click();
  $("#modal-log").classList.add("hidden");
}

/* ─── FULLSCREEN TOGGLE ─── */
function toggleFullscreen() {
  AudioEngine.click();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

/* ─── EASTER EGG & KOLEKSI CONTROLLER ─── */
const EASTER_EGG_KEY = "desa_melati_easter_egg";

function isEasterEggUnlocked() {
  try {
    return localStorage.getItem(EASTER_EGG_KEY) === "true";
  } catch (_) {
    return false;
  }
}

function unlockEasterEgg() {
  try {
    localStorage.setItem(EASTER_EGG_KEY, "true");
    updateCollectionBadge();
  } catch (_) {}
}

function updateCollectionBadge() {
  const badge = $("#badge-collection");
  if (!badge) return;
  if (isEasterEggUnlocked()) {
    badge.textContent = "1/1 ✨";
    badge.style.borderColor = "rgba(255, 182, 193, 0.7)";
    badge.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.5)";
  } else {
    badge.textContent = "0/1";
    badge.style.borderColor = "rgba(255, 255, 255, 0.15)";
    badge.style.boxShadow = "none";
  }
}

let secretClickCount = 0;
let secretClickTimer = null;

function updateSecretObstacle(nodeId) {
  const obstacle = $("#secret-obstacle");
  if (!obstacle) return;

  // JIKA SUDAH DIDAPATKAN: Easter egg tidak akan muncul lagi di dalam cerita!
  // Hanya akan dapat diakses di dashboard melalui menu "Koleksi".
  if (isEasterEggUnlocked()) {
    obstacle.classList.add("hidden");
    return;
  }

  const modal = $("#modal-easter-egg");
  if (modal && !modal.classList.contains("hidden")) {
    obstacle.classList.add("hidden");
    return;
  }

  // Peluang 45% muncul di setiap adegan cerita
  const shouldSpawn = Math.random() < 0.45;
  if (!shouldSpawn) {
    obstacle.classList.add("hidden");
    return;
  }

  // Posisi acak yang aman di layar (di atas dialog box)
  const randomTop = Math.floor(18 + Math.random() * 48); // 18% - 66%
  const randomLeft = Math.floor(8 + Math.random() * 80); // 8% - 88%

  // Variasi simbol misterius
  const icons = ["📜", "🎐", "🏮", "✨"];
  const iconEl = obstacle.querySelector(".secret-icon");
  if (iconEl) {
    iconEl.textContent = icons[Math.floor(Math.random() * icons.length)];
  }

  obstacle.style.top = `${randomTop}%`;
  obstacle.style.left = `${randomLeft}%`;
  obstacle.classList.remove("hidden");
}

function triggerEasterEgg() {
  // Tandai bahwa easter egg telah berhasil didapatkan secara permanen
  unlockEasterEgg();

  const modal = $("#modal-easter-egg");
  const obstacle = $("#secret-obstacle");
  if (obstacle) obstacle.classList.add("hidden");

  // Mainkan voice Voice/ara-ara.mp3 & sfx flash
  AudioEngine.playEasterEggVoice();
  AudioEngine.playFx("flash");

  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeEasterEgg() {
  AudioEngine.click();
  const modal = $("#modal-easter-egg");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function handleSecretClick() {
  // Jika sudah didapatkan, klik rahasia dalam cerita tidak aktif lagi
  if (isEasterEggUnlocked()) return;

  secretClickCount++;
  if (secretClickTimer) clearTimeout(secretClickTimer);
  secretClickTimer = setTimeout(() => {
    secretClickCount = 0;
  }, 1200);

  if (secretClickCount >= 3) {
    secretClickCount = 0;
    triggerEasterEgg();
  }
}

/* ─── FITUR KOLEKSI (DASHBOARD) ─── */
function renderCollection() {
  const container = $("#collection-content");
  if (!container) return;

  const unlocked = isEasterEggUnlocked();
  container.innerHTML = `
    <div class="collection-summary">
      <span class="collection-summary-title">Status Penemuan Rahasia</span>
      <span class="collection-summary-count">${unlocked ? "1/1 Ditemukan ✨" : "0/1 Ditemukan"}</span>
    </div>
    ${
      unlocked
        ? `
      <div class="collection-item unlocked">
        <div class="collection-thumb-wrapper">
          <img src="assets/easter_egg_ghost.png" alt="Sosok Gaib Misterius" class="collection-thumb-img">
        </div>
        <div class="collection-info">
          <span class="collection-item-tag">✨ RAHASIA DESA MELATI</span>
          <h4 class="collection-item-name">Sosok Gaib Misterius (Easter Egg)</h4>
          <p class="collection-item-desc">"Ara ara~... Ternyata kamu bisa nemuin aku di sudut Desa Melati ini? Berani juga ya, kupikir kamu cuma lari ketakutan sama teror desa... Jangan lupa istirahat ya, Mas~ hihihi ❤️"</p>
          <div class="collection-actions">
            <button id="btn-collection-voice" class="btn-primary">Putar Suara 🔊</button>
            <button id="btn-collection-view" class="btn-secondary">Lihat Karakter 👁️</button>
          </div>
        </div>
      </div>
    `
        : `
      <div class="collection-item locked">
        <div class="collection-locked-icon">🔒</div>
        <div class="collection-locked-info">
          <div class="collection-locked-title">??? (Koleksi Rahasia Terkunci)</div>
          <p class="collection-locked-hint">Ada penampakan gaib rahasia yang tersembunyi di dalam cerita. Temukan benda melayang misterius yang terkadang muncul di sudut adegan saat kamu menjelajahi Desa Melati...</p>
        </div>
      </div>
    `
    }
  `;

  const btnVoice = $("#btn-collection-voice");
  if (btnVoice) {
    btnVoice.addEventListener("click", () => {
      AudioEngine.click();
      AudioEngine.playEasterEggVoice();
    });
  }

  const btnView = $("#btn-collection-view");
  if (btnView) {
    btnView.addEventListener("click", () => {
      AudioEngine.click();
      closeCollectionModal();
      const modal = $("#modal-easter-egg");
      if (modal) modal.classList.remove("hidden");
    });
  }
}

function openCollectionModal() {
  AudioEngine.click();
  renderCollection();
  const modal = $("#modal-collection");
  if (modal) modal.classList.remove("hidden");
}

function closeCollectionModal() {
  AudioEngine.click();
  const modal = $("#modal-collection");
  if (modal) modal.classList.add("hidden");
}

/* ─── GLOBAL EVENTS & KEYBOARD ─── */
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    const collModal = $("#modal-collection");
    if (collModal && !collModal.classList.contains("hidden")) {
      e.preventDefault();
      closeCollectionModal();
      return;
    }

    const easterModal = $("#modal-easter-egg");
    if (easterModal && !easterModal.classList.contains("hidden")) {
      e.preventDefault();
      closeEasterEgg();
      return;
    }

    if (skipTyping()) {
      e.preventDefault();
      return;
    }
    const contBtn = $(".choice-btn.cont-btn");
    if (contBtn) {
      e.preventDefault();
      contBtn.click();
      return;
    }
  }

  if (e.key >= "1" && e.key <= "9") {
    const btns = $$("#choices .choice-btn:not(.cont-btn)");
    const idx = parseInt(e.key, 10) - 1;
    if (btns[idx] && !btns[idx].disabled) {
      e.preventDefault();
      btns[idx].click();
    }
  }

  if (e.key === "l" || e.key === "L" || e.key === "h" || e.key === "H") {
    const modal = $("#modal-log");
    if (modal) {
      if (modal.classList.contains("hidden")) openLogModal();
      else closeLogModal();
    }
  }

  if (e.key === "Escape") {
    const collModal = $("#modal-collection");
    if (collModal && !collModal.classList.contains("hidden")) {
      closeCollectionModal();
      return;
    }
    const easterModal = $("#modal-easter-egg");
    if (easterModal && !easterModal.classList.contains("hidden")) {
      closeEasterEgg();
      return;
    }
    const modal = $("#modal-log");
    if (modal && !modal.classList.contains("hidden")) {
      closeLogModal();
      return;
    }
    const settings = $("#settings-panel");
    if (settings && !settings.classList.contains("hidden")) {
      settings.classList.add("hidden");
    }
  }
});

document.addEventListener("click", (e) => {
  if (
    e.target.closest("button") ||
    e.target.closest("#settings-panel") ||
    e.target.closest("#modal-log") ||
    e.target.closest("#modal-easter-egg") ||
    e.target.closest("#modal-collection") ||
    e.target.closest("#secret-obstacle")
  ) return;
  skipTyping();
});

/* ─── INITIALIZATION ─── */
window.addEventListener("DOMContentLoaded", () => {
  loadSettings();

  $("#btn-start").addEventListener("click", () => {
    AudioEngine.init();
    AudioEngine.startBgm();
    startGame();
  });

  $("#btn-continue").addEventListener("click", () => {
    AudioEngine.init();
    AudioEngine.startBgm();
    continueGame();
  });

  $("#btn-undo").addEventListener("click", undo);
  $("#btn-settings").addEventListener("click", toggleSettings);
  $("#btn-log").addEventListener("click", openLogModal);
  $("#btn-close-log").addEventListener("click", closeLogModal);
  $("#btn-fullscreen").addEventListener("click", toggleFullscreen);

  // Koleksi Modal bindings (Dashboard)
  const btnCollection = $("#btn-collection");
  if (btnCollection) btnCollection.addEventListener("click", openCollectionModal);

  const btnCloseCollection = $("#btn-close-collection");
  if (btnCloseCollection) btnCloseCollection.addEventListener("click", closeCollectionModal);

  const modalCollection = $("#modal-collection");
  if (modalCollection) {
    modalCollection.addEventListener("click", (e) => {
      if (e.target === modalCollection) closeCollectionModal();
    });
  }

  // Easter Egg bindings
  const secretObs = $("#secret-obstacle");
  if (secretObs) {
    secretObs.addEventListener("click", (e) => {
      e.stopPropagation();
      triggerEasterEgg();
    });
  }

  const btnCloseEaster = $("#btn-close-easter");
  if (btnCloseEaster) btnCloseEaster.addEventListener("click", closeEasterEgg);

  const btnDismissEaster = $("#btn-dismiss-easter");
  if (btnDismissEaster) btnDismissEaster.addEventListener("click", closeEasterEgg);

  const modalEaster = $("#modal-easter-egg");
  if (modalEaster) {
    modalEaster.addEventListener("click", (e) => {
      if (e.target === modalEaster) closeEasterEgg();
    });
  }

  // Secret 3-click trigger on chapter title or scene label
  const chTitle = $("#chapter-title");
  if (chTitle) chTitle.addEventListener("click", handleSecretClick);
  const scLabel = $("#scene-label");
  if (scLabel) scLabel.addEventListener("click", handleSecretClick);

  // Close log modal on outside click
  const logModal = $("#modal-log");
  if (logModal) {
    logModal.addEventListener("click", (e) => {
      if (e.target === logModal) closeLogModal();
    });
  }

  $$('input[name="speed"]').forEach((r) => {
    r.addEventListener("change", () => {
      settings.textSpeed = r.value;
      save();
    });
  });

  $("#toggle-sound").addEventListener("change", (e) => {
    settings.soundEnabled = e.target.checked;
    AudioEngine.sfxEnabled = e.target.checked;
    save();
  });

  const bgmToggle = $("#toggle-bgm");
  if (bgmToggle) {
    bgmToggle.checked = settings.bgmEnabled !== false;
    bgmToggle.addEventListener("change", (e) => {
      settings.bgmEnabled = e.target.checked;
      AudioEngine.bgmEnabled = e.target.checked;
      save();
    });
  }

  $("#btn-replay").addEventListener("click", () => {
    AudioEngine.click();
    startGame();
  });

  $("#btn-menu").addEventListener("click", () => {
    AudioEngine.click();
    showTitle();
  });

  // Mulai preload aset
  preloadInitialAssets();
});

