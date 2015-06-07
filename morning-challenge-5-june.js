/**
 * Day three of building express: "chain of responsibility pattern".
 * app.route is used here to create an endpoint based on the url given.
 * And then in function app, the correct callback function for each url
 * is called.
 * The code also avoids errors with favicon.ico, and for nonexistant endpoints.
**/


/**
 * Let's build express!
 *
 * Step 3, chain of responsability pattern.
 *
 * Create a function named express() which behaves in the following way:
**/
var http = require('http');
function express () {
    // var sessionID = sess;
    // var userDb = user;
     var middlewareStore = [];
     var routes = {};
     function app (request, response) {
       var url = request.url.split('/');
        if (url[1] !== "favicon.ico") {
        console.log(url[1]);
         if (routes.hasOwnProperty('/' + url[1])) {
           routes['/' + url[1]](request, response);
         }
         else {
             response.write("<h1>404 not found</h1>");
             response.end();
         }
        app.handle(request, response);
     }
   };


     app.use = function (fn) {
       middlewareStore.push(fn);
     };

     app.route = function(route, callback) {
         routes[route] = callback;
        //  console.log(routes);
       }

     app.handle = function (request, response) {

         var index = 0;

         function next () {
            if(!middlewareStore[index]){return;}
            index++;
            middlewareStore[index - 1](request, response, next);

         }

         next();
     };
     console.log("server running");
     return app;
 }

var app = express();

app.use(function (req, res, next) {

    next();
});

app.route("/home", function (req, res) {
    res.write("<h1>Hello world!</h1>");
    res.end();
});

app.route("/info", function (req, res) {
    res.write("<h1>Info</h1>");
    res.end();
});

app.route("/", function (req, res) {
    res.write("<h1>Index page</h1>");
    res.end();
});

http.createServer(app).listen(3000);
