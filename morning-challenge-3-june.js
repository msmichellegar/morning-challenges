// Building the scaffolding for express...
// The function 'myAppStart' calls the function 'app'
// 'app' contains methods 'app.use' and 'app.handle', and invokes 'app.handle'
// 'app.use' takes functions passed as a param and stores them in
// 'middlewareStore' to be invoked later as "middleware"
// 'app.handle' invokes all the middleware functions one by one

function myAppStart () {

    var middlewareStore = [];

    function app () {
      app.handle();
    }

    app.use = function (fn) {
      middlewareStore.push(fn);
    };

    app.handle = function () {

        var index = 0;

        function next () {

            if (!middlewareStore[index]){
                return ;
            } else {
                index++;
                middlewareStore[index-1](next);
            }

        }

        next();
    };

    return app;
}

// testing the code

var app = myAppStart();

app.use(function logHello1 (next) {

    console.log("Hello 1!");
    next();
});

app.use(function logHello2 (next) {

    console.log("Hello 2!");
    next();
});

app();
