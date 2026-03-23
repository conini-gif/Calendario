(function () {
  const syncStatus = document.getElementById("syncStatus");
  const authEmailInput = document.getElementById("authEmailInput");
  const authPasswordInput = document.getElementById("authPasswordInput");
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const syncNowBtn = document.getElementById("syncNowBtn");

  let supabaseClient = null;
  let syncReady = false;

  function setStatus(text) {
    if (syncStatus) syncStatus.textContent = text;
  }

  function setLoggedIn(loggedIn, email = "") {
    authEmailInput?.classList.toggle("hidden", loggedIn);
    authPasswordInput?.classList.toggle("hidden", loggedIn);
    logoutBtn?.classList.toggle("hidden", !loggedIn);
    loginBtn?.classList.toggle("hidden", loggedIn);
    registerBtn?.classList.toggle("hidden", loggedIn);
    if (loggedIn && email) {
      setStatus(`Conectado como ${email}`);
      if (authPasswordInput) authPasswordInput.value = "";
    } else if (!loggedIn) {
      setStatus("Supabase listo. Registrate o inicia sesion para sincronizar");
    }
  }

  function showSessionSupport(email = "") {
    window.CalendarSyncBridge?.showSupportMessage?.(`${email}-${new Date().toISOString()}`);
  }

  async function getSession() {
    if (!supabaseClient) return null;
    const { data } = await supabaseClient.auth.getSession();
    return data.session;
  }

  async function pushState() {
    if (!syncReady || !window.CalendarSyncBridge) return;
    const session = await getSession();
    if (!session) {
      setStatus("Inicia sesion para sincronizar");
      return;
    }

    const payload = window.CalendarSyncBridge.getState();
    const { error } = await supabaseClient
      .from("app_states")
      .upsert({
        user_id: session.user.id,
        payload,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setStatus("Error al sincronizar");
      console.error(error);
      return;
    }

      setStatus(`Cambios sincronizados para ${session.user.email || "tu cuenta"}`);
  }

  async function pullState() {
    if (!syncReady || !window.CalendarSyncBridge) return;
    const session = await getSession();
    if (!session) return;

    const { data, error } = await supabaseClient
      .from("app_states")
      .select("payload, updated_at")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      setStatus("No se pudo cargar la nube");
      return;
    }

    if (data?.payload) {
      window.CalendarSyncBridge.applyState(data.payload);
      setStatus(`Datos cargados desde la nube (${session.user.email || "cuenta"})`);
    } else {
      await pushState();
    }
  }

  function getCredentials() {
    const email = authEmailInput?.value.trim();
    const password = authPasswordInput?.value.trim();
    if (!email) {
      setStatus("Escribe tu email");
      return null;
    }
    if (!password || password.length < 6) {
      setStatus("La contrasena debe tener al menos 6 caracteres");
      return null;
    }
    return { email, password };
  }

  async function signUp() {
    if (!supabaseClient) return;
    const credentials = getCredentials();
    if (!credentials) return;

    const { error } = await supabaseClient.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error(error);
      setStatus(error.message || "No se pudo registrar la cuenta");
      return;
    }

      setStatus("Cuenta creada. Ahora puedes entrar");
  }

  async function signIn() {
    if (!supabaseClient) return;
    const credentials = getCredentials();
    if (!credentials) return;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error(error);
      setStatus(error.message || "No se pudo iniciar sesion");
      return;
    }

    setStatus("Sesion iniciada");
    showSessionSupport(credentials.email);
  }

  async function signOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    setLoggedIn(false);
    setStatus("Sesion cerrada. Sigues en modo local");
  }

  async function initSync() {
    try {
      const response = await fetch("/api/config");
      const config = await response.json();

      if (!config.supabaseConfigured || !window.supabase?.createClient) {
        setStatus("PWA lista. Falta configurar Supabase para sincronizar");
        return;
      }

      supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      syncReady = true;

        const session = await getSession();
        if (session) {
          setLoggedIn(true, session.user.email || "");
          showSessionSupport(session.user.email || "");
          await pullState();
        }

      if (window.CalendarSyncBridge) {
        window.CalendarSyncBridge.subscribe(() => {
          pushState();
        });
      }

      supabaseClient.auth.onAuthStateChange(async (_event, sessionData) => {
        if (sessionData) {
          setLoggedIn(true, sessionData.user.email || "");
          showSessionSupport(sessionData.user.email || "");
          await pullState();
        } else {
          setLoggedIn(false);
          setStatus("Sesion cerrada. Sigues en modo local");
        }
      });
    } catch (error) {
      console.error(error);
      setStatus("Sync no disponible en este momento");
    }
  }

  registerBtn?.addEventListener("click", signUp);
  loginBtn?.addEventListener("click", signIn);
  logoutBtn?.addEventListener("click", signOut);
  syncNowBtn?.addEventListener("click", pushState);

  initSync();
})();
