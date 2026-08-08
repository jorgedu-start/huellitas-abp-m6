const formActualizarMascota = document.getElementById("form-actualizar-mascota");

formActualizarMascota.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const idMascota = formActualizarMascota.dataset.id;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "tipoMascota": tipoMascota.value,
            "raza": raza.value,
            "nombre": nombre.value,
            "edad": edad.value,
            "descripcion": descripcion.value     
            
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("/api/mascotas/" + idMascota, requestOptions);

        const data = await response.json();

        if (response.status == 201) {
            const alertSuccess = document.getElementById("alert-success-actualizar");
            alertSuccess.textContent = data.message;
            alertSuccess.classList.remove("d-none");

            let { mascota } = data;
            setTimeout(() => {
                location.href = "/mascota/perfil/" + mascota.id;
            }, 2000);

        } else {
            console.log(data);
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Error al intentar actualizar la mascota");
    }
})

