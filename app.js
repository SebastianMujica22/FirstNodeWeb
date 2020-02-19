const axios = require("axios")
const http = require('http')
const fs = require("fs")
const url = "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json"


//crear servidor





function sendData(callback) {
    http.createServer((req, res) => {
        console.log("holi")
        callback(res)
    }).listen(8080)
}

// sendData(res => {
//     fs.readFile("axios.js", (err, data) => {
//         res.write("hola"); //leer el archivo html y enviarlo
//         res.end()
//     })
//     }
// )


// abrir archivo


function readHtml( callback ){
    fs.readFile("index.html", (err, data) => {
        callback(data.toString())
    })
}



// leer el json y escribir el html




axios.get(url)
    .then(response => {
        let nuevoTexto = escribirHtml(response.data)
        readHtml( res => {
            let x = res.replace("replace", nuevoTexto)
            sendData(servidor => {
                fs.readFile("app.js", (err, data) => {
                    servidor.write(x); //leer el archivo html y enviarlo
                    servidor.end()
                })
                }
            )
        })
    })


const escribirHtml = function (data) {
    let texto = "";
    data.forEach(element => {
        texto += '<div class="accordion" id="accordionExample">'
        texto += '<div class="card">'
        texto += '<div class="card-header" id="headingOne">'
        texto += '<h2 class="mb-0">'
        texto += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+element.name.replace(/\s/g, '')+'" aria-expanded="true" aria-controls="collapseOne">'
        texto += element.name
        texto += '</button>'
        texto += '</h2>'
        texto += '</div>'
        texto += '<div class="container">'
        texto += '<div class="row">'

        element['products'].forEach(p => {
            texto += '<div class="col-4">'
            texto += '<div id="collapse'+element.name.replace(/\s/g, '')+'" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">'
            texto += '<div class="card mt-3" style="width: 18rem;">'
            texto += '<img src="p.image" class="card-img-top" alt="' + p.name + '"></img>'
            texto += ' <div class="card-body">'
            texto += '<h5 class="card-title">' + p.name + '</h5>'
            texto += '<p class="card-text">' + p.description + '</p>'
            texto += '<h5 class="card-title">' + p.price + '</h5>'
            texto += '<a href="#" class="btn btn-primary"> Add to car</a>'
            texto += '</div>'
            texto += '</div>'
            texto += '</div>'
            texto += '</div>'
        })
        texto += '</div>'
        texto += '</div>'


    });
    return texto;
}
