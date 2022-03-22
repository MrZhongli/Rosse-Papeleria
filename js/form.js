// const $form = document.getElementById('form')
// $form.addEventListener('submit', submitLanzado)

// async function submitLanzado(e){
// 	e.preventDefault()
// 	const form = new FormData(this)
// 	const response = await fetch(this.action, { method: this.method,
// 		body: form
// 		headers:{
// 			'Accept': 'application/json'
// 		}
// 	})
// 	if(response.ok){
// 		form.reset()
// 		alert('sàpoperro')
// 		// Swal.fire(
// 	 //  'Tu mensaje ha sido enviado!',
// 	 //  'En breves nos pondremos en contacto contigo',
// 	 //  'success')
// 	}
		
// }



var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Tu consulta ha sido enviada, en brevedad nos comuncaremos contigo!";
          Swal.fire(
		  'Tu mensaje ha sido enviado!',
		  'En breves nos pondremos en contacto contigo',
		  'success')
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Hubo un inconveniente en enviar la consulta, intente nuevamente!"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)