const STORAGE_KEY = "cyber-learning-log-v1";
const APP_MODE = document.body.dataset.mode || "public";
const isAdmin = APP_MODE === "admin";

// Areas base para clasificar estudio, calcular progreso y alimentar filtros.
const AREAS = [
  "Redes",
  "Linux",
  "Windows Server",
  "Active Directory",
  "Seguridad Web",
  "Python",
  "Forense",
  "Cloud",
];

// Datos iniciales: sirven como guia y se reemplazan automaticamente al guardar cambios.
const demoData = {
  entries: [
    {
      id: crypto.randomUUID(),
      date: "2026-06-01",
      hours: 2.5,
      area: "Redes",
      tools: "Wireshark, TCP/IP",
      studied: "Captura y filtrado de paquetes HTTP y DNS en una red de laboratorio.",
      learned: "Aprendi a diferenciar consultas DNS normales, handshakes TCP y trafico web basico.",
      difficulties: "Al inicio los filtros de Wireshark devolvian demasiado ruido.",
      solutions: "Use filtros por protocolo y direcciones IP para reducir el alcance del analisis.",
      next: "Practicar analisis de trafico sospechoso y documentar indicadores simples.",
    },
    {
      id: crypto.randomUUID(),
      date: "2026-05-31",
      hours: 2,
      area: "Linux",
      tools: "Ubuntu, systemctl, chmod",
      studied: "Permisos, usuarios, grupos y administracion basica de servicios.",
      learned: "Comprendi mejor la relacion entre permisos numericos, propietario y grupo.",
      difficulties: "Confundi permisos de archivo con permisos de directorio.",
      solutions: "Hice pruebas creando carpetas, archivos y usuarios temporales.",
      next: "Repasar logs del sistema y permisos especiales.",
    },
  ],
  labs: [
    {
      id: crypto.randomUUID(),
      date: "2026-06-01",
      title: "Analisis inicial de trafico DNS",
      objective: "Identificar consultas DNS y relacionarlas con actividad de navegacion.",
      tools: "Wireshark, navegador, entorno local",
      procedure: "Genere trafico controlado, capture paquetes y filtre por dns.",
      results: "Pude observar dominios consultados, respuestas y servidores utilizados.",
      lessons: "El contexto de red es clave antes de marcar una consulta como sospechosa.",
      image: "",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Bitacora Cyber personal",
      status: "En progreso",
      tech: "HTML, CSS, JavaScript, LocalStorage",
      start: "2026-06-01",
      end: "",
    },
  ],
  milestones: [
    {
      id: crypto.randomUUID(),
      date: "2026-05-20",
      type: "Hito",
      title: "Inicio de ruta de fundamentos en ciberseguridad",
    },
    {
      id: crypto.randomUUID(),
      date: "2026-06-01",
      type: "Laboratorio",
      title: "Primer laboratorio documentado con evidencia tecnica",
    },
  ],
  goals: {
    short: [
      "Estudiar al menos 5 dias por semana.",
      "Documentar cada laboratorio con objetivo, procedimiento y resultados.",
      "Reforzar redes, Linux y seguridad web basica.",
    ],
    long: [
      "Construir un portafolio tecnico publicable.",
      "Completar una certificacion introductoria.",
      "Desarrollar proyectos propios de automatizacion y defensa.",
    ],
  },
};

let state = loadState();

// Referencias centrales del DOM para mantener el renderizado organizado.
const els = {
  areaProgress: document.querySelector("#area-progress"),
  topAreas: document.querySelector("#top-areas"),
  techTags: document.querySelector("#tech-tags"),
  shortGoals: document.querySelector("#short-goals"),
  longGoals: document.querySelector("#long-goals"),
  entriesList: document.querySelector("#entries-list"),
  labsList: document.querySelector("#labs-list"),
  projectsList: document.querySelector("#projects-list"),
  timelineList: document.querySelector("#timeline-list"),
  entryForm: document.querySelector("#entry-form"),
  labForm: document.querySelector("#lab-form"),
  projectForm: document.querySelector("#project-form"),
  milestoneForm: document.querySelector("#milestone-form"),
  entryArea: document.querySelector("#entry-area"),
  entryFilter: document.querySelector("#entry-filter"),
};

function loadState() {
  if (!isAdmin) return structuredClone(window.PUBLISHED_CYBER_DATA || demoData);

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(demoData);

  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(demoData);
  }
}

function saveState() {
  if (!isAdmin) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function byDateDesc(a, b) {
  return new Date(b.date || b.start) - new Date(a.date || a.start);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function splitTags(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Las estadisticas se derivan siempre de las entradas guardadas.
function sumHours() {
  return state.entries.reduce((total, entry) => total + Number(entry.hours || 0), 0);
}

// Racha simple: cuenta hacia atras desde hoy mientras existan entradas diarias.
function countStudyStreak() {
  const studiedDays = new Set(state.entries.map((entry) => entry.date));
  if (!studiedDays.size) return 0;

  const latestDate = [...studiedDays].sort().at(-1);
  let cursor = new Date(`${latestDate}T00:00:00`);
  let streak = 0;

  while (studiedDays.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function areaHours() {
  return AREAS.map((area) => ({
    area,
    hours: state.entries
      .filter((entry) => entry.area === area)
      .reduce((total, entry) => total + Number(entry.hours || 0), 0),
  }));
}

// Cada 40 horas en un area equivalen a 100% de avance visual.
function areaLevel(hours) {
  return Math.min(100, Math.round((hours / 40) * 100));
}

function setTodayDefaults() {
  if (!isAdmin) return;
  const today = new Date().toISOString().slice(0, 10);
  document.querySelector("#entry-date").value ||= today;
  document.querySelector("#lab-date").value ||= today;
  document.querySelector("#milestone-date").value ||= today;
  document.querySelector("#project-start").value ||= today;
}

function populateSelects() {
  const areaOptions = AREAS.map((area) => `<option value="${area}">${area}</option>`).join("");
  if (els.entryArea) els.entryArea.innerHTML = areaOptions;
  els.entryFilter.innerHTML = `<option value="all">Todas las areas</option>${areaOptions}`;
}

function renderStats() {
  document.querySelector("#stat-streak").textContent = countStudyStreak();
  document.querySelector("#stat-hours").textContent = sumHours().toFixed(1).replace(".0", "");
  document.querySelector("#stat-labs").textContent = state.labs.length;
  document.querySelector("#stat-projects").textContent = state.projects.filter((project) => project.status === "Finalizado").length;
}

function renderDashboard() {
  const areas = areaHours();
  const maxWorked = Math.max(...areas.map((item) => item.hours), 1);

  els.areaProgress.innerHTML = areas
    .map((item) => {
      const level = areaLevel(item.hours);
      return `
        <div class="area-row">
          <div class="area-meta">
            <span>${item.area}</span>
            <span>${level}% | ${item.hours.toFixed(1).replace(".0", "")}h</span>
          </div>
          <div class="bar"><span style="width: ${level}%"></span></div>
        </div>
      `;
    })
    .join("");

  const topAreas = [...areas].sort((a, b) => b.hours - a.hours).slice(0, 5);
  els.topAreas.innerHTML = topAreas.some((item) => item.hours > 0)
    ? topAreas
        .map((item) => `
          <div class="top-area-item">
            <div>
              <strong>${item.area}</strong>
              <div class="bar"><span style="width: ${(item.hours / maxWorked) * 100}%"></span></div>
            </div>
            <small>${item.hours.toFixed(1).replace(".0", "")}h</small>
          </div>
        `)
        .join("")
    : `<div class="empty-state">Todavia no hay horas registradas.</div>`;

  const techs = new Set();
  state.entries.forEach((entry) => splitTags(entry.tools).forEach((tag) => techs.add(tag)));
  state.labs.forEach((lab) => splitTags(lab.tools).forEach((tag) => techs.add(tag)));
  state.projects.forEach((project) => splitTags(project.tech).forEach((tag) => techs.add(tag)));
  els.techTags.innerHTML = [...techs].length
    ? [...techs].map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")
    : `<div class="empty-state">Agrega herramientas o tecnologias en tus entradas.</div>`;

  els.shortGoals.innerHTML = state.goals.short.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("");
  els.longGoals.innerHTML = state.goals.long.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("");
}

function renderEntries() {
  const selectedArea = els.entryFilter.value;
  const entries = [...state.entries]
    .filter((entry) => selectedArea === "all" || entry.area === selectedArea)
    .sort(byDateDesc);

  els.entriesList.innerHTML = entries.length
    ? entries
        .map((entry) => `
          <article class="entry-card">
            <header>
              <div>
                <span class="tag">${entry.area}</span>
                <h3>${formatDate(entry.date)} | ${Number(entry.hours || 0)}h</h3>
                <small>${escapeHtml(entry.tools || "Sin herramientas registradas")}</small>
              </div>
              ${actionsMarkup(entry.id, "entry")}
            </header>
            ${entrySection("Que estudie", entry.studied)}
            ${entrySection("Que aprendi", entry.learned)}
            ${entrySection("Dificultades", entry.difficulties)}
            ${entrySection("Solucion", entry.solutions)}
            ${entrySection("Proximos pasos", entry.next)}
          </article>
        `)
        .join("")
    : `<div class="empty-state">No hay entradas para este filtro.</div>`;
}

function entrySection(title, value) {
  if (!value) return "";
  return `<div class="entry-section"><strong>${title}</strong><p>${escapeHtml(value)}</p></div>`;
}

function actionsMarkup(id, type) {
  if (!isAdmin) return "";

  return `
    <div class="item-actions">
      <button class="ghost-button edit-button" data-type="${type}" data-id="${id}" type="button">Editar</button>
      <button class="danger-button delete-button" data-type="${type}" data-id="${id}" type="button">Eliminar</button>
    </div>
  `;
}

function renderLabs() {
  const labs = [...state.labs].sort(byDateDesc);
  els.labsList.innerHTML = labs.length
    ? labs
        .map((lab) => `
          <article class="lab-card">
            <header>
              <div>
                <span class="tag">Laboratorio</span>
                <h3>${escapeHtml(lab.title)}</h3>
                <small>${formatDate(lab.date)} | ${escapeHtml(lab.tools || "Sin herramientas")}</small>
              </div>
              ${actionsMarkup(lab.id, "lab")}
            </header>
            ${entrySection("Objetivo", lab.objective)}
            ${entrySection("Procedimiento", lab.procedure)}
            ${entrySection("Resultados", lab.results)}
            ${entrySection("Lecciones aprendidas", lab.lessons)}
            ${lab.image ? `<img class="lab-image" src="${lab.image}" alt="Captura del laboratorio ${escapeHtml(lab.title)}" />` : ""}
          </article>
        `)
        .join("")
    : `<div class="empty-state">Aun no hay laboratorios documentados.</div>`;
}

function renderProjects() {
  const projects = [...state.projects].sort((a, b) => new Date(b.start) - new Date(a.start));
  els.projectsList.innerHTML = projects.length
    ? projects
        .map((project) => `
          <article class="project-card">
            <div>
              <span class="status-pill">${project.status}</span>
              <h3>${escapeHtml(project.title)}</h3>
              <p>${escapeHtml(project.tech || "Tecnologias por definir")}</p>
              <small>${formatDate(project.start)}${project.end ? ` - ${formatDate(project.end)}` : " - En curso"}</small>
            </div>
            ${actionsMarkup(project.id, "project")}
          </article>
        `)
        .join("")
    : `<div class="empty-state">Registra tu primer proyecto tecnico.</div>`;
}

function renderTimeline() {
  const automaticItems = [
    ...state.labs.map((lab) => ({ id: `lab-${lab.id}`, date: lab.date, type: "Laboratorio", title: lab.title })),
    ...state.projects
      .filter((project) => project.status === "Finalizado")
      .map((project) => ({ id: `project-${project.id}`, date: project.end || project.start, type: "Proyecto", title: project.title })),
  ];

  const items = [...state.milestones, ...automaticItems].sort(byDateDesc);
  els.timelineList.innerHTML = items.length
    ? items
        .map((item) => `
          <article class="timeline-item">
            <div class="timeline-date">${formatDate(item.date)}</div>
            <div>
              <span class="tag">${item.type}</span>
              <h3>${escapeHtml(item.title)}</h3>
            </div>
            ${String(item.id).startsWith("lab-") || String(item.id).startsWith("project-") ? "" : actionsMarkup(item.id, "milestone")}
          </article>
        `)
        .join("")
    : `<div class="empty-state">Tu linea de tiempo aparecera aqui.</div>`;
}

// Renderiza todo lo que cambia cuando se agrega, edita o elimina informacion.
function renderAll() {
  renderStats();
  renderDashboard();
  renderEntries();
  renderLabs();
  renderProjects();
  renderTimeline();
}

function getFormData(formType) {
  if (formType === "entry") {
    return {
      id: document.querySelector("#entry-id").value || crypto.randomUUID(),
      date: document.querySelector("#entry-date").value,
      hours: Number(document.querySelector("#entry-hours").value),
      area: document.querySelector("#entry-area").value,
      tools: document.querySelector("#entry-tools").value.trim(),
      studied: document.querySelector("#entry-studied").value.trim(),
      learned: document.querySelector("#entry-learned").value.trim(),
      difficulties: document.querySelector("#entry-difficulties").value.trim(),
      solutions: document.querySelector("#entry-solutions").value.trim(),
      next: document.querySelector("#entry-next").value.trim(),
    };
  }

  if (formType === "project") {
    return {
      id: document.querySelector("#project-id").value || crypto.randomUUID(),
      title: document.querySelector("#project-title").value.trim(),
      status: document.querySelector("#project-status").value,
      tech: document.querySelector("#project-tech").value.trim(),
      start: document.querySelector("#project-start").value,
      end: document.querySelector("#project-end").value,
    };
  }

  return null;
}

async function getLabFormData() {
  const imageInput = document.querySelector("#lab-image");
  const existing = state.labs.find((lab) => lab.id === document.querySelector("#lab-id").value);

  return {
    id: document.querySelector("#lab-id").value || crypto.randomUUID(),
    date: document.querySelector("#lab-date").value,
    title: document.querySelector("#lab-title").value.trim(),
    objective: document.querySelector("#lab-objective").value.trim(),
    tools: document.querySelector("#lab-tools").value.trim(),
    procedure: document.querySelector("#lab-procedure").value.trim(),
    results: document.querySelector("#lab-results").value.trim(),
    lessons: document.querySelector("#lab-lessons").value.trim(),
    image: imageInput.files[0] ? await fileToDataUrl(imageInput.files[0]) : existing?.image || "",
  };
}

// Convierte capturas adjuntas en Data URL para persistirlas en LocalStorage.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Inserta o actualiza registros usando el mismo id.
function upsert(collection, item) {
  const index = collection.findIndex((current) => current.id === item.id);
  if (index >= 0) {
    collection[index] = item;
  } else {
    collection.push(item);
  }
}

function resetForm(form, idSelector) {
  form.reset();
  document.querySelector(idSelector).value = "";
  setTodayDefaults();
}

// Carga un registro existente en su formulario correspondiente.
function editItem(type, id) {
  if (type === "entry") {
    const entry = state.entries.find((item) => item.id === id);
    if (!entry) return;
    document.querySelector("#entry-id").value = entry.id;
    document.querySelector("#entry-date").value = entry.date;
    document.querySelector("#entry-hours").value = entry.hours;
    document.querySelector("#entry-area").value = entry.area;
    document.querySelector("#entry-tools").value = entry.tools;
    document.querySelector("#entry-studied").value = entry.studied;
    document.querySelector("#entry-learned").value = entry.learned;
    document.querySelector("#entry-difficulties").value = entry.difficulties;
    document.querySelector("#entry-solutions").value = entry.solutions;
    document.querySelector("#entry-next").value = entry.next;
    document.querySelector("#diario").scrollIntoView({ behavior: "smooth" });
  }

  if (type === "lab") {
    const lab = state.labs.find((item) => item.id === id);
    if (!lab) return;
    document.querySelector("#lab-id").value = lab.id;
    document.querySelector("#lab-date").value = lab.date;
    document.querySelector("#lab-title").value = lab.title;
    document.querySelector("#lab-objective").value = lab.objective;
    document.querySelector("#lab-tools").value = lab.tools;
    document.querySelector("#lab-procedure").value = lab.procedure;
    document.querySelector("#lab-results").value = lab.results;
    document.querySelector("#lab-lessons").value = lab.lessons;
    document.querySelector("#labs").scrollIntoView({ behavior: "smooth" });
  }

  if (type === "project") {
    const project = state.projects.find((item) => item.id === id);
    if (!project) return;
    document.querySelector("#project-id").value = project.id;
    document.querySelector("#project-title").value = project.title;
    document.querySelector("#project-status").value = project.status;
    document.querySelector("#project-tech").value = project.tech;
    document.querySelector("#project-start").value = project.start;
    document.querySelector("#project-end").value = project.end;
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  }

  if (type === "milestone") {
    const milestone = state.milestones.find((item) => item.id === id);
    if (!milestone) return;
    document.querySelector("#milestone-date").value = milestone.date;
    document.querySelector("#milestone-type").value = milestone.type;
    document.querySelector("#milestone-title").value = milestone.title;
    state.milestones = state.milestones.filter((item) => item.id !== id);
    saveState();
    renderAll();
  }
}

// Eliminacion directa para mantener la experiencia fluida en una app local.
function deleteItem(type, id) {
  const collectionName = {
    entry: "entries",
    lab: "labs",
    project: "projects",
    milestone: "milestones",
  }[type];

  state[collectionName] = state[collectionName].filter((item) => item.id !== id);
  saveState();
  renderAll();
}

// Punto unico para conectar formularios, filtros y acciones de cada tarjeta.
function bindEvents() {
  if (!isAdmin) return;

  els.entryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    upsert(state.entries, getFormData("entry"));
    saveState();
    resetForm(els.entryForm, "#entry-id");
    renderAll();
  });

  els.labForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    upsert(state.labs, await getLabFormData());
    saveState();
    resetForm(els.labForm, "#lab-id");
    renderAll();
  });

  els.projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    upsert(state.projects, getFormData("project"));
    saveState();
    resetForm(els.projectForm, "#project-id");
    renderAll();
  });

  els.milestoneForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.milestones.push({
      id: crypto.randomUUID(),
      date: document.querySelector("#milestone-date").value,
      type: document.querySelector("#milestone-type").value,
      title: document.querySelector("#milestone-title").value.trim(),
    });
    saveState();
    els.milestoneForm.reset();
    setTodayDefaults();
    renderAll();
  });

  document.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit-button");
    const deleteButton = event.target.closest(".delete-button");
    if (editButton) editItem(editButton.dataset.type, editButton.dataset.id);
    if (deleteButton) deleteItem(deleteButton.dataset.type, deleteButton.dataset.id);
  });

  els.entryFilter.addEventListener("change", renderEntries);
  document.querySelector("#cancel-entry-edit").addEventListener("click", () => resetForm(els.entryForm, "#entry-id"));
  document.querySelector("#cancel-lab-edit").addEventListener("click", () => resetForm(els.labForm, "#lab-id"));
  document.querySelector("#reset-demo").addEventListener("click", () => {
    if (!confirm("Esto reemplazara los datos locales por datos de ejemplo.")) return;
    state = structuredClone(demoData);
    saveState();
    renderAll();
    setTodayDefaults();
  });

  document.querySelector("#export-data").addEventListener("click", exportPublishedData);
}

function exportPublishedData() {
  const content = `window.PUBLISHED_CYBER_DATA = ${JSON.stringify(state, null, 2)};\n`;
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "published-data.js";
  link.click();
  URL.revokeObjectURL(url);
}

populateSelects();
setTodayDefaults();
bindEvents();
renderAll();
