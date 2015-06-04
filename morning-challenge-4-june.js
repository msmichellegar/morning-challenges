var http = require('http');
var port = 3000;

function express () {

    var middlewareStore = [];

    function app (request, response) {

        // ...do something here
        app.handle(request, response);

    }

    app.use = function (fn) {

        // ...code here
        middlewareStore.push(fn);
    };

    app.handle = function (request, response) {

        var index = 0;

        function next () {
            var lay = middlewareStore[index];
            index++;
            if(!lay){return};
            lay(request, response, next);
        }

        next();
        response.end();
    };

    return app;
}


 var myApp = express();

// myApp.use(function (jump) {

//     setTimeout(function(){

//         console.log("Hello 1!");
//         jump();

//     }, 1000)

// });

// myApp.use(function (jump) {

//    console.log("Hello 2!");
//    jump();
// });

// // call our app()
// myApp();

var sessionDb = [
    {sessionId: "adk489sjhk", userId: "879423"},
    {sessionId: "z4sdfjd4df", userId: "092381"},
    {sessionId: "j49834fd4a", userId: "765836"}
];

var userDb = [
    {id: "879423", name: "Foo"},
    {id: "092381", name: "Bar"},
    {id: "765836", name: "Zoo"}
];

myApp.use(function sessionParser (request, response, next){

    // some code here...
    var session = request.url.split('session=')[1];
    for(var i = 0; i<sessionDb.length;i++){

        if(sessionDb[i].sessionId === session){

            request._id = sessionDb[i].userId;
        }
    }

    next();

});

myApp.use(function handlerRequest (request, response, next) {

    // more code here...
    for(var i = 0; i<userDb.length;i++){

        if(userDb[i].id === request._id){
            var user = userDb[i].name;
            response.write('<h1>Good morning, '+ user + '! :)</h1>');
        }
    }
});

var server = http.createServer(myApp).listen(port);

console.log('Server running on localhost port' +port);

/**
 * By going to "http://localhost:3000?session=adk489sjhk" you should
 * see a page with <h1>Welcome back Foo</h1>.
 *
 * In the same way if you request "http://localhost:3000?session=j49834fd4a"
 * you should receive back <h1>Welcome back Zoo</h1>.
 */
