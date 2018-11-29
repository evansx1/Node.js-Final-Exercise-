var https = require("https")
var userName='evansx1'

//se declara un objeto con la informacion necesaria por https.request para conectarse a la api
var infoApiToConnect = {
host :"api.github.com",
path : '/users/'+ userName +'/repos',
method : 'GET',
headers : {'user-agent' : 'Mozilla/4.0 (compatible, MSIE 7.0; Windows NT 6.0)'}
}

var request = https.request(infoApiToConnect, response =>{
var body = ''

//la informacion adquirida con el modulo https es leida como un stream de datos
//los stream son leidos por chunks de datos en formato ascii
//cada chuck es concatenado al anterior para tener el stream completo de informacion
response.on('data', chunk=>{
    body+=chunk
})

//el stream ahora almacenado en la varibale body se parsea a formato JSON
//para cada elemento del JSON se guarda un objeto con los atributos name y description en un array
//se muestra en consola el array con la informacion
response.on('end',() => {
    var json = JSON.parse(body)
    var repos =[]
    var cont = 0
    json.forEach(repo => {
        repos.push({
            name : repo.name,
            description : repo.description
        })
        cont += 1

    })

    //las condicion son:
    //si hay menos de 3 repositorios motrar el numero
    //si hay mas de tres repositorios mostrar 'there are a lor of repositories'
    //si no hay repositorios mostrar 'no repositories'

    switch (true) {

        case cont > 0 && cont < 3:
            console.log(`\nthere are ${cont} repositories:`)
            break;
        case cont > 3:
            console.log('there are a lot of repositories:')
            break;
            
        default:
            console.log('no repositories')
            break;
    }

//se hace un loop para recorrer cada elemento del array
//para mostrar en consola los atributos name y descripcion 
    repos.forEach(repo =>{
        console.log(`\nName: ${JSON.stringify(repo.name)} \nDescription: ${JSON.stringify(repo.description)} \n`)
    })
})

})

//si ocurre un error, este es capturado y se muestra en consola.
request.on('error', (e) => {
console.error('and the error is '+e)
})
request.end()