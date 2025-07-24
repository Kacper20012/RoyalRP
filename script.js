const data = [
  {
    kategoria: "Wykroczenia drogowe",
    lista: [
      {
        nazwa: "Przekroczenie dozwolonej prędkości",
        grzywna: "500 - 1000",
        wiezienie: "Brak"
      },
      {
        nazwa: "Brawurowa jazda",
        grzywna: "1000 - 2000",
        wiezienie: "Brak",
        dodatkowe: "Konfiskata prawa jazdy"
      },
      {
        nazwa: "Jazda pod wpływem alkoholu/środków odurzających",
        grzywna: "1000 - 2000",
        wiezienie: "Brak",
        dodatkowe: "Konfiskata prawa jazdy"
      },
      {
        nazwa: "Przejazd na czerwonym świetle",
        grzywna: "1000 - 2000",
        wiezienie: "Brak",
        dodatkowe: "Konfiskata prawa jazdy"
      }
    ]
  }
];

let selectedPenalties = [];

document.addEventListener("DOMContentLoaded", () => {
  renderCategories(data);
});

function renderCategories(data) {
  const categoriesDiv = document.getElementById("categories");

  data.forEach((category, catIndex) => {
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.innerHTML = `<h2>${category.kategoria}</h2>`;

    category.lista.forEach((penalty, penaltyIndex) => {
      const card = document.createElement("div");
      card.className = "penalty-card";

      const id = `${catIndex}-${penaltyIndex}`;

      card.innerHTML = `
        <strong>${penalty.nazwa}</strong><br>
        Grzywna: $${penalty.grzywna}<br>
        Więzienie: ${penalty.wiezienie || "Brak"}<br>
        ${penalty.dodatkowe ? `<em>Dodatkowe: ${penalty.dodatkowe}</em><br>` : ""}
        <button onclick="addPenaltyById('${id}')">Dodaj</button>
      `;

      card.dataset.penaltyId = id;
      card.dataset.penaltyData = JSON.stringify(penalty);

      catDiv.appendChild(card);
    });

    categoriesDiv.appendChild(catDiv);
  });
}

function addPenaltyById(id) {
  const card = document.querySelector(`[data-penalty-id="${id}"]`);
  if (!card) return;
  const penalty = JSON.parse(card.dataset.penaltyData);
  selectedPenalties.push(penalty);
  updateSummary();
}

function updateSummary() {
  document.getElementById("selected-count").textContent = selectedPenalties.length;

  let total = 0;
  selectedPenalties.forEach(p => {
    const minFine = parseInt(p.grzywna.split(" - ")[0]);
    total += isNaN(minFine) ? 0 : minFine;
  });

  document.getElementById("fine-total").textContent = total;
}

function clearSummary() {
  selectedPenalties = [];
  updateSummary();
}