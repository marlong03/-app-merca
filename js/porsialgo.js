/* globales */
const urlFetchProducts = "http://localhost:3002/product/"
let arrayProducts = []
let arrayNamesProducts = []
let newArrayProducts = []
let productosEnCarrito = []
/* -------------userNow------------- */
const nombreUserNow = document.getElementById("nombreUserNow")



fetch("http://localhost:3002/usernow")
.then(x => x.json())
.then(res => {
    if(res){
        console.log("existe un user");
        console.log(res.length);
        console.log(res)
        nombreUserNow.innerHTML = res[0].name
    }else{
        console.log("no existe un user todavia ");
    }
})
nombreUserNow.addEventListener("click",()=>{
    fetch("http://localhost:3002/usernow/"+ nombreUserNow.textContent,{
        method:"DELETE",
        headers: {
        'Content-type': 'application/json; charset=UTF-8' 
        }
    })
    .then(x =>redireccionarUrl('/src/index.html'))
    .catch(x => redireccionarUrl('/src/index.html'))
        
    console.log("entraste");
    console.log("http://localhost:3002/usernow/"+ nombreUserNow.textContent);
})
function redireccionarUrl(donde){
    location.href=location.origin + donde
}

/* ------------------------- flechas filtros ------------------------ */
const flechaMarca = document.getElementById("flechaMarca")
const flechaPrecio = document.getElementById("flechaPrecio")
const flechaCategoria = document.getElementById("flechaCategoria")
const flechaOrdenarPor = document.getElementById("flechaOrdenarPor")

const filterContMarca = document.querySelector(".filter__content--marca")
const filterContPrecio = document.querySelector(".filter__content--precio")
const filterContOrdenar = document.querySelector(".filter__content--ordenar")
const filterContCategoria = document.querySelector(".filter__content--categoria")

flechaOrdenarPor.addEventListener("click",()=>{
    listenArrow(flechaOrdenarPor,filterContOrdenar)})
flechaMarca.addEventListener("click",()=>{
    listenArrow(flechaMarca,filterContMarca)})
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

const modalCarrito = document.querySelector(".modal__carrito")
const modalContCarrito = document.querySelector(".modal__container--carrito")

logoCarrito.addEventListener("click",()=>{
    accionarModalCarrito()
    dibujarProductosCarrito()

 })
btnCerrarModalCarrito.addEventListener("click",()=>{
    accionarModalCarrito()
})

function dibujarProductosCarrito(){
    modalCarritoContent.innerHTML = ""
    modalCarritoContent.innerHTML += 
        '<article>'+
        '<div>producto</div>'+
        '<div>'+
        '<p>Cantidad</p>'+
        '<p>Precio(Und)</p>'+
        '<p>Precio Total</p>'+
        '</div>'+
        '</article>'

    let hash = {};
    let productosEnCarritoSinRep = productosEnCarrito.filter(o =>
        hash[o.id] ? false : hash[o.id] = true
    );
        /* let cantidad = productosEnCarrito.forEach((prod)=>{
            productosEnCarrito.filter(x => prod.name == x.name)
        }) */
        //la cantidad debe estar dentro de donde se pinta
    productosEnCarritoSinRep.forEach((prod)=>{
        modalCarritoContent.innerHTML += 
        '<article>'+
        '<div>'+
        '<img src="'+prod.photo+'" alt="">'+
        '<p>'+prod.name+'</p>'+
        '</div>'+
        '<div>'+
        '<p>'+1+'</p>'+
        '<p>$'+prod.price+'</p>'+
        '<p>$34.000</p>'+
        '<p class="xCerrar">X</p>'+
        '</div>'+
        '</article>'  
    })
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

function añadirProductosAlCarrito(evento){
    let nameProduct = evento.path[2].childNodes[1].childNodes[1].innerHTML 
    fetch(urlFetchProducts + nameProduct)
    .then(x => x.json())
    .then(res =>{
        productosEnCarrito.push(res[0])
    })
    accionarNotificacion(nameProduct)

    mensajeCarrito.innerHTML = "Tú carrito tiene <span>"+(productosEnCarrito.length + 1)+"</span> productos"
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
                '<input type="button" value="añadir" id="btnAñadirAlCarritoModal">'+
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
    productoAñadidoCarrito.innerHTML = 
    "<span>"+msj+"</span><br>¡Se añadio al carrito!"
    notificacion.classList.toggle("displayNone")
    setTimeout(()=>{
        notificacion.classList.toggle("displayNone")
    },900)
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