/**
 * Desa Melati - Anti-Inspect / Anti-DevTools Protection
 * Mencegah pengguna mengakses kode sumber melalui developer tools.
 */
(function () {
  "use strict";

  // 1. Disable right-click context menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // 2. Block keyboard shortcuts for dev tools
  document.addEventListener("keydown", function (e) {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + Shift + I (Inspect Element)
    if (isCtrlOrCmd && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + Shift + J (Console)
    if (isCtrlOrCmd && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + Shift + C (Element Picker)
    if (isCtrlOrCmd && e.shiftKey && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + U (View Source)
    if (isCtrlOrCmd && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + S (Save Page)
    if (isCtrlOrCmd && !e.shiftKey && (e.key === "S" || e.key === "s" || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + P (Print Page)
    if (isCtrlOrCmd && (e.key === "P" || e.key === "p" || e.keyCode === 80)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // 3. DevTools detection via debugger timing
  let devtoolsOpen = false;
  const threshold = 160;

  function detectDevTools() {
    const start = performance.now();
    // debugger statement causes a pause if devtools is open
    (function () {}).constructor("debugger")();
    const end = performance.now();

    if (end - start > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        onDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  function onDevToolsOpen() {
    // Clear the page content and show warning
    document.body.innerHTML = "";
    document.body.style.cssText =
      "background:#0b0c10;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;";
    const msg = document.createElement("div");
    msg.style.cssText =
      "color:#c9a458;font-family:sans-serif;font-size:1.4rem;text-align:center;padding:2rem;max-width:500px;line-height:1.8;";
    msg.innerHTML =
      '<p style="font-size:2.5rem;margin-bottom:1rem;">🔒</p>' +
      "<p><strong>Akses Ditolak</strong></p>" +
      "<p>Developer Tools terdeteksi.<br>Tutup DevTools dan muat ulang halaman untuk melanjutkan.</p>";
    document.body.appendChild(msg);
  }

  // 4. DevTools detection via window size difference
  function detectViaSize() {
    const widthDiff = window.outerWidth - window.innerWidth > 160;
    const heightDiff = window.outerHeight - window.innerHeight > 160;
    if (widthDiff || heightDiff) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        onDevToolsOpen();
      }
    }
  }

  // 5. Console.log override detection
  try {
    Object.defineProperty(console, "_commandLineAPI", {
      get: function () {
        onDevToolsOpen();
        return {};
      },
    });
  } catch (_) {}

  // 6. Disable drag (prevents dragging images to get URL)
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

  // 7. Disable copy/paste of page content
  document.addEventListener("copy", function (e) {
    e.preventDefault();
  });

  // Run detection periodically
  setInterval(detectDevTools, 2000);
  setInterval(detectViaSize, 3000);

  // 8. Disable text selection on body (already in CSS via user-select:none, but reinforce)
  document.addEventListener("selectstart", function (e) {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  });
})();
