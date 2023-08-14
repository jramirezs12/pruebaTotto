document.addEventListener("DOMContentLoaded", function () {
  var popup = document.getElementById("popup");
  var closePopup = document.getElementById("close-popup");
  var popupMessage = document.getElementById("popup-message");

  document
    .getElementById("registro-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);

      fetch("./php/guardar_datos.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            // Si se registró correctamente, redirige a otra página o realiza alguna acción
            if (data.redirect) {
              window.location.href = data.redirect;
            } else {
              console.log("Registro exitoso");
            }
          } else if (data.status === "error") {
            popupMessage.innerText = data.message;
            popup.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

document
  .getElementById("registro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch("./php/guardar_datos.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("El correo electrónico ya está registrado.")) {
          document.getElementById("modal-message").innerText = data;
          modal.style.display = "block";
        } else {
          // Si se registró correctamente, redirige a otra página o muestra un mensaje
          console.log(data); // Mostrar mensaje de éxito en la consola
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
