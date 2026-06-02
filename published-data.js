window.PUBLISHED_CYBER_DATA = {
  entries: [
    {
      id: "entry-redes-2026-06-01",
      date: "2026-06-01",
      hours: 2.5,
      area: "Redes",
      tools: "Wireshark, TCP/IP",
      studied: "Captura y filtrado de paquetes HTTP y DNS en una red de laboratorio.",
      learned: "Aprendi a diferenciar consultas DNS normales, handshakes TCP y trafico web basico.",
      difficulties: "Al inicio los filtros de Wireshark devolvian demasiado ruido.",
      solutions: "Use filtros por protocolo y direcciones IP para reducir el alcance del analisis.",
      next: "Practicar analisis de trafico sospechoso y documentar indicadores simples."
    },
    {
      id: "entry-linux-2026-05-31",
      date: "2026-05-31",
      hours: 2,
      area: "Linux",
      tools: "Ubuntu, systemctl, chmod",
      studied: "Permisos, usuarios, grupos y administracion basica de servicios.",
      learned: "Comprendi mejor la relacion entre permisos numericos, propietario y grupo.",
      difficulties: "Confundi permisos de archivo con permisos de directorio.",
      solutions: "Hice pruebas creando carpetas, archivos y usuarios temporales.",
      next: "Repasar logs del sistema y permisos especiales."
    }
  ],
  labs: [
    {
      id: "lab-dns-2026-06-01",
      date: "2026-06-01",
      title: "Analisis inicial de trafico DNS",
      objective: "Identificar consultas DNS y relacionarlas con actividad de navegacion.",
      tools: "Wireshark, navegador, entorno local",
      procedure: "Genere trafico controlado, capture paquetes y filtre por dns.",
      results: "Pude observar dominios consultados, respuestas y servidores utilizados.",
      lessons: "El contexto de red es clave antes de marcar una consulta como sospechosa.",
      image: ""
    }
  ],
  projects: [
    {
      id: "project-bitacora-cyber",
      title: "Bitacora Cyber personal",
      status: "Finalizado",
      tech: "HTML, CSS, JavaScript, LocalStorage",
      start: "2026-06-01",
      end: "2026-06-02",
      link: "index.html#diario",
      summary: "Desarrollo de una plataforma personal tipo bitacora tecnica para documentar mi aprendizaje diario en ciberseguridad, mis laboratorios, proyectos, hitos y estadisticas de progreso.",
      objective: "Crear una aplicacion web propia que me permita registrar mi evolucion como estudiante de ciberseguridad y publicar una version de solo lectura para que otras personas puedan ver mi progreso sin editarlo.",
      procedure: "Primero se construyo una pagina base de portafolio. Luego se transformo en una aplicacion con dashboard, bitacora diaria, timeline, laboratorios, proyectos y persistencia con LocalStorage. Despues se separo el modo privado de administracion del modo publico de lectura mediante admin.html, index.html y published-data.js. Finalmente se agrego documentacion descargable para los proyectos.",
      results: "El proyecto quedo como una bitacora funcional: puedo registrar entradas, laboratorios, proyectos e hitos desde un panel privado, exportar los datos publicados y mostrar a visitantes una vista profesional de solo lectura. Tambien se incorporaron fichas tecnicas descargables para documentar cada proyecto.",
      lessons: "Aprendi a organizar una aplicacion web con HTML, CSS y JavaScript puro, usar LocalStorage, separar una vista publica de una vista privada, manejar datos exportables y presentar mi aprendizaje de forma mas clara y verificable."
    }
  ],
  milestones: [
    {
      id: "milestone-start",
      date: "2026-05-20",
      type: "Hito",
      title: "Inicio de ruta de fundamentos en ciberseguridad"
    },
    {
      id: "milestone-first-lab",
      date: "2026-06-01",
      type: "Laboratorio",
      title: "Primer laboratorio documentado con evidencia tecnica"
    }
  ],
  goals: {
    short: [
      "Estudiar al menos 5 dias por semana.",
      "Documentar cada laboratorio con objetivo, procedimiento y resultados.",
      "Reforzar redes, Linux y seguridad web basica."
    ],
    long: [
      "Construir un portafolio tecnico publicable.",
      "Completar una certificacion introductoria.",
      "Desarrollar proyectos propios de automatizacion y defensa."
    ]
  }
};
