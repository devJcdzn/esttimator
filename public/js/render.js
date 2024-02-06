const url = "https://estimapi.onrender.com/";
// const url = "http://localhost:3001/";

const headerProject = document.getElementById("projectName");
const resumeGeneral = document.getElementById("valueResume");
const titleBar = document.getElementById("titleBar");
const profitBar = document.getElementById("profitBar");
const debitBar = document.getElementById("debitBar");
const profitVal = document.getElementById("profitVal");
const debitVal = document.getElementById("debitVal");
const extract = document.getElementById("extract");

const sheetButton = document.getElementById('linkToSheet');

async function getMetadata() {
  const response = await fetch(url + "metadata");
  const data = await response.json();

  const { title } = data.properties;
  localStorage.setItem("title", title);
}

getMetadata();

async function getDebit() {
  const response = await fetch(url + "getDebit");
  const data = await response.json();
  const debit = data.values[0];

  if (!debit || debit.length == 0) {
    return 0;
  }

  return debit[0];
}

async function getBudget() {
  const response = await fetch(url + "getBudget");
  const data = await response.json();
  const budget = data.values[0];

  if (!budget || budget.length == 0) {
    return 0;
  }

  return budget[0];
}

async function loadHeader() {
  const Name = localStorage.getItem("title");
  headerProject.textContent = Name;
}

async function loadResume() {
  try {
    const response = await fetch(url + "resume");
    const data = await response.json();
    const resume = data.values[0];

    if (!resume || resume.length == 0) {
      resumeGeneral.textContent = "R$0,00";
    } else {
      if (resume[0] > 0) {
        resumeGeneral.classList.add("positive");
      } else {
        resumeGeneral.classList.add("negative");
      }

      resumeGeneral.textContent = `R$${resume},00`;
    }
  } catch (error) {
    resumeGeneral.textContent = "Não foi possível carregar os dados.";
    resumeGeneral.classList.add("negative");
  }
}

async function loadBars() {
  const profit = await getBudget();
  const debit = await getDebit();
  const total = profit + debit;

  titleBar.textContent = `Total: R$ ${total},00`;
  profitVal.textContent = `R$${profit},00`;
  debitVal.textContent = `R$${debit},00`;

  if (profit < debit) {
    profitBar.style.height = "50%";
    debitBar.style.height = "100%";
  } else if (profit === debit) {
    profitBar.style.height = "50%";
    debitBar.style.height = "50%";
  } else if (profit == 0 && debit == 0) {
    profitBar.style.height = "0%";
    debitBar.style.height = "0%";
    profitVal.style.display = "none";
    debitVal.style.display = "none";
  }
}

async function renderHistory() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.map((mov, index) => {
      extract.innerHTML += `
    <li class="movimentation">
        <span class="date">${mov[1]}</span>
        <span class="reason">${mov[2]}</span>
        <span class="total ${mov[0]}">${mov[3]}</span>
    </li>
    `;
    });
  } catch (error) {
    extract.innerHTML += `<span class="no-data">Erro ao carregar os dados</span>`;
  }
}

// sheetButton.addEventListener('click', () => {
//   window.location.href = localStorage.getItem("url");
// })

window.addEventListener("load", loadHeader);
window.addEventListener("load", loadResume);
window.addEventListener("load", loadBars);
window.addEventListener("load", renderHistory);
