const botonesEliminarMascota = document.querySelectorAll(
    ".btn-eliminar-mascota"
);

botonesEliminarMascota.forEach((btnEliminarMascota) => {

    btnEliminarMascota.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const idMascota = btnEliminarMascota.dataset.id;

            const confirmarEliminacion = confirm(
                "¿Está seguro de que desea eliminar esta mascota?"
            );

            if (!confirmarEliminacion) {
                return;
            }

            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            const response = await fetch(
                "/api/mascotas/" + idMascota,
                requestOptions
            );

            const data = await response.json();

            if (response.status == 201) {
                const alertSuccess = document.getElementById(
                    "alert-success-eliminar"
                );

                alertSuccess.textContent = data.message;
                alertSuccess.classList.remove("d-none");

                setTimeout(() => {
                    location.reload();
                }, 2000);

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Error al intentar eliminar la mascota");
        }
    });

});