var Cliente = require ('./MymongoDB.js');

class Producto{
	constructor(key, informacion, cantidad) {
        this.key = key;
		this.informacio = informacio;
		this.cantidad = cantidad;
    }
}
//Se crea un carrito donde se almacenan los productos
var carrito = new Array();

	var anyadirProducto = function(producto){

	//Se crea una copia del producto al que le sumaremos la cantidad de productos del mismo tipo ya existente en el carrito

		let comprobarProducto = JSON.parse(JSON.stringify(producto));
		var indice;
		
		if(carrito.length == 0){indice = -1;}
		for( let i in carrito ){
			if(carrito[i].key == producto.key){
                comprobarProducto.cantidad = producto.cantidad+carrito[i].cantidad;
			indice = i;
			}
		}

		Cliente.comprobarStock(comprobarProducto, function(seAnyade){

			if(seAnyade){
				
				if(indice == -1 || indice == undefined){
					carrito.push(producto);	
					console.log( "Producto: "+producto.informacion+" añadido al carrito ("+producto.cantidad+" unidades)!");
				}else{
					carrito[indice].cantidad = carrito[indice].cantidad + producto.cantidad;
					console.log( "Articulo: "+carrito[indice].informacion+" actualizado (+"+producto.cantidad+")!");	
				}
				
			}else{
				console.log( "El producto: "+producto.informacion+" NO se ha añadido al carrito");	
			}

		});
		
	}

	var eliminarProducto = function(clavePrimaria){
		
		var indice = arrayObjectIndexOf(carrito, clavePrimaria);
		
		if(indice != -1){
			let nombre = carrito[indice].informacion;
			console.log("Producto: "+nombre+" ha sido borrado!");
			carrito.splice(indice, 1);
			
		}
		else{
			console.log("No existe el producto con la clave: "+clavePrimaria+" en el carrito!");
		}
    }
    
    

function arrayObjectIndexOf(myArray, searchTerm) {
	for(var i = 0; i < myArray.length; i++) {
		if (myArray[i].key === searchTerm) return i;
	}
	return -1;
}

//Test que realiza la comprobación de los métodos de añadir y eliminar productos del carrito
//Así para añadir un producto, se comprueba que este exista en la base de datos.	



  Cliente.insertarProductos(function(err,result) {
	if (err) throw err;
	setTimeout(()=>{anyadirProducto(new Producto(5, 'Pan',1));},1000);
	setTimeout(()=>{console.log(carrito);},1500);
	setTimeout(()=>{anyadirProducto(new Producto(1, 'Agua',20));},2000);
	setTimeout(()=>{console.log(carrito);},2500);
	setTimeout(()=>{anyadirProducto(new Producto(3, 'Cerveza',3));},3000);
	setTimeout(()=>{console.log(carrito);},3500);
	setTimeout(()=>{anyadirProducto(new Producto(2, 'Pizza',1));},4000);
	setTimeout(()=>{console.log(carrito);},4500);
	setTimeout(()=>{eliminarProducto(30);},5000);
	setTimeout(()=>{console.log(carrito);},5500);
	setTimeout(()=>{eliminarProducto(1);},6000);
	setTimeout(()=>{console.log(carrito);},6500);
	setTimeout(()=>{anyadirProducto(new Producto(4, 'Vino',20));},7000);
	setTimeout(()=>{console.log(carrito);},7500);
	
  });
