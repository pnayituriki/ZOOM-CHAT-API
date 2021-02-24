const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    console.log('req.url...', req.url);
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;
    path = path.replace(/^\/+|\/+$/g, "");
    console.log("path...", path);
    // let qs = parsedURL.query;
    // let headers = req.headers;
    let method = req.method.toLowerCase();

    if (method === 'get') {
        switch (path) {
            case 'api/rooms':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Route for Chat GET' }));
                break;
            case 'api/rooms/:id':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Route for Chat GET' }));
                break;
            default:
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(404);
                res.write(JSON.stringify({ message: 'Route not found GET' }));
                break;
        }

    } else if (method == 'post') {
        switch (path) {
            case 'api/create-user':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Create New User' }));
                break;
            case 'api/login-user':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Login User' }));
                break;
            case 'api/logout-user':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Logout User' }));
                break;
            case 'api/create-room':
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200);
                res.write(JSON.stringify({ message: 'Logout User' }));
                break;
            default:
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(404);
                res.write(JSON.stringify({ message: 'Route not found POST' }));
                break;
        }
    }

    res.end();
});

server.listen(PORT, (error) => {
    if (error) { console.log(`Server API something went wrong ${error}`) } else { console.log(`Server API is running on port ${PORT}`) }
});