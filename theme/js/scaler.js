const scaleInput = document.getElementById("scale");

const panRadiusInput = document.getElementById("pan-radius");
const panLengthInput = document.getElementById("pan-length");
const panWidthInput = document.getElementById("pan-width");

const ingredientItems = document.querySelectorAll("#ingredients li input.ingredient-checkbox");


// --- SAFE PARSER ---
function safeFloat(value, fallback = 0) {
    const n = parseFloat(value);
    return isNaN(n) ? fallback : n;
}


// --- INITIAL VALUES ---
const originalYield = safeFloat(scaleInput.value, 1);

const originalRadius = panRadiusInput ? safeFloat(panRadiusInput.value, 0) : 0;
const originalLength = panLengthInput ? safeFloat(panLengthInput.value, 0) : 0;
const originalWidth = panWidthInput ? safeFloat(panWidthInput.value, 0) : 0;


// --- STORE BASE INGREDIENTS ---
ingredientItems.forEach(input => {
    input.dataset.baseAmount = safeFloat(input.dataset.base, 0);
});


// --- ROUND PAN ---
function getRoundModifier() {
    if (!panRadiusInput || originalRadius === 0) return 1;

    const newRadius = safeFloat(panRadiusInput.value, originalRadius);

    return Math.pow(newRadius / originalRadius, 2);
}


// --- RECTANGULAR PAN ---
function getRectModifier() {
    if (!panLengthInput || !panWidthInput) return 1;
    if (originalLength === 0 || originalWidth === 0) return 1;

    const newL = safeFloat(panLengthInput.value, originalLength);
    const newW = safeFloat(panWidthInput.value, originalWidth);

    return (newL * newW) / (originalLength * originalWidth);
}


// --- MAIN ---
function updateIngredients() {

    const desiredYield = safeFloat(scaleInput.value, originalYield);

    const rect = getRectModifier();
    const round = getRoundModifier();

    const panModifier = rect !== 1 ? rect : round;

    ingredientItems.forEach(input => {

        const li = input.closest("li");
        const amountSpan = li.querySelector(".amount");

        const base = safeFloat(input.dataset.baseAmount, 0);

        const scaled = (base / originalYield) * desiredYield * panModifier;

        amountSpan.textContent = scaled.toFixed(2);
    });
}


// --- INIT ---
updateIngredients();


// --- EVENTS ---
scaleInput.addEventListener("input", updateIngredients);

if (panRadiusInput) {
    panRadiusInput.addEventListener("input", updateIngredients);
}

if (panLengthInput) {
    panLengthInput.addEventListener("input", updateIngredients);
}

if (panWidthInput) {
    panWidthInput.addEventListener("input", updateIngredients);
}


// --- DEBUG (TEMP, REMOVE LATER) ---
console.log("originalYield:", originalYield);
console.log("originalRadius:", originalRadius);
console.log("originalLength:", originalLength);
console.log("originalWidth:", originalWidth);