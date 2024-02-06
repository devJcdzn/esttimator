// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/frontend/sw.js")
//     .then((registration) => {
//       console.log("SW Registered");
//       // console.log(registration);
//     })
//     .catch((err) => {
//       console.log("SW Registraiton Falied: ", err);
//     });
// }

// const apiURL = "http://localhost:3001/";
const apiURL = "https://estimapi.onrender.com/";

const openModal = document.querySelector(".create-action");

openModal.addEventListener("click", () => {
  const modal = document.querySelector(".add-modal");
  modal.classList.add("active");

  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

const form = document.getElementById("modalForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let radios = document.getElementsByName("type");
  let radioType;

  const owner = document.getElementById("owner").value;
  const reason = document.getElementById("reason").value;
  const value = document.getElementById("value").value;

  for (radio of radios) {
    if (radio.checked) {
      radioType = radio.value;
    }
  }

  const date = new Date();
  const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  if (!reason || !value) {
    alert("preencha corretamente os campos.");
  } else {
    localStorage.setItem("username", owner);

    if (radioType === "profit") {
      const response = await fetch(apiURL + "addBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [["entrada", now, reason, value]],
        }),
      });
      if (!response.ok) alert("erro no servidor");
      location.reload();
    } else {
      const response = await fetch(apiURL + "addDebit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [["saida" ,now, reason, value]],
        }),
      });
      if (!response.ok) alert("erro no servidor");
      location.reload();
    }
  }
});
