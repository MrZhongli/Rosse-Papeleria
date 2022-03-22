
let description = ['Esta agenda incluye,  Datos personales,  Calendario 2022,  Planificación mensual (12 meses), Planificación semanal (60 semanas), Pago de cuentas,Contactos y Notas',
                    ]

//INSTANCIAR OBJETOS Y ASOCIAR A ARRAY GLOBAL
productos.push(new Producto(1, "AGENDA PERSONALIZADA", 4000, "assets/personal/1.jpg"));
productos.push(new Producto(2, "PLANNER ENFERMEROS", 3500, "assets/enfermero/4.jpg"));
productos.push(new Producto(3, "PLANNER MEDICOS", 4000, "assets/medico/1.jpg"));
productos.push(new Producto(4, "PLANNER ED. DE PARVULOS", 2500, "assets/parvulos/1.jpg"));
productos.push(new Producto(5, "PLANNER FONOAUDIOLOGOS", 4000, "assets/oido/1.jpg"));
productos.push(new Producto(6, "PLANNER TERAPEUTA OCUPACIONAL", 3500, "assets/terapeuta/1.jpg"));
productos.push(new Producto(7, "PLANNER PYME", 3000, "assets/pyme/1.jpg"));

// console.log(productos);
//GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
productosUI(productos, 'productosContenedor');



//Boton confirmar carrito
confirmar.onclick = () => {
  let total = totalCarrito();
  saldoCliente -= total;

  //Llamo la funcion creadora de promesas y defino un comportamiento para then(si es aceptada) y catch(si es rechazada)
  promesaCompra(saldoCliente).then((mensaje) => {
//     spinner
     productosCarrito.innerHTML= ` <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
 `
  // llamada a la api
;
fetch('https://apis.digital.gob.cl/dpa/provincias')
.then((respuesta)=>{
 return respuesta.json()
}).then((datos)=>{
  console.log(datos);
productosCarrito.innerHTML=
            `
            <h3>Datos de envios</h3>
            <div>
                    <select id="provFiltro" name="Provincia" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"></select>
                    <select id="comFiltro" name="Comuna" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ></select>
                    <input class="form-control mt-2 mb-2 content_letter" name="Email" id="email" type="email" placeholder="Ingresar Email*">
                    <input class="form-control mt-2 mb-2 content_letter" name="Name" id="name" type="text" placeholder="Ingresar Nombre*">
                    <input class="form-control mt-2 mb-2 content_letter" name="Number" id="number" type="number" placeholder="Ingresar Número Telefónico">
                    <input class="form-control mt-2 mb-2 content_letter" name="text" id="calle" type="text" placeholder="Ingresar Domicilio">
                <button id="btnEnviar" class="mt-2 mb-2 btn btn-primary" type="submit" value="Enviar">Enviar</button>
            </div>
             `


const provFiltro= document.getElementById('provFiltro')
for (const provincia of datos) {
      provFiltro.innerHTML += `<option value="${provincia.codigo}">${provincia.nombre}</option>`
}
// manejo de evento del select
provFiltro.onchange=()=>{
  let idProvincia = provFiltro.value
  // console.log(idProvincia)
  let rutaBusqueda =`https://apis.digital.gob.cl/dpa/provincias/${idProvincia}/comunas`
  fetch(rutaBusqueda)
  .then(response=>response.json())
  .then(datos=>{
    console.log(datos)
    let comFiltro = document.getElementById('comFiltro');
    for(const comuna of datos)
      comFiltro.innerHTML += `<option value="${comuna.codigo}">${comuna.nombre}</option>`
  })
  document.getElementById('btnEnviar').onclick=()=>{
    console.log('enviar a ' + comFiltro.value + "en provincia Id "+ idProvincia )
  fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    body: JSON.stringify({
      carrito: carrito,
      idProvincia: idProvincia,
      idComuna: comFiltro.value
    }),
    header:{
      'Content-type':'application/json; charset=UTF-8',
    },
  }).then(response=> response.json())
    .then(data=>{
       Swal.fire(
                'Compra confirmada',
                "Pedido Nº "+ data.id + " en camino",
                'success'
        )
    })
    vaciarCarrito();
  }
}
})
.catch(err=> console.log(err))


    // alertaEstado(mensaje, "success")
  }).catch((mensaje) => {
    alertaEstado(mensaje, "error")
  })
  // vaciarCarrito();
}







