window.PUBLISHED_CYBER_DATA = {
  "entries": [
    {
      "id": "76c3a9aa-3d48-4583-8a10-09e038b9098a",
      "date": "2026-06-01",
      "hours": 2.5,
      "area": "Redes",
      "tools": "Wireshark, TCP/IP",
      "studied": "Captura y filtrado de paquetes HTTP y DNS en una red de laboratorio.",
      "learned": "Aprendi a diferenciar consultas DNS normales, handshakes TCP y trafico web basico.",
      "difficulties": "Al inicio los filtros de Wireshark devolvian demasiado ruido.",
      "solutions": "Use filtros por protocolo y direcciones IP para reducir el alcance del analisis.",
      "next": "Practicar analisis de trafico sospechoso y documentar indicadores simples."
    },
    {
      "id": "0df8df15-4a5f-40b7-bd4b-aefb9bb79f28",
      "date": "2026-05-31",
      "hours": 2,
      "area": "Linux",
      "tools": "Ubuntu, systemctl, chmod",
      "studied": "Permisos, usuarios, grupos y administracion basica de servicios.",
      "learned": "Comprendi mejor la relacion entre permisos numericos, propietario y grupo.",
      "difficulties": "Confundi permisos de archivo con permisos de directorio.",
      "solutions": "Hice pruebas creando carpetas, archivos y usuarios temporales.",
      "next": "Repasar logs del sistema y permisos especiales."
    },
    {
      "id": "fdc8f2b0-ebc4-4c73-a035-50714e00e216",
      "date": "2026-06-01",
      "hours": 1.5,
      "area": "Redes",
      "tools": "Nmap",
      "studied": "Puertos, Servicios y Enumeración Básica con Nmap",
      "learned": "Aprendí a analizar puertos abiertos y a relacionarlos con los servicios que ofrece\nPuerto\tServicio\n22\tSSH\n53\tDNS\n80\tHTTP\n443\tHTTPS\n3389\tRDP\nempece a hacer enumeración básica de servicios, que es una habilidad fundamental en:\n\nNmap\nPentesting\nAnálisis de redes\nCiberseguridad defensiva",
      "difficulties": "No conocía la relación de los puertos, con la comunicación de los distintos servicios que corren en cada uno de ellos",
      "solutions": "Gracias a OpenAI y diferentes fuentes, pude unir las piezas como si fuera rompecabezas",
      "next": "para este 02/06 aprenderé sobre el modelo OSI"
    }
  ],
  "labs": [
    {
      "id": "3368da0d-096e-42b9-9787-4b2caa478211",
      "date": "2026-06-01",
      "title": "Analisis inicial de trafico DNS",
      "objective": "Identificar consultas DNS y relacionarlas con actividad de navegacion.",
      "tools": "Wireshark, navegador, entorno local",
      "procedure": "Genere trafico controlado, capture paquetes y filtre por dns.",
      "results": "Pude observar dominios consultados, respuestas y servidores utilizados.",
      "lessons": "El contexto de red es clave antes de marcar una consulta como sospechosa.",
      "image": ""
    }
  ],
  "projects": [
    {
      "id": "02cd65e2-2c93-4698-863d-5dda5cc51f83",
      "title": "Bitacora Cyber personal",
      "status": "En progreso",
      "tech": "HTML, CSS, JavaScript, LocalStorage",
      "start": "2026-06-01",
      "end": "",
      "link": "",
      "summary": "Aplicacion personal para registrar avances diarios, laboratorios y proyectos de ciberseguridad.",
      "objective": "Construir una bitacora publica de solo lectura y un panel privado para documentar progreso.",
      "procedure": "Se desarrollo una interfaz con HTML, CSS y JavaScript, usando LocalStorage para la version privada y un archivo published-data.js para publicar avances.",
      "results": "La pagina permite mostrar progreso, timeline, laboratorios y proyectos sin que visitantes externos puedan editar.",
      "lessons": "Separar el modo publico del modo administrador mejora la claridad y evita publicar controles de edicion."
    }
  ],
  "milestones": [
    {
      "id": "d9464d2d-30fc-4511-a8ff-46b76a3317ee",
      "date": "2026-05-20",
      "type": "Hito",
      "title": "Inicio de ruta de fundamentos en ciberseguridad"
    },
    {
      "id": "17d8d8ad-f108-41e4-b4bc-32a77e907b30",
      "date": "2026-06-01",
      "type": "Laboratorio",
      "title": "Primer laboratorio documentado con evidencia tecnica"
    }
  ],
  "goals": {
    "short": [
      "Estudiar al menos 5 dias por semana.",
      "Documentar cada laboratorio con objetivo, procedimiento y resultados.",
      "Reforzar redes, Linux y seguridad web basica."
    ],
    "long": [
      "Construir un portafolio tecnico publicable.",
      "Completar una certificacion introductoria.",
      "Desarrollar proyectos propios de automatizacion y defensa."
    ]
  }
};
