const databaseURL = 'https://landingcasv-default-rtdb.firebaseio.com/colection.json'; 

 let sendData = () => { 
    
    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

    // new Date().toLocaleString( locales, options )
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

     // Realiza la petición POST con fetch
     fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })
    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()
        // Recuperación de datos
        getData()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });



  }


let getData = async () => {  

    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {

            // Contar el número de preferencia de los suscriptores registrados por fecha a partir del objeto data
            let countrelojfav = new Map()
            if (Object.keys(data).length > 0){
                for (let key in data){
                    let {relojfav} = data[key]
                    let count = countrelojfav.get (relojfav) || 0;
                    countrelojfav.set(relojfav, count + 1)
                }
            }
            // END
            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countrelojfav.size > 0) {

                subscribers.innerHTML = ''
       
                let index = 1;
                for (let [relojfav, count] of countrelojfav) {
                    let rowTemplate = `
                        <tr>
                            <th>${index}</th>
                            <td>${relojfav}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                    index++;
                }
            }
            // END

        }
        

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}



let ready = () => {
    console.log('Dom está listo')
    // Recuperación de datos
    getData();
}


let loaded = () => {
    
    let myform = document.getElementById('form')
    myform.addEventListener("submit", async (eventSubmit) =>{eventSubmit.preventDefault();  

        var emailElement = document.querySelector('.form-control-lg')
        var emailText = emailElement.value;
        if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
            emailElement.focus()
            return;
        }
        let relojfav = document.getElementById("relojfav").value;
        let input_email = document.getElementById("form_name").value;    
        if (relojfav === "no_selected") {
            alert("Por favor, selecciona un reloj favorito.");
            return;  // Evita el envío del formulario
        }

        try{
            const response = await fetch(databaseURL, {
                method: 'GET'
            })
    
            if (!response.ok){
                alert("Hemos experimentado un error, inténtelo de nuevo en unos minutos.");
            }

            const data = await response.json();

            if(data != null){
                if(Object.keys(data).length >0){
                    for(let key in data){
                        let {email} = data[key];
                        if(input_email == email){
                            alert("El correo ya se encuentra registrado, intenta con otro correo por favor.")
                            return;
                        }
                    }
                }
            }

        }catch(error){
            alert('Hemos experimentado un error. ¡Vuelve pronto!');
        }
        
        sendData();
    })

}



window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)

