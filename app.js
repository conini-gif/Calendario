const monthLabel = document.getElementById("monthLabel");
const periodLabel = document.getElementById("periodLabel");
const calendarGrid = document.getElementById("calendarGrid");
const weekdaysRow = document.getElementById("weekdaysRow");
const viewButtons = [...document.querySelectorAll("[data-view]")];
const activityDialog = document.getElementById("activityDialog");
const activityForm = document.getElementById("activityForm");
const activityTemplate = document.getElementById("activityTemplate");
const dialogTitle = document.getElementById("dialogTitle");
const deleteActivityBtn = document.getElementById("deleteActivityBtn");
const templateDialog = document.getElementById("templateDialog");
const templateForm = document.getElementById("templateForm");
const templateDialogTitle = document.getElementById("templateDialogTitle");
const templateStartDateInput = document.getElementById("templateStartDate");
const templateUntilDateInput = document.getElementById("templateUntilDate");
const templateRecurrenceInput = document.getElementById("templateRecurrence");
const templateLinesInput = document.getElementById("templateLines");
const applyTemplateConfigBtn = document.getElementById("applyTemplateConfigBtn");

const activityDateInput = document.getElementById("activityDate");
const activityTitleInput = document.getElementById("activityTitle");
const activityTimeInput = document.getElementById("activityTime");
const activityDescriptionInput = document.getElementById("activityDescription");
const activityLocationInput = document.getElementById("activityLocation");
const activityDurationInput = document.getElementById("activityDuration");
const activityCategoryInput = document.getElementById("activityCategory");
const activityPriorityInput = document.getElementById("activityPriority");
const activityStatusInput = document.getElementById("activityStatus");
const activityRecurrenceInput = document.getElementById("activityRecurrence");
const activityRepeatUntilInput = document.getElementById("activityRepeatUntil");
const activityAllDayInput = document.getElementById("activityAllDay");
const activityFavoriteInput = document.getElementById("activityFavorite");
const activityChecklistInput = document.getElementById("activityChecklist");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const favoriteFilter = document.getElementById("favoriteFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const importBtn = document.getElementById("importBtn");
const importInput = document.getElementById("importInput");

const todayCount = document.getElementById("todayCount");
const pendingCount = document.getElementById("pendingCount");
const monthCount = document.getElementById("monthCount");
const overdueCount = document.getElementById("overdueCount");
const upcomingCount = document.getElementById("upcomingCount");
const upcomingList = document.getElementById("upcomingList");
const selectedDateLabel = document.getElementById("selectedDateLabel");
const selectedDateList = document.getElementById("selectedDateList");
const categorySummaryList = document.getElementById("categorySummaryList");
const templateList = document.getElementById("templateList");
const academicCareerInput = document.getElementById("academicCareerInput");
const academicUniversityInput = document.getElementById("academicUniversityInput");
const academicYearInput = document.getElementById("academicYearInput");
const subjectTrackerInput = document.getElementById("subjectTrackerInput");
const subjectTrackerList = document.getElementById("subjectTrackerList");
const semesterSubjectsInput = document.getElementById("semesterSubjectsInput");
const semesterLoadList = document.getElementById("semesterLoadList");
const generateSemesterBtn = document.getElementById("generateSemesterBtn");
const weeklyGoalsList = document.getElementById("weeklyGoalsList");
const overdueList = document.getElementById("overdueList");
const overdueListCount = document.getElementById("overdueListCount");
const duplicateActivityBtn = document.getElementById("duplicateActivityBtn");
const weeklyChart = document.getElementById("weeklyChart");
const timeByCategoryList = document.getElementById("timeByCategoryList");
const freeSlotsList = document.getElementById("freeSlotsList");
const freeSlotsCount = document.getElementById("freeSlotsCount");
const dayPlanList = document.getElementById("dayPlanList");
const planDayBtn = document.getElementById("planDayBtn");
const runAutomationBtn = document.getElementById("runAutomationBtn");
const automationList = document.getElementById("automationList");
const replanBtn = document.getElementById("replanBtn");
const replanList = document.getElementById("replanList");
const wellbeingScore = document.getElementById("wellbeingScore");
const wellbeingList = document.getElementById("wellbeingList");
const moodButtons = [...document.querySelectorAll("[data-mood]")];
const historyInsightList = document.getElementById("historyInsightList");
const liveModeList = document.getElementById("liveModeList");
const supportMessageList = document.getElementById("supportMessageList");
const quickNoteTitle = document.getElementById("quickNoteTitle");
const quickNoteInput = document.getElementById("quickNoteInput");

moodButtons.forEach((button) => {
  const icons = {
    great: "\u{1F603}",
    okay: "\u{1F610}",
    bad: "\u{1F61E}",
  };
  button.textContent = icons[button.dataset.mood] || "";
});

const STORAGE_KEY = "calendar-activities-v3";
const NEXT_STORAGE_KEY = "calendar-activities-v5";
const PREVIOUS_STORAGE_KEY = "calendar-activities-v2";
const LEGACY_STORAGE_KEY = "calendar-activities-v1";
const MOOD_STORAGE_KEY = "calendar-moods-v1";
const GOALS_STORAGE_KEY = "calendar-goals-v1";
const TEMPLATE_STORAGE_KEY = "calendar-template-configs-v1";
const QUICK_NOTES_STORAGE_KEY = "calendar-quick-notes-v1";
const ACADEMIC_PROFILE_STORAGE_KEY = "calendar-academic-profile-v1";
const SUBJECT_TRACKER_STORAGE_KEY = "calendar-subject-tracker-v1";
const SEMESTER_SIM_STORAGE_KEY = "calendar-semester-sim-v1";
const DEFAULT_CATEGORIES = ["Trabajo", "Estudio", "Personal", "Salud", "Otro"];
const PRIORITY_LABELS = { high: "Alta", medium: "Media", low: "Baja" };
const STATUS_LABELS = { pending: "Pendiente", done: "Completada" };
const RECURRENCE_LABELS = { none: "Sin repeticion", daily: "Diaria", weekly: "Semanal", monthly: "Mensual" };
const MOOD_LABELS = { great: "Excelente", okay: "Regular", bad: "Pesado" };
const DAILY_TASK_LIMIT = 6;
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 22;
const SUPPORT_MESSAGES = [
  "Ya entraste. No necesitas resolver todo hoy; empieza por un paso claro y pequeno.",
  "Tu agenda no define tu valor. Haz una cosa importante, respira y sigue desde ahi.",
  "Si el dia viene cargado, prioriza lo esencial y deja espacio para descansar sin culpa.",
  "Avanzar tambien cuenta cuando es lento. Orden y calma primero, velocidad despues.",
  "No tienes que hacerlo perfecto. Si hoy logras enfoque en un bloque bueno, ya suma bastante.",
  "Entraste a organizarte, no a exigirte de mas. Ve bloque por bloque.",
];
const WEEKLY_GOAL_DEFAULTS = [
  { id: "study_hours", label: "Estudiar", target: 8, unit: "h" },
  { id: "exercise_count", label: "Ejercicio", target: 3, unit: "sesiones" },
  { id: "sleep_routine", label: "Dormir mejor", target: 5, unit: "rutinas" },
  { id: "hydration_checkins", label: "Tomar agua", target: 7, unit: "registros" },
];
const TEMPLATE_DEFINITIONS = [
  {
    id: "study-routine",
    label: "Rutina de estudio",
    description: "Bloques de estudio y repaso de lunes a viernes.",
  },
  {
    id: "work-week",
    label: "Semana de trabajo",
    description: "Trabajo profundo, reuniones y cierre diario.",
  },
  {
    id: "university-schedule",
    label: "Horario universidad",
    description: "Clases, estudio posterior y descanso.",
  },
  {
    id: "daily-habits",
    label: "Habitos diarios",
    description: "Agua, pausa activa, caminata y rutina de sueno.",
  },
];

const today = new Date();
const currentView = new Date(today.getFullYear(), today.getMonth(), 1);

let activities = loadActivities();
let moods = loadMoods();
let weeklyGoals = loadWeeklyGoals();
let templateConfigs = loadTemplateConfigs();
let quickNotes = loadQuickNotes();
let academicProfile = loadAcademicProfile();
let subjectTrackerRaw = loadSubjectTrackerRaw();
let semesterSimulatorRaw = loadSemesterSimulatorRaw();
let editingActivityId = null;
let editingTemplateId = null;
let selectedDate = formatDateKey(today);
let viewMode = "month";
let filters = {
  search: "",
  category: "all",
  status: "all",
  priority: "all",
  favorite: "all",
};
let currentDayPlan = [];
let currentReplanSuggestions = [];
let activeSupportMessage = SUPPORT_MESSAGES[0];
const syncSubscribers = new Set();

function loadActivities() {
  try {
    const next = JSON.parse(localStorage.getItem(NEXT_STORAGE_KEY));
    if (Array.isArray(next)) return next.map(normalizeActivity);

    const current = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(current)) return current.map(normalizeActivity);

    const previous = JSON.parse(localStorage.getItem(PREVIOUS_STORAGE_KEY));
    if (Array.isArray(previous)) return previous.map(normalizeActivity);

    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (Array.isArray(legacy)) return legacy.map(normalizeActivity);
  } catch {
    return [];
  }
  return [];
}

function loadMoods() {
  try {
    return JSON.parse(localStorage.getItem(MOOD_STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function getDefaultWeeklyGoals() {
  return WEEKLY_GOAL_DEFAULTS.map((goal) => ({ ...goal }));
}

function loadWeeklyGoals() {
  try {
    const stored = JSON.parse(localStorage.getItem(GOALS_STORAGE_KEY));
    if (!Array.isArray(stored)) return getDefaultWeeklyGoals();
    return getDefaultWeeklyGoals().map((goal) => {
      const match = stored.find((item) => item.id === goal.id);
      return {
        ...goal,
        target: Number(match?.target ?? goal.target),
      };
    });
  } catch {
    return getDefaultWeeklyGoals();
  }
}

function loadQuickNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(QUICK_NOTES_STORAGE_KEY));
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function loadAcademicProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem(ACADEMIC_PROFILE_STORAGE_KEY));
    return {
      studentName: stored?.studentName ?? "",
      career: stored?.career ?? "",
      university: stored?.university ?? "",
      year: stored?.year ?? "",
    };
  } catch {
    return {
      studentName: "",
      career: "",
      university: "",
      year: "",
    };
  }
}

function loadSubjectTrackerRaw() {
  try {
    return localStorage.getItem(SUBJECT_TRACKER_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function loadSemesterSimulatorRaw() {
  try {
    return localStorage.getItem(SEMESTER_SIM_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function createDefaultTemplateConfigs(baseDateKey = formatDateKey(today)) {
  const untilDate = formatDateKey(addDays(parseDateKey(baseDateKey), 27));
  return {
    "study-routine": {
      startDate: baseDateKey,
      untilDate,
      recurrence: "weekly",
      lines: [
        "Lun|18:00|90|Bloque de estudio|Biblioteca|Estudio|high",
        "Mie|18:00|90|Bloque de estudio|Biblioteca|Estudio|high",
        "Vie|19:00|45|Repaso semanal|Casa|Estudio|medium",
      ].join("\n"),
    },
    "work-week": {
      startDate: baseDateKey,
      untilDate,
      recurrence: "weekly",
      lines: [
        "Lun|09:00|180|Trabajo profundo|Oficina|Trabajo|high",
        "Mar|15:00|90|Reunion de equipo|Sala 2|Trabajo|medium",
        "Jue|09:00|180|Trabajo profundo|Oficina|Trabajo|high",
        "Vie|17:00|45|Cierre semanal|Casa|Trabajo|medium",
      ].join("\n"),
    },
    "university-schedule": {
      startDate: baseDateKey,
      untilDate,
      recurrence: "weekly",
      lines: [
        "Lun|08:30|120|Clases universidad|Campus|Estudio|high",
        "Mie|10:30|120|Laboratorio|Campus|Estudio|high",
        "Jue|16:00|75|Estudio post clase|Biblioteca|Estudio|medium",
      ].join("\n"),
    },
    "daily-habits": {
      startDate: baseDateKey,
      untilDate,
      recurrence: "daily",
      lines: [
        "Todos|09:00|10|Tomar agua|Casa|Salud|low",
        "Todos|11:30|15|Pausa activa|Casa|Salud|medium",
        "Todos|19:00|30|Caminata corta|Barrio|Salud|medium",
        "Todos|todo-dia|20|Rutina de sueno|Casa|Salud|medium",
      ].join("\n"),
    },
  };
}

function loadTemplateConfigs() {
  try {
    const stored = JSON.parse(localStorage.getItem(TEMPLATE_STORAGE_KEY));
    const defaults = createDefaultTemplateConfigs();
    if (!stored || typeof stored !== "object") return defaults;
    return Object.fromEntries(
      TEMPLATE_DEFINITIONS.map((template) => [
        template.id,
        {
          ...defaults[template.id],
          ...(stored[template.id] ?? {}),
        },
      ]),
    );
  } catch {
    return createDefaultTemplateConfigs();
  }
}

function normalizeActivity(activity) {
  return {
    id: activity.id ?? crypto.randomUUID(),
    date: activity.date ?? formatDateKey(today),
    title: activity.title ?? "",
    time: activity.time ?? "",
    description: activity.description ?? "",
    location: activity.location ?? "",
    duration: Number(activity.duration ?? 0),
    category: activity.category ?? "Otro",
    priority: activity.priority ?? "medium",
    status: activity.status ?? "pending",
    recurrence: activity.recurrence ?? "none",
    repeatUntil: activity.repeatUntil ?? "",
    allDay: Boolean(activity.allDay),
    favorite: Boolean(activity.favorite),
    subjectName: activity.subjectName ?? "",
    generatedForExamId: activity.generatedForExamId ?? "",
    checklist: Array.isArray(activity.checklist)
      ? activity.checklist.map((item) => ({ text: item.text, done: Boolean(item.done) }))
      : parseChecklist(activity.checklist ?? ""),
  };
}

function saveActivities() {
  localStorage.setItem(NEXT_STORAGE_KEY, JSON.stringify(activities));
  currentReplanSuggestions = [];
  notifySyncSubscribers();
}

function saveMoods() {
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moods));
  notifySyncSubscribers();
}

function saveWeeklyGoals() {
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(weeklyGoals));
  notifySyncSubscribers();
}

function saveTemplateConfigs() {
  localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templateConfigs));
  notifySyncSubscribers();
}

function saveQuickNotes() {
  localStorage.setItem(QUICK_NOTES_STORAGE_KEY, JSON.stringify(quickNotes));
  notifySyncSubscribers();
}

function saveAcademicProfile() {
  localStorage.setItem(ACADEMIC_PROFILE_STORAGE_KEY, JSON.stringify(academicProfile));
  notifySyncSubscribers();
}

function saveSubjectTrackerRaw() {
  localStorage.setItem(SUBJECT_TRACKER_STORAGE_KEY, subjectTrackerRaw);
  notifySyncSubscribers();
}

function saveSemesterSimulatorRaw() {
  localStorage.setItem(SEMESTER_SIM_STORAGE_KEY, semesterSimulatorRaw);
  notifySyncSubscribers();
}

function notifySyncSubscribers() {
  syncSubscribers.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.warn("No se pudo notificar sincronizacion", error);
    }
  });
}

function exportSyncState() {
  return {
    activities,
    moods,
      weeklyGoals,
      templateConfigs,
      quickNotes,
      academicProfile,
      subjectTrackerRaw,
      semesterSimulatorRaw,
      selectedDate,
    viewMode,
    updatedAt: new Date().toISOString(),
  };
}

function applySyncState(state) {
  const nextSelectedDate = state?.selectedDate || selectedDate;
  activities = Array.isArray(state?.activities) ? state.activities.map(normalizeActivity) : activities;
  moods = state?.moods && typeof state.moods === "object" ? state.moods : moods;
  weeklyGoals = Array.isArray(state?.weeklyGoals)
    ? getDefaultWeeklyGoals().map((goal) => {
        const match = state.weeklyGoals.find((item) => item.id === goal.id);
        return { ...goal, target: Number(match?.target ?? goal.target) };
      })
    : weeklyGoals;
  templateConfigs = state?.templateConfigs && typeof state.templateConfigs === "object"
    ? Object.fromEntries(
        TEMPLATE_DEFINITIONS.map((template) => [
          template.id,
          {
            ...createDefaultTemplateConfigs(nextSelectedDate)[template.id],
            ...(state.templateConfigs[template.id] ?? {}),
          },
        ]),
      )
    : templateConfigs;
  quickNotes = state?.quickNotes && typeof state.quickNotes === "object" ? state.quickNotes : quickNotes;
  academicProfile = state?.academicProfile && typeof state.academicProfile === "object"
    ? {
        studentName: state.academicProfile.studentName ?? "",
        career: state.academicProfile.career ?? "",
        university: state.academicProfile.university ?? "",
        year: state.academicProfile.year ?? "",
      }
    : academicProfile;
  subjectTrackerRaw = typeof state?.subjectTrackerRaw === "string" ? state.subjectTrackerRaw : subjectTrackerRaw;
  semesterSimulatorRaw = typeof state?.semesterSimulatorRaw === "string" ? state.semesterSimulatorRaw : semesterSimulatorRaw;
  selectedDate = nextSelectedDate;
  viewMode = state?.viewMode || viewMode;
  const selected = parseDateKey(selectedDate);
  currentView.setFullYear(selected.getFullYear(), selected.getMonth(), 1);
  currentDayPlan = [];
  renderApp();
}

window.CalendarSyncBridge = {
  getState: exportSyncState,
  applyState: applySyncState,
  subscribe(listener) {
    syncSubscribers.add(listener);
    return () => syncSubscribers.delete(listener);
  },
  showSupportMessage(seed = "") {
    setSupportMessage(seed);
  },
};

function getSupportContext() {
  const dayActivities = getSelectedDayActivities();
  const pendingCountValue = dayActivities.filter((activity) => activity.status === "pending").length;
  const totalMinutes = dayActivities.reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
  if (pendingCountValue >= DAILY_TASK_LIMIT || totalMinutes >= 360) {
    return "Hoy viene intenso. Elige una prioridad realista y protege tus pausas.";
  }
  if (!dayActivities.length) {
    return "Tienes margen para disenar bien el dia. Aprovecha la calma para decidir con intencion.";
  }
  if (dayActivities.some((activity) => activity.favorite && activity.status === "pending")) {
    return "Ya tienes algo importante marcado. Empezar por eso puede darte traccion rapido.";
  }
  return "Tu calendario ya esta en marcha. Lo importante ahora es sostener el ritmo sin saturarte.";
}

function setSupportMessage(seed = "") {
  const base = String(seed || "");
  const hash = [...base].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const message = SUPPORT_MESSAGES[hash % SUPPORT_MESSAGES.length];
  activeSupportMessage = message;
  renderSupportMessage();
}

function renderSupportMessage() {
  if (!supportMessageList) return;
  supportMessageList.innerHTML = `
    <article class="support-card">
      <strong>${activeSupportMessage}</strong>
      <p class="agenda-description">${getSupportContext()}</p>
    </article>
  `;
}

function renderQuickNote() {
  if (!quickNoteInput || !quickNoteTitle) return;
  quickNoteTitle.textContent = selectedDate === formatDateKey(today) ? "Post-it de hoy" : `Post-it de ${selectedDate}`;
  quickNoteInput.value = quickNotes[selectedDate] ?? "";
}

function renderAcademicProfile() {
  if (!academicCareerInput || !academicUniversityInput || !academicYearInput) return;
  let studentInput = document.getElementById("academicStudentNameInput");
  if (!studentInput && academicCareerInput.parentElement?.parentElement) {
    const wrapper = document.createElement("label");
    wrapper.innerHTML = `
      Nombre del estudiante
      <input id="academicStudentNameInput" type="text" maxlength="100" placeholder="Ej. Maria Perez">
    `;
    academicCareerInput.parentElement.parentElement.prepend(wrapper);
    studentInput = wrapper.querySelector("#academicStudentNameInput");
    studentInput?.addEventListener("input", (event) => {
      academicProfile.studentName = event.target.value;
      saveAcademicProfile();
    });
  }

  const yearLabel = academicYearInput.closest("label");
  if (yearLabel?.childNodes?.[0]) {
    yearLabel.childNodes[0].textContent = "Año";
  }
  academicYearInput.placeholder = "Ej. 1ro, 2do, 3ro";
  if (studentInput) {
    studentInput.value = academicProfile.studentName ?? "";
  }
  academicCareerInput.value = academicProfile.career ?? "";
  academicUniversityInput.value = academicProfile.university ?? "";
  academicYearInput.value = academicProfile.year ?? "";
}

function parseSubjectTracker() {
  return String(subjectTrackerRaw || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", progress = "0", grade = "", importantDates = ""] = line.split("|").map((item) => item.trim());
      return {
        name,
        progress: Math.min(100, Math.max(0, Number(progress) || 0)),
        grade,
        importantDates,
      };
    })
    .filter((item) => item.name);
}

function renderSubjectTracker() {
  if (!subjectTrackerInput || !subjectTrackerList) return;
  subjectTrackerInput.value = subjectTrackerRaw;
  const subjects = parseSubjectTracker();
  subjectTrackerList.innerHTML = "";

  if (!subjects.length) {
    subjectTrackerList.innerHTML = `<p class="empty-state">Agrega ramos para ver avance, notas y fechas importantes.</p>`;
    return;
  }

  subjects.forEach((subject) => {
    const card = document.createElement("article");
    card.className = "subject-card";
    const subjectStyle = getSubjectStyle(subject.name);
    card.innerHTML = `
      <div class="goal-head">
        <strong>${subject.name}</strong>
        <span>${subject.progress}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${subject.progress}%"></div></div>
      <div class="subject-meta">
        <span class="tag subject-tag" style="${subjectStyle}">${subject.name}</span>
        <span class="tag">Nota ${subject.grade || "sin registro"}</span>
        <span class="tag">${subject.importantDates || "Sin fechas clave"}</span>
      </div>
    `;
    subjectTrackerList.appendChild(card);
  });
}

function parseSemesterSimulator() {
  return String(semesterSimulatorRaw || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", classesPerWeek = "0", assessments = "0", preferredSlot = ""] = line.split("|").map((item) => item.trim());
      return {
        name,
        classesPerWeek: Math.max(0, Number(classesPerWeek) || 0),
        assessments: Math.max(0, Number(assessments) || 0),
        preferredSlot,
      };
    })
    .filter((item) => item.name);
}

function getWeekActivityLoad(startDate) {
  const weekDates = getWeekDates(startDate);
  const startKey = formatDateKey(weekDates[0]);
  const endKey = formatDateKey(weekDates[6]);
  const weekItems = getVisibleActivities().filter((activity) => activity.occurrenceDate >= startKey && activity.occurrenceDate <= endKey);
  return weekItems.reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
}

function renderSemesterSimulator() {
  if (!semesterSubjectsInput || !semesterLoadList) return;
  semesterSubjectsInput.value = semesterSimulatorRaw;
  const subjects = parseSemesterSimulator();
  semesterLoadList.innerHTML = "";

  if (!subjects.length) {
    semesterLoadList.innerHTML = `<p class="empty-state">Ingresa tus ramos del semestre para detectar carga y planificar.</p>`;
    return;
  }

  const baseWeek = startOfWeek(parseDateKey(selectedDate));
  const rows = Array.from({ length: 4 }, (_, index) => {
    const weekStart = addDays(baseWeek, index * 7);
    const load = getWeekActivityLoad(weekStart) + subjects.reduce((sum, subject) => sum + (subject.classesPerWeek * 90), 0);
    return {
      weekStart,
      load,
    };
  });

  rows.forEach((row, index) => {
    const item = document.createElement("article");
    const highLoad = row.load >= 900;
    item.className = `summary-row ${highLoad ? "is-warning" : ""}`;
    item.innerHTML = `
      <span>Semana ${index + 1} · ${formatLongDate(formatDateKey(row.weekStart))}</span>
      <strong>${formatMinutes(row.load)}${highLoad ? " · alta carga" : ""}</strong>
    `;
    semesterLoadList.appendChild(item);
  });
}

function generateSemesterPlan() {
  const subjects = parseSemesterSimulator();
  if (!subjects.length) {
    window.alert("Agrega al menos un ramo en el simulador.");
    return;
  }

  const weekStart = startOfWeek(parseDateKey(selectedDate));
  const newItems = [];

  subjects.forEach((subject, index) => {
    const slot = subject.preferredSlot || ["Lun 09:00", "Mar 11:00", "Mie 10:00", "Jue 12:00", "Vie 09:30"][index % 5];
    const [dayToken = "Lun", timeToken = "09:00"] = slot.split(" ");
    const weekdayMap = { Lun: 1, Mar: 2, Mie: 3, Jue: 4, Vie: 5, Sab: 6, Dom: 0 };
    const weekDay = weekdayMap[dayToken] ?? 1;

    for (let classIndex = 0; classIndex < subject.classesPerWeek; classIndex += 1) {
      const dayOffset = (weekDay + classIndex) % 5;
      const date = formatDateKey(addDays(weekStart, dayOffset));
      newItems.push(normalizeActivity({
        date,
        time: timeToken,
        title: `Clase ${subject.name}`,
        description: `Bloque generado para el semestre.`,
        duration: 90,
        category: "Estudio",
        priority: "high",
        location: academicProfile.university || "Campus",
        subjectName: subject.name,
      }));
    }

    const studyDate = formatDateKey(addDays(weekStart, Math.min(5, weekDay + 1)));
    newItems.push(normalizeActivity({
      date: studyDate,
      time: "18:00",
      title: `Estudio ${subject.name}`,
      description: `Repaso automatico del ramo.`,
      duration: 75,
      category: "Estudio",
      priority: "medium",
      location: "Biblioteca",
      subjectName: subject.name,
    }));
  });

  const filtered = newItems.filter((item) => !hasSimilarActivity(item));
  if (!filtered.length) {
    window.alert("No hay bloques nuevos para agregar con esta simulacion.");
    return;
  }

  activities.push(...filtered);
  saveActivities();
  renderApp();
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function parseChecklist(value) {
  if (!value) return [];
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const checked = line.startsWith("[x]") || line.startsWith("[X]");
      const text = line.replace(/^\[(x|X| )\]\s*/, "").trim();
      return { text, done: checked };
    })
    .filter((item) => item.text);
}

function formatChecklist(checklist) {
  return checklist.map((item) => `${item.done ? "[x]" : "[ ]"} ${item.text}`).join("\n");
}

function getChecklistProgress(activity) {
  if (!activity.checklist.length) return null;
  const done = activity.checklist.filter((item) => item.done).length;
  const total = activity.checklist.length;
  return {
    done,
    total,
    percent: Math.round((done / total) * 100),
  };
}

function getActivityDurationMinutes(activity) {
  if (activity.duration > 0) return activity.duration;
  if (activity.allDay) return 90;
  if (activity.time) return 60;
  return 45;
}

function parseTimeToMinutes(time) {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(total) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${minutes} min`;
  if (!minutes) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

function formatClock(total) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function estimateTravelMinutes(previous, next) {
  if (!previous?.location || !next?.location) return 0;
  const previousLocation = sanitizeLocation(previous.location);
  const nextLocation = sanitizeLocation(next.location);
  if (previousLocation === nextLocation) return 0;
  if (previousLocation.includes("online") || previousLocation.includes("videollamada")) return 0;
  if (nextLocation.includes("online") || nextLocation.includes("videollamada")) return 0;
  const previousParts = previousLocation.split(/[,-]/).map((item) => item.trim()).filter(Boolean);
  const nextParts = nextLocation.split(/[,-]/).map((item) => item.trim()).filter(Boolean);
  if (previousParts.at(-1) && previousParts.at(-1) === nextParts.at(-1)) return 20;
  return 35;
}

function isExamActivity(activity) {
  const text = `${activity.title} ${activity.description} ${activity.category}`.toLowerCase();
  return text.includes("examen") || text.includes("prueba");
}

function getBlockType(activity) {
  const text = `${activity.title} ${activity.description} ${activity.location}`.toLowerCase();
  const category = String(activity.category || "").toLowerCase();

  if (
    text.includes("clase")
    || text.includes("laboratorio")
    || text.includes("campus")
    || text.includes("universidad")
  ) {
    return "class";
  }

  if (category === "estudio") {
    return "study";
  }

  if (category === "personal" || category === "salud") {
    return "personal";
  }

  return "work";
}

function getBlockTypeLabel(type) {
  const labels = {
    class: "Clases",
    study: "Estudio",
    personal: "Tiempo personal",
    work: "Otros bloques",
  };
  return labels[type] || labels.work;
}

function getSubjectColor(subjectName) {
  const name = String(subjectName || "").trim();
  if (!name) return null;
  const palette = [
    { bg: "#e8f2ff", border: "#5f91d8", text: "#315f9f" },
    { bg: "#ecf7ed", border: "#5a9b62", text: "#3f7c47" },
    { bg: "#fff2e4", border: "#d98a4c", text: "#a35b28" },
    { bg: "#f3eefc", border: "#8b6cc7", text: "#6a4ea8" },
    { bg: "#f0f6fb", border: "#5c8aa1", text: "#3d677b" },
    { bg: "#fff0f1", border: "#d56d86", text: "#a44c61" },
  ];
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function getSubjectStyle(subjectName) {
  const color = getSubjectColor(subjectName);
  if (!color) return "";
  return `--subject-bg:${color.bg};--subject-border:${color.border};--subject-text:${color.text};`;
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function addMonths(date, amount) {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + amount);
  return copy;
}

function sameDay(dateA, dateB) {
  return formatDateKey(dateA) === formatDateKey(dateB);
}

function getMonthMatrix(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  const startDate = new Date(year, month, 1 - startOffset);

  return Array.from({ length: totalCells }, (_, index) => {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + index);
    return cellDate;
  });
}

function startOfWeek(date) {
  const copy = new Date(date);
  const offset = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - offset);
  return copy;
}

function getWeekDates(baseDate) {
  const weekStart = startOfWeek(baseDate);
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function sortActivities(items) {
  return [...items].sort((a, b) => {
    const dateA = a.occurrenceDate ?? a.date;
    const dateB = b.occurrenceDate ?? b.date;
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
    if (!a.time && !b.time) return a.title.localeCompare(b.title);
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
}

function formatLongDate(dateKey) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parseDateKey(dateKey));
}

function getWeekRange(dateKey = selectedDate) {
  const dates = getWeekDates(parseDateKey(dateKey));
  return {
    start: formatDateKey(dates[0]),
    end: formatDateKey(dates[6]),
    dates,
  };
}

function getSelectedWeekActivities() {
  const { start, end } = getWeekRange(selectedDate);
  return sortActivities(getFilteredActivities().filter((activity) => activity.occurrenceDate >= start && activity.occurrenceDate <= end));
}

function getMapUrl(location) {
  if (!location) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function sanitizeLocation(value) {
  return String(value || "").trim().toLowerCase();
}

function getExpansionWindow() {
  const monthStart = new Date(currentView.getFullYear(), currentView.getMonth(), 1);
  const monthEnd = new Date(currentView.getFullYear(), currentView.getMonth() + 1, 0);
  const selected = parseDateKey(selectedDate);
  const todayFloor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const futureLimit = addDays(todayFloor, 120);

  return {
    start: monthStart < selected ? monthStart : selected,
    end: futureLimit > (selected > monthEnd ? selected : monthEnd) ? futureLimit : (selected > monthEnd ? selected : monthEnd),
  };
}

function expandActivity(activity, start, end) {
  const firstDate = parseDateKey(activity.date);
  const lastAllowed = activity.repeatUntil ? parseDateKey(activity.repeatUntil) : end;
  const items = [];
  let cursor = new Date(firstDate);
  let safety = 0;

  while (cursor <= end && cursor <= lastAllowed && safety < 500) {
    if (cursor >= start) {
      items.push({
        ...activity,
        occurrenceDate: formatDateKey(cursor),
      });
    }

    if (activity.recurrence === "none") break;
    if (activity.recurrence === "daily") cursor = addDays(cursor, 1);
    if (activity.recurrence === "weekly") cursor = addDays(cursor, 7);
    if (activity.recurrence === "monthly") cursor = addMonths(cursor, 1);
    safety += 1;
  }

  return items;
}

function getVisibleActivities() {
  const { start, end } = getExpansionWindow();
  return activities.flatMap((activity) => expandActivity(activity, start, end));
}

function getFilteredActivities() {
  return getVisibleActivities().filter((activity) => {
    const haystack = `${activity.title} ${activity.description} ${activity.location}`.toLowerCase();
    const matchesSearch = haystack.includes(filters.search);
    const matchesCategory = filters.category === "all" || activity.category === filters.category;
    const matchesStatus = filters.status === "all" || activity.status === filters.status;
    const matchesPriority = filters.priority === "all" || activity.priority === filters.priority;
    const matchesFavorite = filters.favorite === "all" || activity.favorite;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesFavorite;
  });
}

function isOverdue(activity) {
  return activity.status === "pending" && activity.occurrenceDate < formatDateKey(today);
}

function createMetaTags(activity) {
  const blockType = getBlockType(activity);
  const subjectTag = activity.subjectName
    ? `<span class="tag subject-tag" style="${getSubjectStyle(activity.subjectName)}">${activity.subjectName}</span>`
    : "";
  const recurrenceTag = activity.recurrence !== "none" ? `<span class="tag">${RECURRENCE_LABELS[activity.recurrence]}</span>` : "";
  const locationTag = activity.location ? `<span class="tag">${activity.location}</span>` : "";
  const mapTag = activity.location ? `<a class="tag tag-link" href="${getMapUrl(activity.location)}" target="_blank" rel="noreferrer">Mapa</a>` : "";
  const allDayTag = activity.allDay ? `<span class="tag">Todo el dia</span>` : "";
  const favoriteTag = activity.favorite ? `<span class="tag">Favorita</span>` : "";
  const durationTag = activity.duration ? `<span class="tag">${activity.duration} min</span>` : "";
  return `
    <div class="activity-meta">
      <span class="tag block-tag block-type-${blockType}">${getBlockTypeLabel(blockType)}</span>
      ${subjectTag}
      <span class="tag">${activity.category}</span>
      <span class="tag">${PRIORITY_LABELS[activity.priority]}</span>
      <span class="tag status-${activity.status}">${STATUS_LABELS[activity.status]}</span>
      ${allDayTag}
      ${favoriteTag}
      ${durationTag}
      ${recurrenceTag}
      ${locationTag}
      ${mapTag}
    </div>
  `;
}

function buildActivityChip(activity, options = {}) {
  const { compact = false } = options;
  const chip = activityTemplate.content.firstElementChild.cloneNode(true);
  const progress = getChecklistProgress(activity);
  const checklistPreview = activity.checklist
    .slice(0, 3)
    .map((item) => `<span class="checklist-item ${item.done ? "is-done" : ""}">${item.done ? "[x]" : "[ ]"} ${item.text}</span>`)
    .join("");
  chip.dataset.id = activity.id;
  chip.draggable = true;
  chip.classList.add(`priority-${activity.priority}`);
  chip.classList.add(`block-type-${getBlockType(activity)}`);
  if (activity.subjectName) {
    chip.classList.add("has-subject");
    const subjectStyle = getSubjectStyle(activity.subjectName);
    chip.style.cssText += subjectStyle;
  }
  if (compact) chip.classList.add("is-compact");
  if (activity.status === "done") chip.classList.add("is-done");
  if (activity.allDay) chip.classList.add("is-all-day");
  if (activity.favorite) chip.classList.add("is-favorite");
  if (isOverdue(activity)) chip.classList.add("is-overdue");

  chip.innerHTML = `
    <div class="chip-topline">
      ${(activity.allDay || activity.time) ? `<span class="activity-time">${activity.allDay ? "Todo el dia" : activity.time}</span>` : "<span></span>"}
      ${activity.favorite ? '<span class="favorite-mark">★</span>' : ""}
    </div>
    <span class="activity-title">${activity.title}</span>
    ${activity.description ? `<span class="activity-description">${activity.description}</span>` : ""}
    ${createMetaTags(activity)}
    ${progress ? `
      <div class="progress-row">
        <span class="checklist-item">${progress.done}/${progress.total} subtareas</span>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress.percent}%"></div></div>
      </div>
    ` : ""}
    ${checklistPreview ? `<div class="checklist-preview">${checklistPreview}</div>` : ""}
    <div class="chip-actions">
      <button class="chip-action ${activity.status === "done" ? "is-on" : ""}" type="button" data-action="toggle-status">✓</button>
      <button class="chip-action" type="button" data-action="duplicate">Duplicar</button>
      <button class="chip-action ${activity.favorite ? "is-on" : ""}" type="button" data-action="toggle-favorite">★</button>
    </div>
  `;

  chip.addEventListener("click", () => openDialog(activity));
  chip.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", activity.id);
    event.dataTransfer.effectAllowed = "move";
    chip.classList.add("is-dragging");
  });
  chip.addEventListener("dragend", () => {
    chip.classList.remove("is-dragging");
  });
  chip.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog(activity);
    }
  });

  chip.querySelector('[data-action="toggle-status"]').addEventListener("click", (event) => {
    event.stopPropagation();
    toggleActivityStatus(activity.id);
  });

  chip.querySelector('[data-action="duplicate"]').addEventListener("click", (event) => {
    event.stopPropagation();
    duplicateActivity(activity);
  });

  chip.querySelector('[data-action="toggle-favorite"]').addEventListener("click", (event) => {
    event.stopPropagation();
    toggleActivityFavorite(activity.id);
  });

  chip.querySelectorAll(".tag-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  return chip;
}

function getDateActivities(dateKey, items) {
  return sortActivities(items.filter((activity) => activity.occurrenceDate === dateKey));
}

function moveActivityToSlot(activityId, nextDate, nextTime = null) {
  let changed = false;
  activities = activities.map((activity) => {
    if (activity.id !== activityId) return activity;
    changed = true;
    return {
      ...activity,
      date: nextDate,
      time: activity.allDay ? "" : (nextTime ?? activity.time),
      allDay: nextTime === null ? activity.allDay : false,
    };
  });

  if (!changed) return;
  selectedDate = nextDate;
  currentDayPlan = [];
  currentReplanSuggestions = [];
  saveActivities();
  renderApp();
}

function attachDropTarget(element, nextDate, nextTime = null) {
  element.addEventListener("dragover", (event) => {
    event.preventDefault();
    element.classList.add("is-drop-target");
  });
  element.addEventListener("dragleave", () => {
    element.classList.remove("is-drop-target");
  });
  element.addEventListener("drop", (event) => {
    event.preventDefault();
    element.classList.remove("is-drop-target");
    const activityId = event.dataTransfer.getData("text/plain");
    if (!activityId) return;
    moveActivityToSlot(activityId, nextDate, nextTime);
  });
}

function buildTimelineActivity(activity) {
  const block = document.createElement("article");
  block.className = `timeline-activity priority-${activity.priority} block-type-${getBlockType(activity)}`;
  if (activity.status === "done") block.classList.add("is-done");
  if (activity.favorite) block.classList.add("is-favorite");
  if (activity.subjectName) {
    block.classList.add("has-subject");
    block.style.cssText += getSubjectStyle(activity.subjectName);
  }
  block.draggable = true;
  block.dataset.id = activity.id;
  const start = activity.allDay ? "Todo el dia" : activity.time || "Sin hora";
  const duration = formatMinutes(getActivityDurationMinutes(activity));
  block.innerHTML = `
    <div class="timeline-head">
      <strong>${activity.title}</strong>
      <span>${start}</span>
    </div>
    <div class="activity-description">${activity.category} · ${duration}${activity.location ? ` · ${activity.location}` : ""}</div>
  `;
  block.addEventListener("click", () => openDialog(activity));
  block.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", activity.id);
    event.dataTransfer.effectAllowed = "move";
    block.classList.add("is-dragging");
  });
  block.addEventListener("dragend", () => block.classList.remove("is-dragging"));
  return block;
}

function renderDayTimeline(date, items) {
  const dateKey = formatDateKey(date);
  const timeline = document.createElement("section");
  timeline.className = "day-timeline";
  const dayActivities = getDateActivities(dateKey, items);
  const timedActivities = dayActivities.filter((activity) => activity.time && !activity.allDay);
  const looseActivities = dayActivities.filter((activity) => !activity.time || activity.allDay);

  const header = document.createElement("div");
  header.className = "timeline-header";
  header.innerHTML = `
    <div>
      <p class="toolbar-label">Vista por horas</p>
      <h3>${formatLongDate(dateKey)}</h3>
    </div>
    <span class="panel-pill">${dayActivities.length}</span>
  `;
  timeline.appendChild(header);

  if (looseActivities.length) {
    const looseGroup = document.createElement("div");
    looseGroup.className = "timeline-loose-group";
    looseGroup.innerHTML = `<span class="timeline-group-label">Sin hora fija</span>`;
    attachDropTarget(looseGroup, dateKey, null);
    looseActivities.forEach((activity) => looseGroup.appendChild(buildTimelineActivity(activity)));
    timeline.appendChild(looseGroup);
  }

  for (let hour = DAY_START_HOUR; hour <= DAY_END_HOUR; hour += 1) {
    const hourStart = hour * 60;
    const hourLabel = `${String(hour).padStart(2, "0")}:00`;
    const row = document.createElement("div");
    row.className = "timeline-row";
    row.innerHTML = `
      <div class="timeline-hour">${hourLabel}</div>
      <div class="timeline-slot"></div>
    `;
    const slot = row.querySelector(".timeline-slot");
    attachDropTarget(slot, dateKey, hourLabel);
    timedActivities
      .filter((activity) => parseTimeToMinutes(activity.time) >= hourStart && parseTimeToMinutes(activity.time) < hourStart + 60)
      .forEach((activity) => slot.appendChild(buildTimelineActivity(activity)));
    if (!slot.children.length) {
      const hint = document.createElement("span");
      hint.className = "timeline-empty";
      hint.textContent = "Arrastra una actividad aqui";
      slot.appendChild(hint);
    }
    timeline.appendChild(row);
  }

  return timeline;
}

function buildDayCard(date, items, options = {}) {
  const { limit = 3, currentMonth = currentView.getMonth() } = options;
  const dayCard = document.createElement("article");
  const dateKey = formatDateKey(date);
  const isCurrentMonth = date.getMonth() === currentMonth;
  const isToday = sameDay(date, today);
  const isSelected = dateKey === selectedDate;
  const dayActivities = getDateActivities(dateKey, items);

  dayCard.className = "day-card";
  if (!isCurrentMonth) dayCard.classList.add("is-other-month");
  if (isToday) dayCard.classList.add("is-today");
  if (isSelected) dayCard.classList.add("is-selected");
  attachDropTarget(dayCard, dateKey, null);

  const header = document.createElement("div");
  header.className = "day-card-header";

  const dayNumber = document.createElement("span");
  dayNumber.className = "day-number";
  dayNumber.textContent = viewMode === "month"
    ? String(date.getDate())
    : new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric" }).format(date);

  const actions = document.createElement("div");
  actions.className = "day-card-actions";

  if (dayActivities.length > 0) {
    const badge = document.createElement("span");
    badge.className = "day-badge";
    badge.textContent = String(dayActivities.length);
    actions.appendChild(badge);
  }

  const addButton = document.createElement("button");
  addButton.className = "add-inline";
  addButton.type = "button";
  addButton.textContent = "+";
  addButton.setAttribute("aria-label", `Agregar actividad el ${dateKey}`);
  addButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openDialog({ date: dateKey });
  });
  actions.appendChild(addButton);

  header.append(dayNumber, actions);

  const activityList = document.createElement("div");
  activityList.className = "activities";

    dayActivities.slice(0, limit).forEach((activity) => {
      activityList.appendChild(buildActivityChip(activity, { compact: true }));
    });

  if (dayActivities.length > limit) {
    const more = document.createElement("span");
    more.className = "empty-state";
    more.textContent = `+${dayActivities.length - limit} mas`;
    activityList.appendChild(more);
  }

  dayCard.addEventListener("click", () => {
    selectedDate = dateKey;
    currentDayPlan = [];
    renderApp();
  });

  dayCard.append(header, activityList);
  return dayCard;
}

function renderPeriodHeader(baseDate) {
  if (viewMode === "month") {
    periodLabel.textContent = "Mes actual";
    monthLabel.textContent = new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" }).format(baseDate);
    weekdaysRow.classList.remove("hidden");
    weekdaysRow.innerHTML = "<span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>";
    return;
  }

  if (viewMode === "week") {
    const weekDates = getWeekDates(baseDate);
    periodLabel.textContent = "Semana actual";
    monthLabel.textContent = `${formatLongDate(formatDateKey(weekDates[0]))} al ${formatLongDate(formatDateKey(weekDates[6]))}`;
    weekdaysRow.classList.remove("hidden");
    weekdaysRow.innerHTML = weekDates.map((date) => `<span>${new Intl.DateTimeFormat("es-CL", { weekday: "short" }).format(date)}</span>`).join("");
    return;
  }

  periodLabel.textContent = "Dia actual";
  monthLabel.textContent = formatLongDate(formatDateKey(baseDate));
  weekdaysRow.classList.add("hidden");
}

function renderCalendar() {
  const filteredActivities = getFilteredActivities();
  calendarGrid.innerHTML = "";
  calendarGrid.className = "calendar-grid";

  if (viewMode === "month") {
    renderPeriodHeader(currentView);
    getMonthMatrix(currentView).forEach((date) => {
      calendarGrid.appendChild(buildDayCard(date, filteredActivities, { limit: 3, currentMonth: currentView.getMonth() }));
    });
    return;
  }

  if (viewMode === "week") {
    const weekBase = parseDateKey(selectedDate);
    renderPeriodHeader(weekBase);
    calendarGrid.classList.add("week-grid");
    getWeekDates(weekBase).forEach((date) => {
      calendarGrid.appendChild(buildDayCard(date, filteredActivities, { limit: 5, currentMonth: date.getMonth() }));
    });
    return;
  }

  const dayBase = parseDateKey(selectedDate);
  renderPeriodHeader(dayBase);
  calendarGrid.classList.add("day-grid");
  calendarGrid.appendChild(renderDayTimeline(dayBase, filteredActivities));
}

function renderSummary() {
  const filteredActivities = getFilteredActivities();
  const visibleMonthActivities = filteredActivities.filter((activity) => {
    const date = parseDateKey(activity.occurrenceDate);
    return date.getFullYear() === currentView.getFullYear() && date.getMonth() === currentView.getMonth();
  });

  todayCount.textContent = String(filteredActivities.filter((activity) => activity.occurrenceDate === formatDateKey(today)).length);
  pendingCount.textContent = String(filteredActivities.filter((activity) => activity.status === "pending").length);
  monthCount.textContent = String(visibleMonthActivities.length);
  overdueCount.textContent = String(filteredActivities.filter(isOverdue).length);
}

function renderUpcoming() {
  const filteredActivities = sortActivities(getFilteredActivities()).filter((activity) => {
    const date = parseDateKey(activity.occurrenceDate);
    return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });

  upcomingList.innerHTML = "";
  const items = filteredActivities.slice(0, 6);
  upcomingCount.textContent = String(items.length);

  if (items.length === 0) {
    upcomingList.innerHTML = `<p class="empty-state">No hay actividades proximas con los filtros actuales.</p>`;
    return;
  }

  items.forEach((activity) => {
    const item = document.createElement("article");
    item.className = `agenda-item priority-${activity.priority}`;
    item.innerHTML = `
      <span class="agenda-date">${formatLongDate(activity.date)}${activity.time ? ` · ${activity.time}` : ""}</span>
      <span class="agenda-title">${activity.title}</span>
      ${activity.description ? `<p class="agenda-description">${activity.description}</p>` : ""}
      <div class="agenda-meta">
        <span class="tag">${activity.category}</span>
        <span class="tag status-${activity.status}">${STATUS_LABELS[activity.status]}</span>
      </div>
    `;
    const timeLabel = activity.allDay ? " | Todo el dia" : activity.time ? ` | ${activity.time}` : "";
      item.innerHTML = `
        <span class="agenda-date">${formatLongDate(activity.occurrenceDate)}${timeLabel}</span>
        <span class="agenda-title">${activity.title}</span>
        ${activity.description ? `<p class="agenda-description">${activity.description}</p>` : ""}
        <div class="agenda-meta">
          <span class="tag block-tag block-type-${getBlockType(activity)}">${getBlockTypeLabel(getBlockType(activity))}</span>
          ${activity.subjectName ? `<span class="tag subject-tag" style="${getSubjectStyle(activity.subjectName)}">${activity.subjectName}</span>` : ""}
          <span class="tag">${activity.category}</span>
          <span class="tag status-${activity.status}">${STATUS_LABELS[activity.status]}</span>
          ${activity.recurrence !== "none" ? `<span class="tag">${RECURRENCE_LABELS[activity.recurrence]}</span>` : ""}
        </div>
      `;
    item.addEventListener("click", () => openDialog(activity));
    upcomingList.appendChild(item);
  });
}

function renderSelectedDate() {
  const filteredActivities = sortActivities(getFilteredActivities().filter((activity) => activity.occurrenceDate === selectedDate));
  selectedDateLabel.textContent = formatLongDate(selectedDate);
  selectedDateList.innerHTML = "";

  if (filteredActivities.length === 0) {
    selectedDateList.innerHTML = `<p class="empty-state">No hay actividades en esta fecha. Usa "Agregar" para crear una.</p>`;
    return;
  }

  filteredActivities.forEach((activity) => {
    selectedDateList.appendChild(buildActivityChip(activity));
  });
}

function renderCategorySummary() {
  const filteredActivities = getFilteredActivities();
  const totals = new Map();
  filteredActivities.forEach((activity) => {
    totals.set(activity.category, (totals.get(activity.category) ?? 0) + 1);
  });

  categorySummaryList.innerHTML = "";
  if (totals.size === 0) {
    categorySummaryList.innerHTML = `<p class="empty-state">No hay categorias con los filtros actuales.</p>`;
    return;
  }

  [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      const row = document.createElement("div");
      row.className = "summary-row";
      row.innerHTML = `<span>${category}</span><strong>${count}</strong>`;
      categorySummaryList.appendChild(row);
    });
}

function hasSimilarActivity(candidate) {
  return activities.some((activity) => {
    return activity.date === candidate.date
      && activity.title === candidate.title
      && activity.time === candidate.time
      && activity.category === candidate.category;
  });
}

function getTemplateConfig(templateId) {
  const defaults = createDefaultTemplateConfigs(selectedDate);
  return {
    ...defaults[templateId],
    ...(templateConfigs[templateId] ?? {}),
  };
}

function parseTemplateDayToken(token) {
  const normalized = String(token || "").trim().toLowerCase();
  const map = {
    lun: 1,
    lunes: 1,
    mar: 2,
    martes: 2,
    mie: 3,
    miercoles: 3,
    miércoles: 3,
    jue: 4,
    jueves: 4,
    vie: 5,
    viernes: 5,
    sab: 6,
    sábado: 6,
    sabado: 6,
    dom: 0,
    domingo: 0,
  };
  if (normalized === "*" || normalized === "todos" || normalized === "diario") return "all";
  return map[normalized] ?? null;
}

function parseTemplateLines(lines) {
  return String(lines || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [dayToken, rawTime, rawDuration, title, location = "", category = "Otro", priority = "medium"] = line.split("|").map((part) => part.trim());
      const weekday = parseTemplateDayToken(dayToken);
      if (!title || weekday === null) return null;
      return {
        weekday,
        time: rawTime || "",
        duration: Math.max(0, Number(rawDuration) || 45),
        title,
        location,
        category: DEFAULT_CATEGORIES.includes(category) ? category : "Otro",
        priority: ["high", "medium", "low"].includes(priority) ? priority : "medium",
      };
    })
    .filter(Boolean);
}

function buildTemplateActivities(templateId, config) {
  const entries = parseTemplateLines(config.lines);
  const start = parseDateKey(config.startDate);
  const end = parseDateKey(config.untilDate);
  const items = [];
  for (let cursor = new Date(start); cursor <= end; cursor = addDays(cursor, 1)) {
    const weekday = cursor.getDay();
    entries.forEach((entry) => {
      if (config.recurrence === "daily" || entry.weekday === "all" || entry.weekday === weekday) {
        items.push(normalizeActivity({
          date: formatDateKey(cursor),
          title: entry.title,
          time: entry.time === "todo-dia" ? "" : entry.time,
          allDay: entry.time === "todo-dia",
          duration: entry.duration,
          location: entry.location,
          category: entry.category,
          priority: entry.priority,
          status: "pending",
          description: `${TEMPLATE_DEFINITIONS.find((template) => template.id === templateId)?.label || "Plantilla"} configurada manualmente.`,
        }));
      }
    });
  }
  return items;
}

function saveCurrentTemplateConfig() {
  if (!editingTemplateId) return null;
  const nextConfig = {
    startDate: templateStartDateInput.value || selectedDate,
    untilDate: templateUntilDateInput.value || templateStartDateInput.value || selectedDate,
    recurrence: templateRecurrenceInput.value,
    lines: templateLinesInput.value.trim(),
  };
  templateConfigs = {
    ...templateConfigs,
    [editingTemplateId]: nextConfig,
  };
  saveTemplateConfigs();
  return nextConfig;
}

function applyTemplate(templateId, config = getTemplateConfig(templateId)) {
  const nextItems = buildTemplateActivities(templateId, config).filter((item) => !hasSimilarActivity(item));
  if (!nextItems.length) {
    window.alert("No hay bloques nuevos para crear con esa configuracion.");
    return;
  }
  activities.push(...nextItems);
  saveActivities();
  currentDayPlan = [];
  renderApp();
}

function openTemplateDialog(templateId) {
  editingTemplateId = templateId;
  const template = TEMPLATE_DEFINITIONS.find((item) => item.id === templateId);
  const config = getTemplateConfig(templateId);
  templateDialogTitle.textContent = template?.label ?? "Configurar plantilla";
  templateStartDateInput.value = config.startDate || selectedDate;
  templateUntilDateInput.value = config.untilDate || formatDateKey(addDays(parseDateKey(selectedDate), 27));
  templateRecurrenceInput.value = config.recurrence || "weekly";
  templateLinesInput.value = config.lines || "";
  templateDialog.showModal();
}

function closeTemplateDialog() {
  templateDialog.close();
  templateForm.reset();
  editingTemplateId = null;
}

function renderTemplatesPanel() {
  if (!templateList) return;
  templateList.innerHTML = "";
  TEMPLATE_DEFINITIONS.forEach((template) => {
    const config = getTemplateConfig(template.id);
    const entries = parseTemplateLines(config.lines);
    const card = document.createElement("article");
    card.className = "template-card";
    card.innerHTML = `
      <strong>${template.label}</strong>
      <span>${template.description}</span>
      <div class="template-meta">
        <span class="tag">${config.recurrence === "daily" ? "Diaria" : "Semanal"}</span>
        <span class="tag">${entries.length} bloques</span>
      </div>
      <div class="template-actions">
        <button class="ghost-button compact-button" type="button" data-template-edit="${template.id}">Configurar</button>
        <button class="primary-button compact-button" type="button" data-template-apply="${template.id}">Aplicar</button>
      </div>
    `;
    card.querySelector("[data-template-edit]").addEventListener("click", () => openTemplateDialog(template.id));
    card.querySelector("[data-template-apply]").addEventListener("click", () => applyTemplate(template.id, config));
    templateList.appendChild(card);
  });
}

function getGoalProgress(goal, items) {
  if (goal.id === "study_hours") {
    const minutes = items.filter((activity) => activity.category === "Estudio").reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
    return { value: Number((minutes / 60).toFixed(1)), unit: "h" };
  }

  if (goal.id === "exercise_count") {
    const value = items.filter((activity) => {
      const text = `${activity.title} ${activity.description} ${activity.location}`.toLowerCase();
      return text.includes("ejercicio") || text.includes("gim") || text.includes("caminata") || text.includes("entreno");
    }).length;
    return { value, unit: "sesiones" };
  }

  if (goal.id === "sleep_routine") {
    const value = items.filter((activity) => {
      const text = `${activity.title} ${activity.description}`.toLowerCase();
      return text.includes("sueño") || text.includes("sueno") || text.includes("dorm") || text.includes("descanso nocturno");
    }).length;
    return { value, unit: "rutinas" };
  }

  const value = items.filter((activity) => {
    const text = `${activity.title} ${activity.description}`.toLowerCase();
    return text.includes("agua") || text.includes("hidrat");
  }).length;
  return { value, unit: "registros" };
}

function updateWeeklyGoalTarget(goalId, nextTarget) {
  weeklyGoals = weeklyGoals.map((goal) => {
    if (goal.id !== goalId) return goal;
    return {
      ...goal,
      target: Math.max(1, Number(nextTarget) || goal.target),
    };
  });
  saveWeeklyGoals();
  renderWeeklyGoals();
}

function renderWeeklyGoals() {
  if (!weeklyGoalsList) return;
  const weekItems = getSelectedWeekActivities();
  weeklyGoalsList.innerHTML = "";
  weeklyGoals.forEach((goal) => {
    const progress = getGoalProgress(goal, weekItems);
    const percent = Math.min(100, Math.round((progress.value / goal.target) * 100));
    const item = document.createElement("article");
    item.className = "goal-card";
    item.innerHTML = `
      <div class="goal-head">
        <strong>${goal.label}</strong>
        <span>${progress.value}/${goal.target} ${goal.unit}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
      <label class="goal-target">
        Meta semanal
        <input type="number" min="1" value="${goal.target}" data-goal-target="${goal.id}">
      </label>
    `;
    weeklyGoalsList.appendChild(item);
  });

  weeklyGoalsList.querySelectorAll("[data-goal-target]").forEach((input) => {
    input.addEventListener("change", (event) => {
      updateWeeklyGoalTarget(event.target.dataset.goalTarget, event.target.value);
    });
  });
}

function renderOverdueList() {
  const items = sortActivities(getFilteredActivities().filter(isOverdue)).slice(0, 6);
  overdueList.innerHTML = "";
  overdueListCount.textContent = String(items.length);

  if (items.length === 0) {
    overdueList.innerHTML = `<p class="empty-state">No hay actividades atrasadas.</p>`;
    return;
  }

  items.forEach((activity) => {
    overdueList.appendChild(buildActivityChip(activity));
  });
}

function renderWeeklyAnalytics() {
  const baseWeek = getWeekDates(parseDateKey(selectedDate));
  const filteredActivities = getFilteredActivities();
  const dayTotals = baseWeek.map((date) => {
    const dateKey = formatDateKey(date);
    const total = filteredActivities
      .filter((activity) => activity.occurrenceDate === dateKey)
      .reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
    return { date, total };
  });

  const maxTotal = Math.max(...dayTotals.map((item) => item.total), 1);
  weeklyChart.innerHTML = "";
  dayTotals.forEach((item) => {
    const row = document.createElement("div");
    row.className = "chart-row";
    const label = new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric" }).format(item.date);
    const width = Math.max((item.total / maxTotal) * 100, item.total ? 8 : 0);
    row.innerHTML = `
      <div class="summary-row"><span>${label}</span><strong>${formatMinutes(item.total)}</strong></div>
      <div class="chart-track"><div class="chart-fill" style="width:${width}%"></div></div>
    `;
    weeklyChart.appendChild(row);
  });

  const categoryTotals = new Map();
  filteredActivities.forEach((activity) => {
    categoryTotals.set(activity.category, (categoryTotals.get(activity.category) ?? 0) + getActivityDurationMinutes(activity));
  });

  timeByCategoryList.innerHTML = "";
  if (categoryTotals.size === 0) {
    timeByCategoryList.innerHTML = `<p class="empty-state">Agrega duracion a tus actividades para ver analisis mas preciso.</p>`;
    return;
  }

  [...categoryTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, minutes]) => {
      const row = document.createElement("div");
      row.className = "summary-row";
      row.innerHTML = `<span>${category}</span><strong>${formatMinutes(minutes)}</strong>`;
      timeByCategoryList.appendChild(row);
    });
}

function getSelectedDayActivities() {
  return sortActivities(getFilteredActivities().filter((activity) => activity.occurrenceDate === selectedDate));
}

function getDayFreeSlots(items) {
  const workStart = 8 * 60;
  const workEnd = 22 * 60;
  const timed = items
    .filter((activity) => parseTimeToMinutes(activity.time) !== null || activity.allDay)
    .map((activity) => {
      const start = activity.allDay ? workStart : parseTimeToMinutes(activity.time);
      const duration = getActivityDurationMinutes(activity);
      return {
        ...activity,
        start,
        end: Math.min(start + duration, workEnd),
      };
    })
    .sort((a, b) => a.start - b.start);

  const slots = [];
  let cursor = workStart;

  timed.forEach((activity, index) => {
    if (activity.start > cursor) {
      slots.push({ start: cursor, end: activity.start, minutes: activity.start - cursor });
    }
    cursor = Math.max(cursor, activity.end);
    const next = timed[index + 1];
    if (next) {
      const travel = estimateTravelMinutes(activity, next);
      if (travel && cursor + travel <= next.start) {
        slots.push({ start: cursor, end: cursor + travel, minutes: travel, kind: "travel" });
        cursor += travel;
      }
    }
  });

  if (cursor < workEnd) {
    slots.push({ start: cursor, end: workEnd, minutes: workEnd - cursor });
  }

  return slots.filter((slot) => slot.minutes > 0);
}

function suggestSlotType(slot, dayActivities) {
  if (slot.kind === "travel") return { label: "Traslado estimado", kind: "break", detail: `${formatMinutes(slot.minutes)} entre lugares` };
  if (slot.minutes <= 20) return { label: "Microdescanso", kind: "break", detail: `${formatMinutes(slot.minutes)} disponibles` };
  const hasStudy = dayActivities.some((activity) => activity.category === "Estudio" && activity.status === "pending");
  if (slot.minutes <= 45) return { label: "Descanso", kind: "break", detail: `${formatMinutes(slot.minutes)} libres` };
  if (hasStudy) return { label: "Bloque de estudio", kind: "study", detail: `${formatMinutes(slot.minutes)} recomendados` };
  return { label: "Tiempo libre", kind: "free", detail: `${formatMinutes(slot.minutes)} libres` };
}

function buildAutomaticPlan() {
  const dayActivities = getSelectedDayActivities();
  const slots = getDayFreeSlots(dayActivities);
  const pendingUntimed = dayActivities
    .filter((activity) => !activity.allDay && !activity.time && activity.status === "pending")
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const plan = [];

  dayActivities
    .filter((activity) => activity.allDay || activity.time)
    .forEach((activity) => {
      const start = activity.allDay ? 8 * 60 : parseTimeToMinutes(activity.time);
      const duration = getActivityDurationMinutes(activity);
      plan.push({
        start,
        end: start + duration,
        label: activity.title,
        kind: "task",
        detail: `${activity.category}${activity.location ? ` · ${activity.location}` : ""}`,
      });
    });

  slots.forEach((slot) => {
    const matchingTask = pendingUntimed.find((activity) => getActivityDurationMinutes(activity) <= slot.minutes);
    if (matchingTask && slot.kind !== "travel") {
      plan.push({
        start: slot.start,
        end: slot.start + getActivityDurationMinutes(matchingTask),
        label: matchingTask.title,
        kind: "task",
        detail: `Ubicada automaticamente · ${matchingTask.category}`,
      });
      pendingUntimed.splice(pendingUntimed.indexOf(matchingTask), 1);
      const remaining = slot.minutes - getActivityDurationMinutes(matchingTask);
      if (remaining >= 15) {
        const suggestion = suggestSlotType({ ...slot, start: slot.start + getActivityDurationMinutes(matchingTask), minutes: remaining }, dayActivities);
        plan.push({
          start: slot.start + getActivityDurationMinutes(matchingTask),
          end: slot.end,
          label: suggestion.label,
          kind: suggestion.kind,
          detail: suggestion.detail,
        });
      }
      return;
    }

    const suggestion = suggestSlotType(slot, dayActivities);
    plan.push({
      start: slot.start,
      end: slot.end,
      label: suggestion.label,
      kind: suggestion.kind,
      detail: suggestion.detail,
    });
  });

  const normalized = sortActivities(plan.map((item) => ({
    ...item,
    occurrenceDate: selectedDate,
    date: selectedDate,
    time: formatClock(item.start),
    allDay: false,
  })));

  const withBreaks = [];
  let consecutiveTasks = 0;
  normalized.forEach((item) => {
    if (item.kind === "task") {
      consecutiveTasks += 1;
      withBreaks.push(item);
      if (consecutiveTasks >= 3) {
        withBreaks.push({
          start: item.end,
          end: item.end + 10,
          label: "Descanso sugerido",
          kind: "break",
          detail: "Llevas 3 bloques seguidos. Toma 10 min para bajar carga.",
          occurrenceDate: selectedDate,
          date: selectedDate,
          time: formatClock(item.end),
          allDay: false,
        });
        consecutiveTasks = 0;
      }
      return;
    }
    consecutiveTasks = 0;
    withBreaks.push(item);
  });

  return withBreaks;
}

function getDailyLoad(dateKey) {
  const items = sortActivities(getFilteredActivities().filter((activity) => activity.occurrenceDate === dateKey));
  return {
    count: items.length,
    minutes: items.reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0),
  };
}

function findReplanSuggestions() {
  const dayItems = getSelectedDayActivities();
  const dayLoad = dayItems.reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
  if (dayItems.length <= DAILY_TASK_LIMIT && dayLoad <= 360) return [];

  const movable = dayItems
    .filter((activity) => activity.status === "pending")
    .sort((a, b) => {
      const priorityOrder = { low: 0, medium: 1, high: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);

  return movable.map((activity) => {
    for (let offset = 1; offset <= 7; offset += 1) {
      const targetDate = formatDateKey(addDays(parseDateKey(selectedDate), offset));
      const load = getDailyLoad(targetDate);
      if (load.count < DAILY_TASK_LIMIT && load.minutes < 300) {
        return {
          activityId: activity.id,
          title: activity.title,
          from: selectedDate,
          to: targetDate,
          reason: `Mover a ${formatLongDate(targetDate)} libera carga y deja el dia en mejor equilibrio.`,
        };
      }
    }
    return null;
  }).filter(Boolean);
}

function applyReplanSuggestions() {
  if (!currentReplanSuggestions.length) {
    currentReplanSuggestions = findReplanSuggestions();
    renderReplanPanel();
    return;
  }

  const suggestionsById = new Map(currentReplanSuggestions.map((item) => [item.activityId, item]));
  activities = activities.map((activity) => {
    const suggestion = suggestionsById.get(activity.id);
    if (!suggestion) return activity;
    return {
      ...activity,
      date: suggestion.to,
    };
  });
  currentReplanSuggestions = [];
  currentDayPlan = [];
  saveActivities();
  renderApp();
}

function applyAutomationRules() {
  const notes = [];
  let changed = false;

  activities = activities.map((activity) => {
    if (activity.status === "pending" && activity.recurrence === "none" && activity.date < formatDateKey(today)) {
      const movedDate = formatDateKey(addDays(parseDateKey(activity.date), 1));
      notes.push(`"${activity.title}" se movio al ${movedDate}.`);
      changed = true;
      return { ...activity, date: movedDate };
    }
    return activity;
  });

  const generatedStudy = [];
  activities.forEach((activity) => {
    if (!isExamActivity(activity)) return;
    const existingLinked = activities.some((item) => item.generatedForExamId === activity.id);
    if (existingLinked) return;

    [7, 2].forEach((daysBefore, index) => {
      const studyDate = addDays(parseDateKey(activity.date), -daysBefore);
      if (studyDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
      generatedStudy.push(normalizeActivity({
        id: crypto.randomUUID(),
        date: formatDateKey(studyDate),
        title: `Estudio previo: ${activity.title}`,
        description: `Bloque sugerido antes del examen.`,
        duration: index === 0 ? 90 : 120,
        category: "Estudio",
        priority: "high",
        status: "pending",
        generatedForExamId: activity.id,
      }));
    });
  });

  if (generatedStudy.length) {
    activities.push(...generatedStudy);
    notes.push(`${generatedStudy.length} bloques de estudio fueron creados automaticamente.`);
    changed = true;
  }

  if (changed) {
    saveActivities();
    currentDayPlan = [];
  }

  return notes;
}

function renderReplanPanel() {
  if (!replanList) return;
  replanList.innerHTML = "";
  const suggestions = currentReplanSuggestions.length ? currentReplanSuggestions : findReplanSuggestions();
  currentReplanSuggestions = suggestions;

  if (!suggestions.length) {
    replanList.innerHTML = `<p class="empty-state">La carga del dia se ve estable. No hace falta mover nada.</p>`;
    return;
  }

  suggestions.forEach((suggestion) => {
    const item = document.createElement("article");
    item.className = "replan-card";
    item.innerHTML = `
      <strong>${suggestion.title}</strong>
      <span class="plan-time">${formatLongDate(suggestion.from)} → ${formatLongDate(suggestion.to)}</span>
      <div class="activity-description">${suggestion.reason}</div>
    `;
    replanList.appendChild(item);
  });
}

function renderPlanningPanels() {
  const dayActivities = getSelectedDayActivities();
  const slots = getDayFreeSlots(dayActivities);
  freeSlotsList.innerHTML = "";
  freeSlotsCount.textContent = String(slots.filter((slot) => slot.kind !== "travel").length);

  if (slots.length === 0) {
    freeSlotsList.innerHTML = `<p class="empty-state">No se detectaron espacios libres para esta fecha.</p>`;
  } else {
    slots.forEach((slot) => {
      const suggestion = suggestSlotType(slot, dayActivities);
      const item = document.createElement("article");
      item.className = "slot-item";
      item.innerHTML = `
        <span class="plan-time">${formatClock(slot.start)} - ${formatClock(slot.end)}</span>
        <strong>${suggestion.label}</strong>
        <div class="activity-description">${suggestion.detail}</div>
      `;
      freeSlotsList.appendChild(item);
    });
  }

  dayPlanList.innerHTML = "";
  if (!currentDayPlan.length) {
    dayPlanList.innerHTML = `<p class="empty-state">Pulsa "Planear mi dia" para generar una agenda sugerida.</p>`;
    return;
  }

  currentDayPlan.forEach((item) => {
    const node = document.createElement("article");
    node.className = `plan-item ${item.kind === "break" ? "is-break" : item.kind === "study" ? "is-study" : item.kind === "free" ? "is-free" : ""}`;
    node.innerHTML = `
      <span class="plan-time">${formatClock(item.start)} - ${formatClock(item.end)}</span>
      <strong>${item.label}</strong>
      <div class="activity-description">${item.detail}</div>
    `;
    dayPlanList.appendChild(node);
  });
}

function renderAutomationPanel(messages = []) {
  const dayActivities = getSelectedDayActivities();
  const timedPending = dayActivities.filter((activity) => activity.status === "pending" && (activity.time || activity.allDay));
  const examCount = dayActivities.filter(isExamActivity).length;
  const suggestions = [];

  if (messages.length) suggestions.push(...messages);
  suggestions.push("Pendientes vencidas: pueden moverse automaticamente al dia siguiente.");
  if (examCount > 0) suggestions.push(`Examenes detectados: ${examCount}. Se recomienda bloquear estudio previo.`);
  if (timedPending.length >= 3) suggestions.push("Hay 3 tareas seguidas. Conviene insertar un descanso entre bloques.");

  automationList.innerHTML = suggestions
    .map((text, index) => `<article class="automation-item ${index === 0 && messages.length ? "is-warning" : ""}">${text}</article>`)
    .join("");
}

function renderWellbeingPanel() {
  const dayActivities = getSelectedDayActivities();
  const totalTasks = dayActivities.length;
  const totalMinutes = dayActivities.reduce((sum, activity) => sum + getActivityDurationMinutes(activity), 0);
  const freeSlots = getDayFreeSlots(dayActivities);
  const warnings = [];
  let score = 100;

  if (totalTasks > DAILY_TASK_LIMIT) {
    warnings.push(`Carga alta: ${totalTasks} tareas. El limite recomendado es ${DAILY_TASK_LIMIT}.`);
    score -= 25;
  } else {
    warnings.push(`Carga controlada: ${totalTasks}/${DAILY_TASK_LIMIT} tareas recomendadas.`);
  }

  if (totalMinutes >= 360) {
    warnings.push("Recuerda agua, pausas activas y descanso visual: la carga supera 6 horas.");
    score -= 20;
  } else {
    warnings.push("Mantén pausas breves cada 60-90 minutos y agua durante el día.");
  }

  if (!freeSlots.some((slot) => slot.minutes >= 15)) {
    warnings.push("Casi no hay huecos libres. Conviene liberar espacio para evitar sobrecarga.");
    score -= 20;
  }

  wellbeingScore.textContent = String(Math.max(score, 0));
  wellbeingList.innerHTML = warnings
    .map((text, index) => `<article class="wellbeing-item ${index > 0 ? "is-warning" : ""}">${text}</article>`)
    .join("");
}

function renderHistoryPanel() {
  const selectedMood = moods[selectedDate] ?? "";
  moodButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mood === selectedMood);
  });

  const entries = Object.entries(moods);
  if (!entries.length) {
    historyInsightList.innerHTML = `<article class="insight-item">Marca cómo fue tu día y el calendario empezará a detectar tus mejores patrones.</article>`;
    return;
  }

  const weekdayData = new Map();
  entries.forEach(([dateKey, mood]) => {
    const weekday = parseDateKey(dateKey).getDay();
    const value = mood === "great" ? 2 : mood === "okay" ? 1 : 0;
    const current = weekdayData.get(weekday) ?? { total: 0, count: 0 };
    weekdayData.set(weekday, { total: current.total + value, count: current.count + 1 });
  });

  const best = [...weekdayData.entries()]
    .map(([weekday, stats]) => ({ weekday, average: stats.total / stats.count }))
    .sort((a, b) => b.average - a.average)[0];

  const bestLabel = best
    ? ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"][best.weekday]
    : "sin datos";

  historyInsightList.innerHTML = `
    <article class="insight-item">Estado del dia seleccionado: ${selectedMood ? MOOD_LABELS[selectedMood] : "sin registrar"}.</article>
    <article class="insight-item">Tus mejores registros suelen caer en ${bestLabel}.</article>
    <article class="insight-item">Evita horarios muy cargados en dias que terminan con energia baja.</article>
  `;
}

function renderLiveMode() {
  const todayKey = formatDateKey(today);
  if (selectedDate !== todayKey) {
    liveModeList.innerHTML = `<article class="live-item">Selecciona hoy para recibir una recomendacion en tiempo real.</article>`;
    return;
  }

  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  const dayActivities = getSelectedDayActivities();
  const currentSlot = getDayFreeSlots(dayActivities).find((slot) => slot.start <= nowMinutes && slot.end > nowMinutes)
    ?? getDayFreeSlots(dayActivities).find((slot) => slot.start > nowMinutes);
  const pendingUntimed = dayActivities
    .filter((activity) => !activity.time && !activity.allDay && activity.status === "pending")
    .sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.priority] - { high: 0, medium: 1, low: 2 }[b.priority]));

  if (currentSlot && pendingUntimed.length) {
    const task = pendingUntimed.find((activity) => getActivityDurationMinutes(activity) + 10 <= currentSlot.minutes) ?? pendingUntimed[0];
    liveModeList.innerHTML = `<article class="live-item">Tienes ${formatMinutes(currentSlot.minutes)} libres. Te recomiendo avanzar "${task.title}" y dejar 10 min para descansar.</article>`;
    return;
  }

  if (currentSlot) {
    const suggestion = suggestSlotType(currentSlot, dayActivities);
    liveModeList.innerHTML = `<article class="live-item">Ahora tienes ${formatMinutes(currentSlot.minutes)} disponibles. Recomendacion: ${suggestion.label.toLowerCase()}.</article>`;
    return;
  }

  liveModeList.innerHTML = `<article class="live-item">Tu agenda está ocupada ahora. En cuanto cierres el bloque actual, toma una pausa corta.</article>`;
}

function renderCategoryFilter() {
  const categories = new Set(DEFAULT_CATEGORIES);
  activities.forEach((activity) => categories.add(activity.category));

  const currentValue = categoryFilter.value || "all";
  categoryFilter.innerHTML = `<option value="all">Todas</option>`;

  [...categories].sort((a, b) => a.localeCompare(b)).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = [...categoryFilter.options].some((option) => option.value === currentValue)
    ? currentValue
    : "all";
}

function renderApp() {
  viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewMode);
  });
  renderCategoryFilter();
  renderSummary();
  renderCalendar();
  renderUpcoming();
  renderSelectedDate();
  renderCategorySummary();
  renderTemplatesPanel();
  renderWeeklyGoals();
  renderOverdueList();
  renderWeeklyAnalytics();
  renderPlanningPanels();
  renderAutomationPanel();
  renderReplanPanel();
  renderWellbeingPanel();
  renderHistoryPanel();
  renderLiveMode();
  renderSupportMessage();
  renderQuickNote();
  renderAcademicProfile();
  renderSubjectTracker();
  renderSemesterSimulator();
}

function openDialog(activity) {
  editingActivityId = activity.id ?? null;
  dialogTitle.textContent = editingActivityId ? "Editar actividad" : "Nueva actividad";
  deleteActivityBtn.classList.toggle("hidden", !editingActivityId);
  duplicateActivityBtn.classList.toggle("hidden", !editingActivityId);

  activityDateInput.value = activity.date ?? selectedDate ?? formatDateKey(today);
  activityTitleInput.value = activity.title ?? "";
  activityTimeInput.value = activity.time ?? "";
  activityDescriptionInput.value = activity.description ?? "";
  activityLocationInput.value = activity.location ?? "";
  activityDurationInput.value = activity.duration || "";
  activityCategoryInput.value = activity.category ?? "Trabajo";
  activityPriorityInput.value = activity.priority ?? "medium";
  activityStatusInput.value = activity.status ?? "pending";
  activityRecurrenceInput.value = activity.recurrence ?? "none";
  activityRepeatUntilInput.value = activity.repeatUntil ?? "";
  activityAllDayInput.checked = Boolean(activity.allDay);
  activityFavoriteInput.checked = Boolean(activity.favorite);
  activityChecklistInput.value = formatChecklist(activity.checklist ?? []);
  activityTimeInput.disabled = activityAllDayInput.checked;

  activityDialog.showModal();
}

function closeDialog() {
  activityDialog.close();
  activityForm.reset();
  editingActivityId = null;
}

function exportPdf() {
  if (!window.jspdf?.jsPDF) {
    window.alert("La libreria de PDF no esta disponible.");
    return;
  }

  const items = sortActivities(getFilteredActivities());
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const maxWidth = pageWidth - margin * 2;
  let y = 18;

  const ensureSpace = (needed = 12) => {
    if (y + needed <= pageHeight - margin) return;
    doc.addPage();
    y = 18;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Calendario de actividades", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90, 80, 72);
  doc.text(`${periodLabel.textContent}: ${monthLabel.textContent}`, margin, y);
  y += 10;

  if (items.length === 0) {
    doc.setTextColor(46, 36, 26);
    doc.text("No hay actividades para exportar con los filtros actuales.", margin, y);
    doc.save(`calendario-${formatDateKey(today)}.pdf`);
    return;
  }

  items.forEach((activity) => {
    const timeLabel = activity.allDay ? "Todo el dia" : activity.time || "Sin hora";
    const progress = getChecklistProgress(activity);
    const meta = `${activity.category} | ${PRIORITY_LABELS[activity.priority]} | ${STATUS_LABELS[activity.status]}${activity.duration ? ` | ${activity.duration} min` : ""}${progress ? ` | ${progress.done}/${progress.total} subtareas` : ""}`;
    const titleLines = doc.splitTextToSize(activity.title, maxWidth - 6);
    const descLines = activity.description ? doc.splitTextToSize(activity.description, maxWidth - 6) : [];
    const locationLines = activity.location ? doc.splitTextToSize(`Ubicacion: ${activity.location}`, maxWidth - 6) : [];
    const height = 26 + titleLines.length * 6 + descLines.length * 5 + locationLines.length * 5;

    ensureSpace(height);

    doc.setDrawColor(215, 215, 215);
    doc.setFillColor(255, 251, 244);
    doc.roundedRect(margin, y - 4, maxWidth, height, 4, 4, "FD");

    doc.setDrawColor(196, 92, 42);
    doc.setLineWidth(1.2);
    doc.line(margin + 1, y - 3, margin + 1, y - 4 + height - 1);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(122, 104, 88);
    doc.text(`${formatLongDate(activity.occurrenceDate)} | ${timeLabel}`, margin + 5, y + 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(46, 36, 26);
    doc.text(titleLines, margin + 5, y + 9);

    let blockY = y + 9 + titleLines.length * 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(122, 104, 88);
    doc.text(meta, margin + 5, blockY);
    blockY += 6;

    if (locationLines.length > 0) {
      doc.text(locationLines, margin + 5, blockY);
      blockY += locationLines.length * 5;
    }

    if (descLines.length > 0) {
      doc.setTextColor(46, 36, 26);
      doc.text(descLines, margin + 5, blockY);
    }

    y += height + 6;
  });

  doc.save(`calendario-${formatDateKey(today)}.pdf`);
}

function importActivities(event) {
  const [file] = event.target.files ?? [];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!Array.isArray(data)) throw new Error("Formato invalido");
      activities = data.map(normalizeActivity);
      saveActivities();
      currentDayPlan = [];
      renderApp();
    } catch {
      window.alert("No se pudo importar el archivo JSON.");
    } finally {
      importInput.value = "";
    }
  };
  reader.readAsText(file);
}

function clearFilters() {
  filters = {
    search: "",
    category: "all",
    status: "all",
    priority: "all",
    favorite: "all",
  };
  searchInput.value = "";
  categoryFilter.value = "all";
  statusFilter.value = "all";
  priorityFilter.value = "all";
  favoriteFilter.value = "all";
  currentDayPlan = [];
  renderApp();
}

function shiftView(step) {
  if (viewMode === "month") {
    currentView.setMonth(currentView.getMonth() + step);
    selectedDate = formatDateKey(new Date(currentView.getFullYear(), currentView.getMonth(), 1));
    currentDayPlan = [];
    renderApp();
    return;
  }

  const base = parseDateKey(selectedDate);
  const moved = viewMode === "week" ? addDays(base, step * 7) : addDays(base, step);
  selectedDate = formatDateKey(moved);
  currentView.setFullYear(moved.getFullYear(), moved.getMonth(), 1);
  currentDayPlan = [];
  renderApp();
}

function setViewMode(mode) {
  viewMode = mode;
  viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === mode);
  });
  currentDayPlan = [];
  renderApp();
}

function planSelectedDay() {
  currentDayPlan = buildAutomaticPlan();
  renderPlanningPanels();
}

function setMood(mood) {
  moods[selectedDate] = mood;
  saveMoods();
  renderHistoryPanel();
  renderLiveMode();
}

function toggleActivityStatus(id) {
  activities = activities.map((activity) => {
    if (activity.id !== id) return activity;
    return {
      ...activity,
      status: activity.status === "done" ? "pending" : "done",
    };
  });
  saveActivities();
  currentDayPlan = [];
  renderApp();
}

function toggleActivityFavorite(id) {
  activities = activities.map((activity) => {
    if (activity.id !== id) return activity;
    return {
      ...activity,
      favorite: !activity.favorite,
    };
  });
  saveActivities();
  currentDayPlan = [];
  renderApp();
}

function duplicateActivity(activity) {
  const copyDate = activity.occurrenceDate ?? activity.date;
  activities.push(normalizeActivity({
    ...activity,
    id: crypto.randomUUID(),
    date: copyDate,
    recurrence: "none",
    repeatUntil: "",
    title: `${activity.title} (copia)`,
  }));
  selectedDate = copyDate;
  saveActivities();
  currentDayPlan = [];
  renderApp();
}

function upsertActivity(event) {
  event.preventDefault();

  const activity = normalizeActivity({
    id: editingActivityId ?? crypto.randomUUID(),
    date: activityDateInput.value,
    title: activityTitleInput.value.trim(),
    time: activityAllDayInput.checked ? "" : activityTimeInput.value,
    description: activityDescriptionInput.value.trim(),
    location: activityLocationInput.value.trim(),
    duration: Number(activityDurationInput.value || 0),
    category: activityCategoryInput.value,
    priority: activityPriorityInput.value,
    status: activityStatusInput.value,
    recurrence: activityRecurrenceInput.value,
    repeatUntil: activityRepeatUntilInput.value,
    allDay: activityAllDayInput.checked,
    favorite: activityFavoriteInput.checked,
    checklist: parseChecklist(activityChecklistInput.value),
  });

  if (!activity.title) return;

  if (editingActivityId) {
    activities = activities.map((item) => item.id === editingActivityId ? activity : item);
  } else {
    activities.push(activity);
  }

  selectedDate = activity.date;
  saveActivities();
  if (isExamActivity(activity)) {
    applyAutomationRules();
  }
  currentDayPlan = [];
  closeDialog();
  renderApp();
}

function deleteActivity() {
  if (!editingActivityId) return;
  activities = activities.filter((item) => item.id !== editingActivityId);
  saveActivities();
  currentDayPlan = [];
  closeDialog();
  renderApp();
}

document.getElementById("prevMonth").addEventListener("click", () => shiftView(-1));

document.getElementById("nextMonth").addEventListener("click", () => shiftView(1));

document.getElementById("todayBtn").addEventListener("click", () => {
  currentView.setFullYear(today.getFullYear(), today.getMonth(), 1);
  selectedDate = formatDateKey(today);
  currentDayPlan = [];
  renderApp();
});

document.getElementById("newActivityBtn").addEventListener("click", () => {
  openDialog({ date: selectedDate || formatDateKey(today) });
});

document.getElementById("selectedDateAddBtn").addEventListener("click", () => {
  openDialog({ date: selectedDate || formatDateKey(today) });
});

document.getElementById("closeDialogBtn").addEventListener("click", closeDialog);
document.getElementById("cancelDialogBtn").addEventListener("click", closeDialog);
document.getElementById("closeTemplateDialogBtn").addEventListener("click", closeTemplateDialog);
document.getElementById("cancelTemplateDialogBtn").addEventListener("click", closeTemplateDialog);
activityForm.addEventListener("submit", upsertActivity);
templateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCurrentTemplateConfig();
  closeTemplateDialog();
  renderApp();
});
applyTemplateConfigBtn.addEventListener("click", () => {
  const config = saveCurrentTemplateConfig();
  if (!editingTemplateId || !config) return;
  applyTemplate(editingTemplateId, config);
  closeTemplateDialog();
});
deleteActivityBtn.addEventListener("click", deleteActivity);
duplicateActivityBtn.addEventListener("click", () => {
  if (!editingActivityId) return;
  const activity = activities.find((item) => item.id === editingActivityId);
  if (!activity) return;
  duplicateActivity(activity);
  closeDialog();
});
activityAllDayInput.addEventListener("change", () => {
  activityTimeInput.disabled = activityAllDayInput.checked;
  if (activityAllDayInput.checked) activityTimeInput.value = "";
});

searchInput.addEventListener("input", (event) => {
  filters.search = event.target.value.trim().toLowerCase();
  renderApp();
});

categoryFilter.addEventListener("change", (event) => {
  filters.category = event.target.value;
  renderApp();
});

statusFilter.addEventListener("change", (event) => {
  filters.status = event.target.value;
  renderApp();
});

priorityFilter.addEventListener("change", (event) => {
  filters.priority = event.target.value;
  renderApp();
});

favoriteFilter.addEventListener("change", (event) => {
  filters.favorite = event.target.value;
  renderApp();
});

clearFiltersBtn.addEventListener("click", clearFilters);
exportPdfBtn.addEventListener("click", exportPdf);
importBtn.addEventListener("click", () => importInput.click());
importInput.addEventListener("change", importActivities);
planDayBtn.addEventListener("click", planSelectedDay);
runAutomationBtn.addEventListener("click", () => {
  const notes = applyAutomationRules();
  renderApp();
  if (notes.length) {
    automationList.innerHTML = notes.map((note) => `<article class="automation-item is-warning">${note}</article>`).join("");
  }
});
if (replanBtn) {
  replanBtn.addEventListener("click", applyReplanSuggestions);
}
moodButtons.forEach((button) => {
  button.addEventListener("click", () => setMood(button.dataset.mood));
});
quickNoteInput?.addEventListener("input", (event) => {
  quickNotes[selectedDate] = event.target.value;
  saveQuickNotes();
});
academicCareerInput?.addEventListener("input", (event) => {
  academicProfile.career = event.target.value;
  saveAcademicProfile();
});
academicUniversityInput?.addEventListener("input", (event) => {
  academicProfile.university = event.target.value;
  saveAcademicProfile();
});
academicYearInput?.addEventListener("input", (event) => {
  academicProfile.year = event.target.value;
  saveAcademicProfile();
});
subjectTrackerInput?.addEventListener("input", (event) => {
  subjectTrackerRaw = event.target.value;
  saveSubjectTrackerRaw();
  renderSubjectTracker();
});
semesterSubjectsInput?.addEventListener("input", (event) => {
  semesterSimulatorRaw = event.target.value;
  saveSemesterSimulatorRaw();
  renderSemesterSimulator();
});
generateSemesterBtn?.addEventListener("click", generateSemesterPlan);
viewButtons.forEach((button) => {
  button.addEventListener("click", () => setViewMode(button.dataset.view));
});

renderApp();
