
//falta boton para cerrar modals
fetch("https://app-merca2.herokuapp.com/usernow",{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json; charset=UTF-8"
    }
})
.then(x => console.log("se eliminaron registros todos"))
.catch(x => console.log("no se eliminaron registros"))
//inputs----------------------
const email = document.getElementById("email")
const password = document.getElementById("password")
const emailRegister = document.getElementById("emailRegister")
const passwordRegister = document.getElementById("passwordRegister")
const nameRegister = document.getElementById("nameRegister")
const phoneRegister = document.getElementById("phoneRegister")
const formGenderRegister = document.getElementById("formGender")
//btns----------------------
const btnEnviar = document.getElementById("btnEnviar")
const btnRegisterId = document.getElementById("btnRegisterId")
const btnRegistrarUser = document.getElementById("btnRegistrarUser")
const btnAceptarModal = document.getElementById("btnAceptarModal")

//modals----------------------
const modal = document.querySelector('.modal');
let modalMsj = document.querySelector('.modalMsj');
const container__page = document.getElementById('container__page')
const modalContainer = document.querySelector('.modal__container') 
const register__target = document.querySelector('.register__target')
const registerTargetContainer = document.querySelector('.registerTargetContainer')
//others variables----------------------
const imgPass = document.getElementById("imgPassword")
let userGenderRegister = "none";
//events----------------------
lockPassword()
btnEnviar.addEventListener("click",()=>{
    realiceLogin()
})
btnRegisterId.addEventListener("click",()=>{
    accionarModalRegister()
})
btnRegistrarUser.addEventListener("click",()=>{
    accionarModalRegister()
    realiceRegister()
})
btnAceptarModal.addEventListener("click",()=>{
    desaparecerModal()
})
formGenderRegister.addEventListener("click",(eventGender)=>{
    let path = eventGender.path[0].defaultValue
    if(path == "hombre") userGenderRegister = "hombre"
    if(path == "mujer") userGenderRegister = "mujer"
    if(path == "otro") userGenderRegister = "otro"
})
//functions----------------------
function realiceRegister(){
    fetch('https://app-merca2.herokuapp.com/user/' + emailRegister.value)
    .then(res => res.json())
    .then(res =>validacionesRegister(res))
    .catch(console.log("¡Ups! ocurrio un error al crear el nuevo usuario,<br>"
                        + "intenta nuevamente"))
}
function validacionesRegister(respuesta){
    const   minLengthPhoneRegister = 5
    const   minLengthPasswordRegister = 3
    const   usuarioEnSistema = respuesta
    const   validacionesEmail = emailRegister.value.indexOf('@') > 0 
            && emailRegister.value.indexOf('.') > 0;
    const   validacionesPassword = passwordRegister.value.length >= minLengthPasswordRegister
    const   validacionesPhone = phoneRegister.value.length >= minLengthPhoneRegister
    const   validacionesCamposLlenos = emailRegister.value != "" 
            && passwordRegister.value !="" && nameRegister.value != "" 
            && phoneRegister.value != ""
    //---------------------------------------------
    if(!usuarioEnSistema){
        if(validacionesEmail){
            if(validacionesPhone){
                if(validacionesPassword){
                        if(userGenderRegister != "none"){
                            if(validacionesCamposLlenos){
                                let jsonEnviar = {
                                    name: nameRegister.value,
                                    email: emailRegister.value,
                                    pass: passwordRegister.value,
                                    type: "cliente",
                                    gender: userGenderRegister,
                                    number: phoneRegister.value
                                }
                                fetch("https://app-merca2.herokuapp.com/user/new",{
                                    method:"POST",
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8',
                                    },
                                    body:JSON.stringify(jsonEnviar)
                                })
                                .then(()=>{aparecerModal("¡Felicidades!,ahora eres un nuevo usuario")})
                                .catch(()=>{aparecerModal("ups algo fallo <br>intenta nuevamente")})
                            }else{
                                aparecerModal("porfavor, complete todos los campos")
                            }
                    }else{
                        aparecerModal("porfavor, especifique un genero");
                    }
                }else{
                    aparecerModal("contraseña no valida")
                }
            }else{
                aparecerModal("el numero telefonico es de " + phoneRegister.value.length + 
                        " caracteres<br>recuerde que minimo son "+ minLengthPhoneRegister +
                        " caracteres")
            }
        }else{
            aparecerModal("el email NO se pudo registrar")
        }
    }else{
        aparecerModal("Este Email ya a sido registrado anteriormente")
    }
}
function realiceLogin(){
    let usuarioNow;
    fetch('https://app-merca2.herokuapp.com/user/' + email.value)
    .then(res => res.json())
    .then(res =>{
        usuarioNow = res
        if(usuarioNow){
            usuarioNow = usuarioNow[0] 
            console.log(usuarioNow);
            if( usuarioNow.pass == password.value){
                
                console.log("vamos a enviar1");
                fetch("https://app-merca2.herokuapp.com/usernow/new",{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body:JSON.stringify(usuarioNow)
                })
                .then(res =>{
                    aparecerModal("Bienvenido " + usuarioNow.name)
                    console.log(res)
                    setTimeout(()=>{
                        redireccionarUrl('/-app-merca/html/landing.html')
                    },2500)
                })
                .catch(res =>{
                    aparecerModal("No se pudo enviar a usernow")
                    console.error(res)
                })

                
            }else{
                aparecerModal("¡Ups! intenta de nuevo")
            }
        }else{
            aparecerModal("No te encontramos <br> ¡Puedes registrarte!")
        }
    })
    .catch(aparecerModal("¡Ups! ocurrido un error,<br>intenta nuevamente"))
}
//realizar post para usernow con usiarioNow
function lockPassword(){
    imgPass.addEventListener('mouseover',function(){
        imgPass.src = "./img/login/padlock.png"
        password.type = 'text'
    }) 
    imgPass.addEventListener('mouseleave',function(){
        imgPass.src = "./img/login/lock.png"
        password.type = 'password'
    }) 
}
function aparecerModal(msj){
    modalMsj.innerHTML = msj
    modalContainer.classList.add('aparecer');
    modal.classList.add('trasladar')
    container__page.classList.add('doBlur')
}
function desaparecerModal(msj){
    modalMsj.innerHTML = msj
    modalContainer.classList.remove('aparecer');
    modal.classList.remove('trasladar')
    container__page.classList.remove('doBlur')
}
function accionarModalRegister(){
    container__page.classList.toggle('doBlur')
    registerTargetContainer.classList.toggle('aparecer')
    register__target.classList.toggle('trasladar')
}
console.log(window.location.origin);
function redireccionarUrl(donde){
    location.href=location.origin + donde
}
