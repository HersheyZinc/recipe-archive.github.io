const scaleInput = document.getElementById("scale");

function updateScale() {

const scale = parseFloat(scaleInput.value);

document.querySelectorAll("#ingredients li").forEach(item => {

const base = parseFloat(item.dataset.base);

item.querySelector(".amount").textContent =
(base * scale).toFixed(2);

});

document.querySelectorAll("[data-base]").forEach(el => {

const base = parseFloat(el.dataset.base);

el.textContent = (base * scale).toFixed(2);

});

}

scaleInput.addEventListener("input", updateScale);