const formCrearMascota = document.getElementById("form-crear-mascota");

formCrearMascota.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

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
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("/api/mascotas", requestOptions);

        const data = await response.json();

        if (response.status == 201) {
            const alertSuccess = document.getElementById("alert-success");
            alertSuccess.textContent = data.message;
            alertSuccess.classList.remove("d-none");

            formCrearMascota.reset();

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
        alert("Error al intentar registrar la mascota");
    }
})

