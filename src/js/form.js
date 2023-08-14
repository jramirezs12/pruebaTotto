document.addEventListener("DOMContentLoaded", function () {
  var popup = document.getElementById("popup");
  var closePopup = document.getElementById("close-popup");
  var closePopupBtn = document.getElementById("close-popup-btn");
  var popupMessage = document.getElementById("popup-message");

  document
    .getElementById("registro-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);

      fetch("./php/registro_exitoso.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            // Mostrar el mensaje exitoso en el pop-up
            popupMessage.innerText = data.message;
            popup.style.display = "block";
          } else {
            // Manejar el caso de error
            console.log("Error:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
  });

  closePopupBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

const departamentoSelect = document.getElementById("departamento");
const ciudadSelect = document.getElementById("ciudad");
fetch("./colombia.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((departamento) => {
      const option = document.createElement("option");
      option.value = departamento.departamento;
      option.text = departamento.departamento;
      departamentoSelect.appendChild(option);
    });

    departamentoSelect.addEventListener("change", function () {
      const selectedDepartamento = this.value;
      ciudadSelect.innerHTML = "";

      if (selectedDepartamento !== "") {
        const departamento = data.find(
          (d) => d.departamento === selectedDepartamento
        );
        departamento.ciudades.forEach((ciudad) => {
          const option = document.createElement("option");
          option.value = ciudad;
          option.text = ciudad;
          ciudadSelect.appendChild(option);
        });
        ciudadSelect.disabled = false;
      } else {
        ciudadSelect.disabled = true;
      }
    });
  })
  .catch((error) => console.error("Error:", error));