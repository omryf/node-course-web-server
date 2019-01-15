const express = require('express');
const port = process.env.Port || 3000
let server = express();
const hbs = require('hbs');
let maint = false;
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentDate', ()=>{
    return new Date().getFullYear();
});
server.set('view engine', 'hbs');

//middleware:
server.use((request, response, next)=>{  
    console.log(`${new Date().toString()} ${request.method} : ${request.url}`); //rquest and response attributes can be found in expressjs.com/api reference
    next();
});
//middleware for maintenance:
server.use((request, response, next)=>{  
    if (maint==false){
        next();
    }
    else{
        response.render('maint.hbs');
    }
});
server.use(express.static(__dirname+'/public'));//should be last of the use commands

server.get('/', (request, response)=>{
    response.render('home.hbs', {
        title: 'Home page',
        welcome: 'Good day boys and girls. its '+new Date().toTimeString()+' !!',
        //currentYear: new Date().getFullYear()
    });
 });
server.get('/user', (request, response)=>{
    response.send ({
        user: 'Omry',
        age: 53,
        placeOfBirth: 'Afikim',

        residence: 'Kfar Saba',
        kids: [
            'Nitsan',
            'Aviv',
            'Shahar'
        ]
    });
});
server.get('/bad', (request, response)=>{
    response.send({
        errorMessage: 'Somthing went wrong! don\'t come back!'
    })
});
server.get('/about', (request, response)=>{
    response.render('about.hbs', {
        title: 'About page',
        //date: new Date().getFullYear()
    });
});
server.listen(port, ()=>{
    //Initialize if you need
    console.log (`server is running on port ${port}`);
});