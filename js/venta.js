//declaracion de variables
let nombre = '';

let opcion = '';

let seleccion = '';

let dias = '';

let valido = 0;

let dinero = 0;

let listaAnimatronicos = [];

let salir = 0;

let contador = 0;

let compraAnimatronico = "";

let animatronico;

let animatronicosJson;

let contenedor;

let animatronicoParseado;

let cards = "";

let carrito = [];

let listaAnimatronicosCarrito = [];

let menu = `1.- [ADMINISTRACIÓN] Agregar animatronicos al Stock
2.- Rentar un animatronico.
3.- ¿Buscas un animatronico?
4.- Consultar puntos de distribución.
5.- Limpiar consola.
6.- Finalizar.
`;
class Animatronico{

    constructor(nombre, precio, stock){
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
    }
}

//declaracion de funciones
function rentarAnimatronico(valor, dias){
    if(listaAnimatronicos[valor-1].stock>0){
        console.log("Usted tendra a "+listaAnimatronicos[valor-1].nombre+" por "+dias+" dia(s) por el valor de: $"+listaAnimatronicos[valor-1].precio*dias);
        listaAnimatronicos[valor-1].stock = listaAnimatronicos[valor-1].stock-1;
    }else{
        console.log("Lamentamos informar que "+listaAnimatronicos[valor-1].nombre+" actualmente no tiene stock, seleccione otra opción.");
    }
    console.log(menu);
}

function menuAnimatronicos(){ 
    contador = 1;
    for(let animatronico of listaAnimatronicos){
        if(animatronico.stock>0){
            console.log(contador+".- "+animatronico.nombre+" $"+animatronico.precio+" x dia con stock de "+animatronico.stock);
        }else{
            console.log(contador+".- "+animatronico.nombre+" $"+animatronico.precio+" x dia actualmente sin stock");
        }
        contador++;
    }
}

function buscarAnimatronico(animatronico){
    return animatronico.nombre == compraAnimatronico;
}

function agregarAnimatronico() {
    nombre = document.getElementById('nombre').value;
    precio = document.getElementById('precio').value;
    stock = document.getElementById('stock').value;
    animatronico = new Animatronico(nombre,precio,stock);
    listaAnimatronicos.push(animatronico);
    animatronicosJson = JSON.stringify(listaAnimatronicos);
    localStorage.setItem("animatronicosActuales", animatronicosJson);
    llenarCards();
    event.preventDefault();
}

function llenarCards(){
    contenedor = document.getElementById("animatronicos");
    if(localStorage.getItem("animatronicosActuales")!=null){
        animatronicoParseado = JSON.parse(localStorage.getItem("animatronicosActuales"));
    }
    cards = "";
    for(let animatronico of animatronicoParseado){
        cards = cards+"<div class=\"card\">" +
                            "<h3>"+animatronico.nombre+"</h3>" +
                            "<p>$"+animatronico.precio+"</p>" +
                            "<p>Stock: "+animatronico.stock+"</p>" +
                            "<button onclick=\"agregarAlCarro('"+animatronico.nombre+"')\">Agregar al carro</button>" +
                            "</div>";
    }
    contenedor.innerHTML = cards;
}

function agregarAlCarro(nombre){
    compraAnimatronico = nombre;
    if(sessionStorage.getItem('animatronicosCarro')!=null){
        carrito = JSON.parse(sessionStorage.getItem('animatronicosCarro'));
    }else{
        carrito = null;
    }
    if(localStorage.getItem("animatronicosActuales")!=null){
        animatronicoParseado = JSON.parse(localStorage.getItem("animatronicosActuales"));
    }
    let resultadoBusqueda = animatronicoParseado.find(buscarAnimatronico);
    console.log(resultadoBusqueda);
    if(resultadoBusqueda!=null){
        if(carrito!=null){
            console.log(carrito);
            for(let animatronicoAux of carrito){
                console.log(animatronicoAux);
                animatronico = new Animatronico(animatronicoAux.nombre,animatronicoAux.precio,animatronicoAux.stock);
                listaAnimatronicosCarrito.push(animatronico);
            }
            listaAnimatronicosCarrito.push(resultadoBusqueda);
            sessionStorage.setItem('animatronicosCarro',JSON.stringify(listaAnimatronicosCarrito));
        }else{
            animatronico = new Animatronico(resultadoBusqueda.nombre,resultadoBusqueda.precio,resultadoBusqueda.stock);
            listaAnimatronicosCarrito.push(animatronico);
            sessionStorage.setItem('animatronicosCarro',JSON.stringify(listaAnimatronicosCarrito));
        }
    }
}

//codigo de ejecucion
/*nombre = prompt("Bienvenido nuevo usuario, por favor dime tu nombre");

console.log(` _____        _                       _____      _            _        _                            _       _____
|  ___|      | |                     |  ___|    | |          | |      (_)                          | |     |_   _|
| |_ __ _ ___| |__   ___  __ _ _ __  | |__ _ __ | |_ ___ _ __| |_ __ _ _ _ __  _ __ ___   ___ _ __ | |_      | | _ __   ___
|  _/ _\` |_  / '_ \\ / _ \\/ _\` | '__| |  __| '_ \\| __/ _ \\ '__| __/ _\` | | '_ \\| '_ \` _ \\ / _ \\ '_ \\| __|     | || '_ \\ / __|
| || (_| |/ /| |_) |  __/ (_| | |    | |__| | | | ||  __/ |  | || (_| | | | | | | | | | |  __/ | | | |_ _   _| || | | | (__ 
\\_| \\__,_/___|_.__/ \\___|\\__,_|_|    \\____/_| |_|\\__\\___|_|   \\__\\__,_|_|_| |_|_| |_| |_|\\___|_| |_|\\__( )  \\___/_| |_|\\___|
                                                                                                       |/

Bienvenido(a) `+nombre+` a nuestro sistema de elección de animatronicos, elige el animatronico que deseas rentar:

`+menu);

while (opcion != 6){
    opcion = prompt('Indicanos tu opción: ');
    if(opcion==1){
        salir=0;
        while(salir!="SALIR"){ 
            let nombre = "";
            contador = 0;
            while(nombre.trim()===""){
                if(contador == 0){
                    nombre = prompt("Ingrese el nombre del animatronico");
                }else{
                    nombre = prompt("Ingrese el nombre del animatronico. No se permite nombre vacio.");
                }
                contador++;
                if(nombre==null){ //validacion para excluir nulos
                    nombre="";
                }
            }
            contador = 0;
            let precio = "";
            while(precio.trim()===""){
                if(contador == 0){
                    precio = prompt("Ingrese el precio del animatronico");
                }else{
                    precio = prompt("Ingrese el precio del animatronico. No se permite precio vacio o letras.");
                }
                contador++;
                if(precio==null){ //validacion para excluir nulos
                    precio="";
                }else if(isNaN(precio)){ //validacion para excluir valores no numericos
                    precio="";
                }else if(!isNaN(precio)){ //validacion para excluir negativos o 0
                    if(precio<1){
                        precio="";
                    }
                }
            }
            contador = 0;
            let stock = "";
            while(stock.trim()===""){
                if(contador == 0){
                    stock = prompt("Ingrese el stock del animatronico");
                }else{
                    stock = prompt("Ingrese el stock del animatronico. No se permite stock vacio o letras.");
                }
                contador++;
                if(stock==null){ //validacion para excluir nulos
                    stock = "";
                }else if(isNaN(stock)){ //validacion para excluir valores no numericos
                    stock = "";
                }else if(!isNaN(stock)){ //validacion para excluir valores negativos o 0
                    if(stock<1){
                        stock="";
                    }
                }
            }
            salir = prompt("Ingrese SALIR para volver al menú, para agregar otro animatronico presione enter o ingrese cualquier valor.")

            precio = parseFloat(precio);

            let animatronico = new Animatronico(nombre,precio,stock);

            listaAnimatronicos.push(animatronico);

        }
        console.log(menu);
    }else if(opcion==2){
        valido = 0;
        while(valido==0){
            menuAnimatronicos();
            seleccion=prompt("Ingrese el animatronico que desea rentar:");
            dias=prompt("Ingrese la cantidad de dias que desea rentar:");
            if(!isNaN(seleccion)&&!isNaN(dias)){
                if(dias>0){
                    rentarAnimatronico(seleccion,dias);
                    valido = 1;
                }else{
                    console.log("La cantidad de dias no puede ser negativo, intentelo de nuevo.");
                }
            }else{
                console.log("Una de las opciones ingresadas no son validas, intentelo de nuevo.");
            }
        }
    }else if(opcion==3){
        compraAnimatronico=prompt("Indicanos por favor el animatronico que buscas:")
        let resultadoBusqueda = listaAnimatronicos.find(buscarAnimatronico);
        if(resultadoBusqueda!=null){
            console.log("El animatronico "+resultadoBusqueda.nombre+" tiene un valor de $"+resultadoBusqueda.precio+" x dia y queda un stock de: "+resultadoBusqueda.stock);
        }else{
            console.log("No se encuentra ningun animatronico con el nombre: "+compraAnimatronico);
        }
        console.log(menu);
    }else if(opcion==4){
        console.log(`Los puntos de distribuicion para nuestros animatronicos en su ciudad son:

        1.- Freddy Fazbear's Mega Pizzaplex.
        2.- Fredbear's Family Diner.
        3.- Freddy Fazbear's Pizza.
        4.- Freddy Pizza Place
        5.- El Chip
        6.- Oficinas principales
        
Ante información actualizada de horarios por favor comuniquese por teléfono.

`+menu);
    }
    else if(opcion==5){
        console.clear();
        console.log(menu);
    }else if(opcion==6){
        console.log("!Les agradecemos su visita y esperamos que hayan disfrutado de nuestros animatronicos! Recuerde que junto con la firma del contrato legal con el que nos libera de toda la responsabilidad por lo que podría ocurrir tendra unos lentes novedosos y un vale por una recarga gratis en cualquiera de nuestros locales. !Que tenga una maravillosa noche y nos vemos pronto!");
    }else{
        console.log("Opción no valida, intentelo de nuevo.")
    }
}*/