let vocabData = {};
let currentCategory = "";
let vocabIndex = 0;

const selectElement = document.querySelector("select");
const nextButton = document.querySelector("button");
const vocabDisplay = document.querySelector(".vocab");
const pronunciationDisplay = document.querySelector(".pronunciation");
const meaningDisplay = document.querySelector(".meaning");

function populateDropdown() {
  const categories = Object.keys(vocabData);
  selectElement.innerHTML = categories.map(
    cat => `<option value="${cat}">${cat}</option>`
  ).join("");
  currentCategory = categories[0];
  updateCard();
}

selectElement.addEventListener("change", () => {
  currentCategory = selectElement.value;
  vocabIndex = 0;
  updateCard();
});

nextButton.addEventListener("click", () => {
  vocabIndex = (vocabIndex + 1) % vocabData[currentCategory].length;
  updateCard();
});

function updateCard() {
  const item = vocabData[currentCategory][vocabIndex];
  vocabDisplay.textContent = item.vocab;
  pronunciationDisplay.textContent = item.pronunciation;
  meaningDisplay.textContent = item.meaning;
}

fetch('vocab.json')
  .then(response => response.json())
  .then(data => {
    vocabData = data;
    populateDropdown();
  })
  .catch(err => {
    console.error("Failed to load vocab.json:", err);
  });
