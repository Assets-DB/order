const fs = require('fs');

// Static client_fk
const client_fk = 4; // Cambia este valor al número específico que desees

// Ranges for company_fk and corresponding treatment_fk
const companyTreatmentMap = {
    25: { min: 17, max: 21 },
    26: { min: 17, max: 21 },
    27: { min: 17, max: 21 },
    28: { min: 17, max: 21 },
    29: { min: 17, max: 21 },
    30: { min: 17, max: 21 },
    31: { min: 17, max: 21 },
    32: { min: 17, max: 21 },
    33: { min: 17, max: 21 },
};

// Mapping of patient_fk to company_fk
const patientCompanyMap = {
    32: 32,
    33: 33,
    34: 25,
    35: 26,
    36: 27,
    37: 28,
    38: 29,
    39: 30,
    40: 31,
    41: 32,
};

// Array of diagnostics
const diagnostics = [
    "Insuficiencia cardíaca congestiva",
    "Neumonía adquirida en la comunidad",
    "Enfermedad pulmonar obstructiva crónica (EPOC)",
    "Diabetes mellitus tipo 2",
    "Hipertensión arterial",
    "Insuficiencia renal crónica",
    "Accidente cerebrovascular (ACV)",
    "Enfermedad de Alzheimer",
    "Parkinsonismo",
    "Esclerosis múltiple",
    "Fractura de cadera",
    "Osteoporosis con fractura vertebral",
    "Artritis reumatoide",
    "Ulcera por presión",
    "Insuficiencia respiratoria crónica",
    "Asma bronquial",
    "Infección del tracto urinario",
    "Anemia ferropénica",
    "Cirrosis hepática",
    "Demencia senil",
    "Cáncer de pulmón en estadio avanzado",
    "Cáncer de mama metastásico",
    "Cáncer colorrectal avanzado",
    "Cáncer de próstata avanzado",
    "Leucemia linfocítica crónica",
    "Mieloma múltiple",
    "Linfoma no Hodgkin",
    "Enfermedad de Crohn",
    "Colitis ulcerosa",
    "Insuficiencia hepática",
    "Fibrosis quística",
    "Síndrome de inmunodeficiencia adquirida (SIDA)",
    "Enfermedad pulmonar intersticial",
    "Hipotiroidismo",
    "Hipertiroidismo",
    "Enfermedad de Addison",
    "Enfermedad de Cushing",
    "Lupus eritematoso sistémico",
    "Polimiositis",
    "Dermatomiositis",
    "Enfermedad de Huntington",
    "Distrofia muscular de Duchenne",
    "Miastenia gravis",
    "Amiloidosis",
    "Polineuropatía",
    "Neuropatía diabética",
    "Síndrome de Guillain-Barré",
    "Esclerodermia",
    "Trastorno bipolar",
    "Depresión mayor",
    "Esquizofrenia",
    "Trastorno de ansiedad generalizada",
    "Trastorno obsesivo-compulsivo (TOC)",
    "Insuficiencia pancreática",
    "Colecistitis aguda",
    "Pancreatitis crónica",
    "Hepatitis crónica",
    "Endocarditis infecciosa",
    "Fibrilación auricular",
    "Tromboembolismo pulmonar",
    "Hipertensión pulmonar",
    "Enfermedad de Paget",
    "Síndrome de Marfan",
    "Hemofilia A",
    "Hemofilia B",
    "Trombocitopenia inmune",
    "Anemia aplásica",
    "Síndrome nefrótico",
    "Glomerulonefritis",
    "Pielonefritis crónica",
    "Insuficiencia suprarrenal",
    "Síndrome de Sjögren",
    "Enfermedad de Wilson",
    "Hemocromatosis",
    "Atrofia multisistémica",
    "Hipoglucemia severa",
    "Síndrome de abstinencia alcohólica",
    "Septicemia",
    "Peritonitis",
    "Encefalopatía hepática",
    "Cetoacidosis diabética",
    "Osteomielitis",
    "Endometriosis",
    "Prostatitis crónica",
    "Enfermedad renal poliquística",
    "Enfermedad de Gaucher",
    "Enfermedad de Fabry",
    "Cistinuria",
    "Hiperplasia suprarrenal congénita",
    "Trastorno de la personalidad borderline",
    "Trastorno de estrés postraumático (TEPT)",
    "Síndrome de Down",
    "Síndrome de Turner",
    "Síndrome de Klinefelter",
    "Fibromialgia",
    "Síndrome de fatiga crónica",
    "Neuralgia del trigémino",
    "Migraña crónica",
    "Síndrome de intestino irritable",
    "Hepatopatía alcohólica",
];

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate combinations
function generateCombinations(client_fk, companyTreatmentMap, patientCompanyMap, diagnostics) {
    const combinations = [];

    Object.keys(patientCompanyMap).forEach(patient_fk => {
        
        const company_fk = patientCompanyMap[patient_fk];
        const { min, max } = companyTreatmentMap[company_fk];
        for (let treatment_fk = min; treatment_fk <= max; treatment_fk++) {
            const randomValue = getRandomNumber(1, 7);
            const randomDiagnostic = diagnostics[getRandomNumber(0, diagnostics.length - 1)];
            combinations.push(`(${client_fk},${patient_fk},${company_fk},${treatment_fk},${randomValue},"${randomDiagnostic}",${client_fk}),`);
        }
    });

    return combinations;
}

// Generate combinations
const combinations = generateCombinations(client_fk, companyTreatmentMap, patientCompanyMap, diagnostics);

// Write to a temporary file
const filePath = './temp_combinations.csv';
fs.writeFileSync(filePath, combinations.join('\n'));

console.log(`Combinations generated and saved to ${filePath}`);
