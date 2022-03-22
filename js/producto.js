//DECLARACIÓN DE CLASE PRODUCTO
class Producto {
    constructor(id, nombre, precio, img, cantidad
        ,descripcion) {
            this.id = parseInt(id);
            this.nombre = nombre.toUpperCase();
            this.precio = parseFloat(precio);
            this.img= img;
            this.cantidad= cantidad || 1;
            this.descripcion = descripcion;
            
    }
    addCantidad(){
        this.cantidad++;                
    }
    subTotal(){
        return this.precio * this.cantidad;                
    }
    
}