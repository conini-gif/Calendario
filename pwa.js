let deferredPrompt = null;
const installAppBtn = document.getElementById("installAppBtn");
const syncStatus = document.getElementById("syncStatus");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  window.dispatchEvent(new CustomEvent("pwa:install-ready"));
});

async function setupPwa() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
    } catch (error) {
      console.warn("No se pudo registrar el service worker", error);
    }
  }

  window.__PWA__ = {
    async promptInstall() {
      if (!deferredPrompt) return false;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      return true;
    },
  };

  if (installAppBtn) {
    installAppBtn.addEventListener("click", async () => {
      const installed = await window.__PWA__.promptInstall();
      if (!installed) {
        installAppBtn.textContent = "Instalacion no disponible";
      }
    });
  }

  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    if (syncStatus) {
      syncStatus.textContent = config.supabaseConfigured
        ? "Nube lista para conectar celular y PC"
        : "PWA lista. Falta configurar Supabase para sincronizar";
    }
  } catch {
    if (syncStatus) {
      syncStatus.textContent = "PWA lista en modo local";
    }
  }
}

setupPwa();
