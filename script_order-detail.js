const fs = require('fs');
const os = require('os');
const path = require('path');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStartAndFinishDates(year, month) {
    const startDay = getRandomInt(1, 28); // Día inicial
    const finishDay = getRandomInt(startDay, 28); // Día final igual o posterior al día inicial

    const startDate = `${month}/${startDay.toString().padStart(2, '0')}/${year}`;
    const finishDate = `${month}/${finishDay.toString().padStart(2, '0')}/${year}`;

    return { startDate, finishDate };
}

function getRandomDateBetween(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const day = randomDate.getDate().toString().padStart(2, '0');
    const year = randomDate.getFullYear();
    
    return `${month}/${day}/${year}`;
}

function generateRecords(clientFk, professionalFks, orderFkRange, year, coinsuranceRange, requirements) {
    const records = [];
    const { min, max } = orderFkRange

    for (let order = min; order <= max; order++) {
        const randomProfessionalFk = Math.random() > 0.5 
            ? professionalFks[getRandomInt(0, professionalFks.length - 1)]
            : null; // 50% de probabilidad de ser null

        const month = getRandomInt(1, 12).toString().padStart(2, '0'); // Genera un mes aleatorio

        const { startDate, finishDate } = generateStartAndFinishDates(year, month);

        const record = {
            client_fk: clientFk,
            updated_by: clientFk, // Se puede cambiar si necesitas un rango diferente
            order_fk: order,
            professional_fk: randomProfessionalFk,
            start_date: startDate,
            finish_date: finishDate,
            coinsurance: getRandomInt(coinsuranceRange.min, coinsuranceRange.max),
            started_at: getRandomDateBetween(startDate, finishDate),
            requirements: requirements[getRandomInt(0, requirements.length - 1)]
        };

        records.push(record);
    }

    return records;
}

function saveRecordsToFile(records) {
    const filePath = './temp_combinations.csv';
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf-8');
    console.log(`Records saved to ${filePath}`);
}

// Configuración del script
const clientFk = 4; // Cambia el valor según sea necesario
const professionalFks = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // Array con las distintas FK de profesionales
const orderFkRange = { min: 167, max: 216 }; // Rango para order_fk
const year = 2024; // Año para las fechas
const coinsuranceRange = { min: 1000, max: 5000 }; // Rango para coinsurance
const requirements = [
    "Solo profesional masculino",
    "Solo profesional femenino",
    "Asistencia después del almuerzo",
    "Asistencia antes del desayuno",
    "Cambio de profesional cada semana",
    "Solo profesional con experiencia en geriatría",
    "Preferencia por profesional bilingüe",
    "Servicio en horarios vespertinos",
    "Profesional con experiencia en manejo de pacientes con demencia",
    "Profesional no fumador",
    "Asistencia los fines de semana",
    "Profesional que hable lengua de señas",
    "Asistencia diaria por la mañana",
    "Solo profesional con certificación en cuidados paliativos",
    "Profesional con experiencia en cuidados postoperatorios",
    "Cambio de profesional solo si es necesario",
    "Asistencia en días alternos",
    "Asistencia dos veces al día",
    "Solo profesional que viva en el mismo barrio",
    "Asistencia los días festivos",
    "Asistencia en horario nocturno",
    "Solo profesional con experiencia en fisioterapia",
    "Profesional con experiencia en pacientes con movilidad reducida",
    "Solo profesional con referencias comprobables",
    "Asistencia a partir de las 9 AM",
    "Asistencia antes de las 8 AM",
    "Profesional que pueda asistir con mascota terapéutica",
    "Asistencia los días laborables",
    "Profesional que tenga experiencia en manejo de dolor crónico",
    "Profesional que ofrezca asistencia espiritual",
    "Solo profesional que trabaje en pareja",
    "Asistencia a las 7 PM en adelante",
    "Solo profesional con experiencia en cuidado de niños",
    "Profesional con experiencia en administración de medicamentos intravenosos",
    "Asistencia los miércoles por la tarde",
    "Solo profesional con más de 5 años de experiencia",
    "Asistencia cada tres días",
    "Profesional con conocimiento en dietas especiales",
    "Solo profesional que pueda ofrecer soporte emocional",
    "Asistencia el primer lunes de cada mes",
    "Profesional que no use perfumes",
    "Asistencia con equipo médico propio",
    "Solo profesional con conocimiento en terapias alternativas",
    "Profesional que pueda realizar tareas ligeras del hogar",
    "Asistencia después de las 4 PM",
    "Asistencia en horarios flexibles",
    "Solo profesional que pueda conducir",
    "Asistencia en fines de semana alternos",
    "Profesional que pueda ayudar en ejercicios de rehabilitación",
    "Asistencia solo en emergencias",
    "Solo profesional que sea enfermero titulado",
    "Asistencia el tercer viernes de cada mes",
    "Profesional que pueda hacer seguimiento telefónico",
    "Solo profesional con habilidades de comunicación avanzada",
    "Asistencia solo durante el día",
    "Profesional con experiencia en pacientes pediátricos",
    "Asistencia con uso de uniforme",
    "Solo profesional que use transporte público",
    "Asistencia una vez al mes",
    "Profesional con conocimiento en cuidados postparto",
    "Solo profesional con experiencia en manejo de dispositivos médicos",
    "Asistencia por dos horas máximo",
    "Profesional que pueda coordinar con médicos tratantes",
    "Asistencia en la noche solo si es urgente",
    "Solo profesional que pueda realizar visitas breves",
    "Profesional con experiencia en atención de emergencias",
    "Asistencia los martes y jueves",
    "Solo profesional con disponibilidad completa",
    "Asistencia durante la tarde solo si es necesario",
    "Solo profesional con conocimientos en primeros auxilios",
    "Asistencia una vez por semana",
    "Profesional con experiencia en geriatría",
    "Solo profesional que pueda ofrecer soporte psicológico",
    "Asistencia con tiempo de preparación previo",
    "Profesional que pueda realizar consultas virtuales",
    "Asistencia con uso de guantes y mascarilla",
    "Solo profesional que pueda coordinar con familiares",
    "Asistencia en días consecutivos",
    "Profesional que pueda realizar tareas administrativas",
    "Asistencia en el mismo horario cada día",
    "Solo profesional con habilidad para manejar situaciones difíciles",
    "Asistencia los lunes y miércoles por la mañana",
    "Solo profesional con experiencia en manejo de pacientes oncológicos",
    "Asistencia una vez al día durante tres días",
    "Profesional que pueda realizar seguimiento de medicación",
    "Solo profesional con experiencia en tratamientos paliativos",
    "Asistencia solo en horario laboral",
    "Profesional con experiencia en atención domiciliaria prolongada",
    "Solo profesional con habilidad para manejar pacientes con Alzheimer",
    "Asistencia de emergencia las 24 horas",
    "Solo profesional con conocimiento en nutrición clínica",
    "Asistencia de lunes a viernes",
    "Profesional con experiencia en pacientes con necesidades especiales",
    "Solo profesional que pueda realizar visitas fuera de horario",
    "Asistencia a primera hora de la mañana",
    "Solo profesional con experiencia en pacientes críticos",
    "Asistencia con evaluación semanal",
    "Solo profesional con experiencia en enfermedades respiratorias",
    "Asistencia con supervisión de actividades diarias",
    "Profesional que pueda ofrecer apoyo en tareas diarias",
]; // Array de requerimientos

const records = generateRecords(clientFk, professionalFks, orderFkRange, year, coinsuranceRange, requirements);
saveRecordsToFile(records);
