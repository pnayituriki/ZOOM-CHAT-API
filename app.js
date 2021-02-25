const http = require('http');
const url = require('url');
const { authUser, createUser } = require('./controllers/userController');
const { getRooms, createRoom } = require('./controllers/roomController');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    console.log('req.url...', req.url);
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;
    // path = path.replace(/^\/+|\/+$/g, "");
    // console.log("path...", path);
    let qs = parsedURL.query;
    // console.log("req...", req);
    // let headers = req.headers;
    let method = req.method.toLowerCase();

    if (method === 'get') {
        // if (path === '/api/rooms') {
        //     allUser(req, res);
        // } else if (path.match(/\/api\/rooms\/([0-9]+)/)) {
        //     const user_id = path.split('/')[3];
        //     console.log('uid:', user_id);
        //     getRooms(req, res, user_id);
        //     // res.setHeader("Content-Type", "application/json");
        //     // res.setHeader("Access-Control-Allow-Origin", "*");
        //     // res.writeHead(200);
        //     // res.write(JSON.stringify({ message: 'Route for Chat GET' }));
        //     // res.end();
        // } else {
        //     res.setHeader("Content-Type", "application/json");
        //     res.setHeader("Access-Control-Allow-Origin", "*");
        //     res.writeHead(404);
        //     res.write(JSON.stringify({ message: 'Route not found GET' }));
        //     res.end();
        // }
        switch (path) {
            case '/api/rooms':
                getRooms(req, res);
                break;
            default:
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(404);
                res.write(JSON.stringify({ message: 'Route not found GET' }));
                res.end();
                break;
        }

    } else if (method == 'post') {
        switch (path) {
            case '/api/create-user':
                createUser(req, res);
                // console.log('Body: ' + body)

                // res.setHeader("Content-Type", "application/json");
                // res.setHeader("Access-Control-Allow-Origin", "*");
                // res.writeHead(200);
                // res.write(JSON.stringify({ message: 'Create New User' }));
                // res.end();
                break;
            case '/api/login-user':
                authUser(req, res);
                break;
            case '/api/logout-user':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Logout User' }));
                res.end();
                break;
            case '/api/create-room':
                console.log("yes")
                createRoom(req, res);
                break;
            default:
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(404);
                res.write(JSON.stringify({ message: 'Route not found POST' }));
                res.end();
                break;
        }
    }

    // res.end();
});

server.listen(PORT, (error) => {
    if (error) { console.log(`Server API something went wrong ${error}`) } else { console.log(`Server API is running on port ${PORT}`) }
});