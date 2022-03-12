/* globales */
const urlFetchProducts = "https://app-merca2.herokuapp.com/product/"
let arrayProducts = []
let arrayNamesProducts = []
let newArrayProducts = []
let productosEnCarrito = []
let precioTotalCarrito = 0;
let productosEnCarritoGlobal = []

/* -------------userNow------------- */
const nombreUserNow = document.getElementById("nombreUserNow")
const cerrarSesionBtn = document.getElementById("cerrarSesionBtn")
 const imgUser = document.getElementById("imgUser")
const modalOptions = document.getElementById("modalOptions")

nombreUserNow.addEventListener("click",()=>{
    modalOptions.classList.toggle("displayBlock")
})
cerrarSesionBtn.addEventListener("click",()=>{
    fetch("https://app-merca2.herokuapp.com/usernow/"+ nombreUserNow.textContent,{
        method:"DELETE",
        headers: {
        'Content-type': 'application/json; charset=UTF-8' 
        }
    })
    .then(x =>redireccionarUrl('/index.html'))
    .catch(x => redireccionarUrl('/index.html'))
        
   /*  console.log("entraste");
    console.log("https://app-merca2.herokuapp.com/usernow/"+ nombreUserNow.textContent); */
})


fetch("https://app-merca2.herokuapp.com/usernow")
.then(x => x.json())
.then(res => {
    if(res[0].gender == "hombre"){
        imgUser.src = "../img/genero-masculino.png"
    }
    if(res[0].gender == "mujer"){
        imgUser.src = "../img/simbolo-femenino.png"
    }
    if(res[0].gender == "otro"){
        imgUser.src = "../img/sexual.png"
    }
    if(res[0].gender == ""){
        imgUser.src = "../img/login/user.png"
    }
    
    let nombreUserNowFirst = res[0].name.split(" ")
    nombreUserNowFirst = nombreUserNowFirst[0]
    try {
        nombreUserNow.innerHTML = nombreUserNowFirst
    } catch (error) {
        redireccionarUrl("/index.html")
    }
})

function redireccionarUrl(donde){
    location.href=location.origin +"/-app-merca/" + donde
}

/* ------------------------- flechas filtros ------------------------ */
/* const flechaMarca = document.getElementById("flechaMarca") */
const flechaPrecio = document.getElementById("flechaPrecio")
const flechaCategoria = document.getElementById("flechaCategoria")
const flechaOrdenarPor = document.getElementById("flechaOrdenarPor")

const filterContMarca = document.querySelector(".filter__content--marca")
const filterContPrecio = document.querySelector(".filter__content--precio")
const filterContOrdenar = document.querySelector(".filter__content--ordenar")
const filterContCategoria = document.querySelector(".filter__content--categoria")

flechaOrdenarPor.addEventListener("click",()=>{
    listenArrow(flechaOrdenarPor,filterContOrdenar)})
/* flechaMarca.addEventListener("click",()=>{
    listenArrow(flechaMarca,filterContMarca)}) */
flechaPrecio.addEventListener("click",()=>{
    listenArrow(flechaPrecio,filterContPrecio)})
flechaCategoria.addEventListener("click",()=>{
    listenArrow(flechaCategoria,filterContCategoria)})

function listenArrow(arrow , content){
    arrow.classList.toggle("animationFlecha")
    content.classList.toggle("animationContentBelow")
    content.classList.toggle("displayBlock");
}
/*  ----------- funcionalidad items filtros --------------------- */
const itemDesde = document.getElementById("itemDesde")
const itemHasta = document.getElementById("itemHasta")
const itemBebidas = document.getElementById("itemBebidas")
const itemAlfabeto = document.getElementById("itemAlfabeto")
const itemCongelados = document.getElementById("itemCongelados")
const itemPrecioMenor = document.getElementById("itemPrecioMenor")
const itemPrecioMayor  = document.getElementById("itemPrecioMayor")
const itemEnviarPrecios = document.getElementById("itemEnviarPrecios")
const itemFrutasVerduras = document.getElementById("itemFrutasVerduras")
const itemLacteos = document.getElementById("itemLacteos")
const itemPasteleria = document.getElementById("itemPasteleria")
const itemDulces = document.getElementById("itemDulces")


itemEnviarPrecios.addEventListener("click",()=>{
    pintarProductosPorPrecioFiltrado()
})

itemAlfabeto.addEventListener("click",()=>{
    rellenarArray()
    pintarProductosPorAlfabeto()
})
itemPrecioMayor.addEventListener("click",()=>{
 pintarProductosPorPrecio("mayor")
})
itemPrecioMenor.addEventListener("click",()=>{
    pintarProductosPorPrecio("menor")
})

itemDulces.addEventListener("click",()=>{
    pintarProductosPorCategoria("dulces")
})
itemLacteos.addEventListener("click",()=>{
    pintarProductosPorCategoria("lacteos")
})
itemPasteleria.addEventListener("click",()=>{
    pintarProductosPorCategoria("pasteleria")
})
itemCongelados.addEventListener("click",()=>{
    pintarProductosPorCategoria("congelados")
})
itemBebidas.addEventListener("click",()=>{
    pintarProductosPorCategoria("bebidas")
})
itemFrutasVerduras.addEventListener("click",()=>{
    pintarProductosPorCategoria("frutas y verduras")
})

function pintarProductosPorPrecioFiltrado(){
    let arr = []
    fetch(urlFetchProducts + "all")
    .then(x => x.json())
    .then(res =>{
        sectionFirst.innerHTML = ""
        res.forEach(prod => {
            arr.push(prod)
        });
        newArrayProducts = arr.filter( x =>{
            if(x.price > parseInt(itemDesde.value) 
            && x.price < parseInt(itemHasta.value)){
                return x
            }
        })
        newArrayProducts.forEach(prod => {
            rellenoSectionFirst(prod)
        });
    })
}
function pintarProductosPorAlfabeto(){
    let arr = []
    fetch(urlFetchProducts + "all")
    .then(x => x.json())
    .then(res =>{
        sectionFirst.innerHTML = ""
        res.forEach(prod => {
            arr.push(prod)
            newArrayProducts = arr.sort((a,b)=>{
                if(a.name < b.name) return -1
            })
        });
        newArrayProducts.forEach(prod => {
            rellenoSectionFirst(prod)
        });
    })
}
function pintarProductosPorPrecio(desicion){
    let arr = []
    const ordenarMayorAMenor = (a,b)=>{
        if(a.price > b.price) return -1;
    }
    fetch(urlFetchProducts + "all")
        .then(x => x.json())
        .then(res =>{
            sectionFirst.innerHTML = ""
            res.forEach(prod => {
                arr.push(prod)
                if(desicion == "mayor")
                    newArrayProducts = arr.sort(ordenarMayorAMenor)
                if(desicion == "menor")
                    newArrayProducts = arr.sort(ordenarMayorAMenor).reverse()
            });
            newArrayProducts.forEach(prod => {
                rellenoSectionFirst(prod)
            });
        })
}
function pintarProductosPorCategoria(nombreCategoria){
    let arr = []
    fetch(urlFetchProducts + "all")
        .then(x => x.json())
        .then(res =>{
            res.forEach( prod => arr.push(prod))
            newArrayProducts = arr.filter(x =>{
                if(x.category == nombreCategoria) return x
            })
            sectionFirst.innerHTML = ""
            newArrayProducts.forEach(prod => {
                rellenoSectionFirst(prod)
            });
        })
}
/* --------------------------carrito----------------------------- */
const logoCarrito = document.getElementById("logoCarrito") 
const mensajeCarrito = document.getElementById("mensajeCarrito")
const modalCarritoContent = document.getElementById("modalCarritoContent")
const btnCerrarModalCarrito = document.getElementById("btnCerrarModalCarrito")
const productoAñadidoCarrito = document.getElementById("productoAñadidoCarrito")
const btnAñadirAlCarritoModal = document.getElementById("btnAñadirAlCarritoModal")
const precioTotalCarritoId = document.getElementById("precioTotalCarritoId")
const modalCarrito = document.querySelector(".modal__carrito")
const modalContCarrito = document.querySelector(".modal__container--carrito")
const modalPay = document.querySelector(".modal__pay")
const modalContPay = document.querySelector(".modal__container--pay")
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito")
const btnPay = document.getElementById("btnPay")
const btnPay2 = document.getElementById("btnPay2")
const direccionEntrada = document.getElementById("direccionEntrega")
const fechaEntrega = document.getElementById("fechaEntrega")

const btnCerrarModalPay = document.getElementById("btnCerrarModalPay")

btnPay.addEventListener("click",()=>{
    if(productosEnCarrito.length > 0 ){

        accionarModalCarrito()
        accionarModalPay()
    }
})
btnPay2.addEventListener("click",()=>{
    if(direccionEntrada.value !=""){
        accionarModalPay()
        accionarNotificacion("compra")
    }
    else{
        alert("rellene los campos")
    }
})
logoCarrito.addEventListener("click",()=>{
    accionarModalCarrito()
    dibujarProductosCarrito()
})
btnCerrarModalCarrito.addEventListener("click",()=>{
    accionarModalCarrito()
})
btnCerrarModalPay.addEventListener("click",()=>{
    accionarModalPay()
})
btnVaciarCarrito.addEventListener("click",()=>{
    vaciarCarrito()
})
modalCarritoContent.addEventListener("click",(x)=>{
    if(x.path[0].innerText == "X"){
        /* console.log("SE BORRO ESTE PRODUCTO"); */
        let nombreProducto = x.path[2].childNodes[0].childNodes[1].childNodes[0].textContent
        let index = productosEnCarritoGlobal.findIndex(x => x.name == nombreProducto)
        productosEnCarrito.splice(index,1)
       /*  console.log(productosEnCarrito); */
        
        /* let productoEliminado =  productosEnCarritoGlobal.filter(x => {
            return x.name != nombreProducto 
        }) */
    mensajeCarrito.innerHTML = "Tú carrito tiene <span>"+(productosEnCarrito.length )+"</span> productos"
    if(productosEnCarrito.length == 0){
        mensajeCarrito.innerHTML = "Carrito vacio"
    }
        dibujarProductosCarrito()
        // toca actualizar el array que se pinta en el modal 
    }
})
function dibujarProductosCarrito(){
    
    modalCarritoContent.innerHTML = ""
    modalCarritoContent.innerHTML += 
        '<article>'+
        '<div>'+
        '<p> Producto </p> &nbsp;&nbsp;&nbsp'+
        '<p> nombre </p>'+

        '</div>'+
        

        '<div>'+
        '<p> Cantidad </p>'+
        '<p> Precio(Und) </p>'+
        '<p> Precio Total </p>'+
        '</div>'+
        '</article>'
    let hash = {};
    let productosEnCarritoSinRep = productosEnCarrito.filter(o =>
        hash[o.id] ? false : hash[o.id] = true
    );

    /* console.log(productosEnCarritoSinRep); */
  productosEnCarritoGlobal = productosEnCarritoSinRep
    if(productosEnCarritoGlobal.length > 0){
        arret(productosEnCarritoGlobal)
        /* console.log(productosEnCarritoSinRep);
        console.log("el carritoGlobal es mayor a 0");  */  
    }
    if(productosEnCarritoGlobal.length == 0){
        arret(productosEnCarritoSinRep)
        productosEnCarritoGlobal = productosEnCarritoSinRep
        productosEnCarritoGlobal.length+= 1 
        /* console.log("se uso productosEnCarritoGlobal"); */
    }
    } 
    //se necesita que el prductosen carrito sin rep solo pase una vez y de resto use el gobal
    function arret (arr){
        arr.forEach((prod)=>{
            let mapeoProductos = productosEnCarrito.map(x =>{ return x.name})
            let vecesRepiteNombre = mapeoProductos.filter(x => x == prod.name)
            
            let precioTotalProducto = (prod.price * vecesRepiteNombre.length)
                precioTotalCarrito += precioTotalProducto
           /*  console.log(prod.price * vecesRepiteNombre.length); */
            modalCarritoContent.innerHTML += 
            '<article>'+
            '<div>'+
            '<img src="'+prod.photo+'" alt="">'+
            '<p>'+prod.name+'</p>'+
            '</div>'+
            '<div>'+
            '<p>'+vecesRepiteNombre.length+'</p>'+
            '<p>$'+prod.price+'</p>'+
            '<p>$'+precioTotalProducto+'</p>'+
            '<p class="xCerrar">X</p>'+
            '</div>'+
            '</article>'  
        })
        precioTotalCarritoId.innerHTML = 
        "Total: "+"<strong>$"+precioTotalCarrito+"</strong>"
        precioTotalCarrito = 0
    }

function accionarModalPay(){
    body.classList.toggle("overflowHidden")
    containerAll.classList.toggle("doBlur")
    modalPay.classList.toggle("trasladar")
    modalContPay.classList.toggle("aparecer")   
}  
function accionarModalCarrito(){
    body.classList.toggle("overflowHidden")
    containerAll.classList.toggle("doBlur")
    modalCarrito.classList.toggle("trasladar")
    modalContCarrito.classList.toggle("aparecer")   
}   
function ejecutaCarrito(){
        logoCarrito.classList.toggle("animationEjecutarCarrito")
}
function vaciarCarrito(){
    productosEnCarrito = []
    precioTotalCarrito = 0
    productosEnCarritoGlobal = [] 
    dibujarProductosCarrito()
    precioTotalCarritoId.innerHTML = 
        "Total: "+"<strong>$"+precioTotalCarrito+"</strong>"
    mensajeCarrito.innerHTML = "Carrito vacio"
    let productosEnCarritoSinRep = productosEnCarrito.filter(o =>
        hash[o.id] ? false : hash[o.id] = true
    );
    /* console.log(productosEnCarritoSinRep); */
    productosEnCarritoGlobal = productosEnCarritoSinRep

}
/* ------------------------modal  producto-------------------------*/
const notificacion = document.getElementById("notificacion")
const sectionFirst = document.getElementById("sectionFirst")
const cerrarModalProduct = document.getElementById("cerrarModalProduct")

const body = document.querySelector("body")
const modalCont = document.querySelector(".modal__container")
const containerAll = document.querySelector(".container__all") 
const modal__product = document.querySelector(".modal__product")

sectionFirst.addEventListener("click",(evento)=>{
    if(evento.srcElement.defaultValue == "ver más"){
        rellenarModalProduct(evento)
        accionarModalProducts()
    }
    if(evento.srcElement.defaultValue == "Añadir"){
        añadirProductosAlCarrito(evento)
    }
})
btnAñadirAlCarritoModal.addEventListener("click",()=>{
    accionarNotificacion()
})
cerrarModalProduct.addEventListener("click",()=>{
    accionarModalProducts()
})

function añadirProductosAlCarrito(evento){ //-------------------------
    let nameProduct = evento.path[2].childNodes[1].childNodes[1].innerHTML 
    fetch(urlFetchProducts + nameProduct)
    .then(x => x.json())
    .then(res =>{
        productosEnCarrito.push(res[0])
    })
    
    accionarNotificacion(nameProduct)
    mensajeCarrito.innerHTML = " <span>"+(productosEnCarrito.length + 1)+"</span> productos en carrito"
}
    function rellenarModalProduct(evento){
    let nameProductTarget = evento.path[2].children[1].children[1].innerText
    fetch(urlFetchProducts + nameProductTarget)
        .then(x => x.json())
        .then(res =>{
           modal__product.innerHTML = 
           '<div class="modal__product--content">'+
            '<div>'+
                '<img src="'+res[0].photo+'" alt="">'+
            '</div>'+
            '<div>'+
                '<h2>$'+res[0].price+'</h2>'+
                '<h3>'+res[0].name+'</h3>'+
                '<p>'+res[0].description+'</p>'+
                '<h4>Categoria:'+res[0].category+'</h4>'+
                '<h4>Disponibilidad: <span> NO </span></h4>'+
                
            '</div>'+
            '</div>'
        })
        .catch(()=> alert("no pudimos traer el articulo "+ nameProductTarget))
}
function accionarModalProducts(){
    body.classList.toggle("overflowHidden")
    containerAll.classList.toggle("doBlur")
    modal__product.classList.toggle("trasladar")
    modalCont.classList.toggle("aparecer")
}
function accionarNotificacion(msj){
    if(msj != "compra"){

        productoAñadidoCarrito.innerHTML = 
        "<span>"+msj+"</span><br>¡Se añadio al carrito!"
        notificacion.classList.toggle("displayNone")
        setTimeout(()=>{
            notificacion.classList.toggle("displayNone")
        },900)
    }if(msj == "compra"){
        
        productoAñadidoCarrito.innerHTML = 
        "¡Compra realizada con exito!<br><br>Recuerde que la pagina fue realizada con fines de aprendizaje"
        notificacion.classList.toggle("displayNone")
        productosEnCarrito = []
        mensajeCarrito.innerHTML = "Carrito vacio"

        setTimeout(()=>{
            notificacion.classList.toggle("displayNone")
            
        },2000)
        
        
    }
}
/* ------------ landing/sectionFirst ------------ */
function rellenoSectionFirst(par){
    sectionFirst.innerHTML += 
        '<article class="target">'+
        '<img src="'+par.photo+'" alt="">'+'<div class="target__content">'+
        '<h2>$'+par.price+'</h2>'+'<p>'+par.name+'</p>'+'</div>'+
        '<div class="target__btns">'+'<input type="button" value="ver más">'+
        '<input type="button" value="Añadir">'+'</div>'+'</article>'
}
traerYPintarTodosProductos()
function traerYPintarTodosProductos(){
    fetch(urlFetchProducts + "all")
    .then(x => x.json())
    .then(res =>{
        sectionFirst.innerHTML = ""
        res.forEach(prod => {
            arrayProducts.push(prod)
            rellenoSectionFirst(prod)
        });
    })
}
function pintarProductosOtraVez(){
    fetch(urlFetchProducts + "all")
    .then(x => x.json())
    .then(res =>{
        sectionFirst.innerHTML = ""
        res.forEach(prod => {
            if(newArrayProducts.indexOf(prod.name) > -1)
                rellenoSectionFirst(prod)
        });
    })
}
/* -------------------barra de busqueda ----------------------------- */
const btnSearch = document.getElementById("btnSearch")
const inputTextSearch = document.getElementById("inputTextSearch")

inputTextSearch.addEventListener("keydown",()=>{
    const valueSearch = inputTextSearch.value
    newArrayProducts = filterItems(arrayNamesProducts,valueSearch)
   pintarProductosOtraVez()
})

let mediaqueryList = window.matchMedia("(max-width: 500px)");
mediaqueryList.addListener((x)=>{
    if(mediaqueryList.matches){
        inputTextSearch.style.paddingLeft = "10px"
        inputTextSearch.placeholder = "Buscar"
    }
    else{
        inputTextSearch.placeholder = "¿Que quieres buscar?"
    }

})

function filterItems(arr,x) {
    rellenarArray()
    return arr.filter((index) =>{
        return index.toLowerCase().indexOf(x.toLowerCase()) > -1;
    })
}
function rellenarArray(){
    for(let x = 0; x < arrayProducts.length; x++){
        arrayNamesProducts.push(arrayProducts[x]["name"])
    }
}