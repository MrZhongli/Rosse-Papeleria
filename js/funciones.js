//FUNCION PARA GENERAR LA INTERFAZ DE PRODUCTOS
function productosUI(productos, id) {
        let productosRender = document.getElementById(id);
        productosRender.innerHTML = "";
        for (const producto of productos) {
                let divProducto = document.createElement("div");
                //Agrego la clase columna
                divProducto.classList.add('col');
                //Agrego la estructura de la clase card para generarla en la interfaz
                divProducto.innerHTML = `<div data-aos="flip-left" class="cardContainer mt-3 mb-3" ">
                                                <div class="card-body  m-auto product-letter text-center">
                                                <img src="${producto.img}" class="card-img-top " alt="...">
                                                <h5 class="card-title">${producto.nombre}</h5>
                                                <p class="card-text">Precio: $${producto.precio}</p>
                                                <button id='${producto.id}' class='btnCompra btn btn-success'>Comprar</button>
                                                </div> 
                                        </div>`
                productosRender.append(divProducto);
        }
        seleccionarProducto();
}

function seleccionarProducto() {
        let botones = document.getElementsByClassName('btnCompra');
        for (const boton of botones) {
                boton.addEventListener('click', function () {
                        let seleccion = carrito.find(producto => producto.id == this.id);
                        if (seleccion) {
                                seleccion.addCantidad();
                        } else {
                                seleccion = productos.find(producto => producto.id == this.id);
                                carrito.push(seleccion);
                        }
                        localStorage.setItem('Carrito', JSON.stringify(carrito));
                        //Llamo a la funcion para generar la interfaz de carrito
                        carritoHTML(carrito);
                        totalCarrito();
                        //Uso de la librería toastify para mostrar un mensaje de accion
                        Toastify({
                                text: `Se ha agregado al carrito: ${seleccion.nombre}`,
                                duration: 3000,
                                style: {
                                        background: "linear-gradient(to right,#00fdff, #bc0ddf)",
                                },
                                gravity: "bottom"
                        }).showToast();
                })
                 confirmar.setAttribute('disabled', 'disabled')
        }        

}
console.log(carrito)
//Funcion para generar la interfaz del modal
function carritoHTML(lista) {
        //modifico el valor del badge que indica la cantidad de productos en el carrito
        cantidadCarrito.innerHTML = lista.length;
        //Vacio la interfaz de carrito
        productosCarrito.innerHTML =    `<div>
                                                <table class="table">
                                                        <thead>
                                                                <tr>
                                                                        <th scope="col">Id</th>
                                                                        <th scope="col">Planner</th>
                                                                        <th scope="col">Precio</th>
                                                                        <th scope="col">cantidad</th>
                                                                </tr>
                                                        </thead>
                                                </table>
                                        </div>`;
                        //Recorro la lista del carrito y genero la interfaz
                        for (const producto of lista) {
                                let prod = document.createElement('div');
                                prod.innerHTML = ` 
                                        
                                 <div class="car-item-container d-flex  align-items-center">
                                        <table class="table">
                                                        <p class="id-item m-1">${producto.id}</p>
                                                        <img class="img-product col-lg-1" src="${producto.img}" alt="">
                                                        <p class="name-item col-lg-2 m-3">${producto.nombre}</p>
                                                        <p class="price-item col-lg-2 m-1">$${producto.subTotal()}</p>
                                                        <span class="cantidad-item col-lg-1 m-1 badge bg-primary ">${producto.cantidad}</span>
                                                        <button class=" col-lg-2 m-1 delete btn btn-danger">borrar</button>
                                        </table>
                                </div>
                        <hr>
                        `;
                        prod.querySelector('.delete').addEventListener('click', removerItemCarrito)
                        productosCarrito.append(prod);
                         if (carrito.length > 0) {
                                confirmar.removeAttribute('disabled', 'disabled')
                         }
                
                        totalCarrito()
                        
                }
}

//-----------Funcion generadora de promesas---------------------------
function promesaCompra(saldo) {
        return new Promise(function (aceptado, rechazado) {
                if (saldo > 0) {
                        aceptado('Compra aceptada');

                } else {
                        rechazado('Compra rechazada');
                }
        })
}
//---------------Funcion calcular total carrito-------------------------------
function totalCarrito() {
        //Realizo la suma total del carrito
        let total = 0
        total = carrito.reduce((totalCompra, actual) => totalCompra += actual.subTotal(), total);
        totalCarritoInterfaz.innerHTML= "Total: $"+total;
        return total;


}
//--------------Funcion removedor de item------------------------------

      function removerItemCarrito(e){
        // let btnDelete = document.querySelector('.delete')
        let btnEliminar= e.target;
        const prod = btnEliminar.closest('.car-item-container')
        const title = prod.querySelector('.name-item').textContent
        const storage = JSON.parse(localStorage.getItem('carrito'))
       for(let i = 0; i < carrito.length; i++){

        if(carrito[i].nombre == title){
        carrito.splice(i,1)
        prod.remove()
                }       
        } 
        if (carrito.length > 0) {
                                confirmar.removeAttribute('disabled', 'disabled')
                         }
                         else {
                                 confirmar.setAttribute('disabled', 'disabled')
                         }
        totalCarrito() 
}





//--------------Funcion vaciar localstorage y array carrito----------------------
function vaciarCarrito() {
        //borro el localStorage
        localStorage.clear();
        //borro el array carrito con splice
        carrito.splice(0, carrito.length);
        //Llamo a la funcion para generar una interfaz vacia
        carritoHTML(carrito);
        totalCarritoInterfaz.innerHTML= "Total: $" +0;
}
//--------------Funcion generadora de alertas------------------------------
function alertaEstado(mensaje, tipo) {
        Swal.fire(
                'Estado de compra',
                mensaje,
                tipo
        )
}
