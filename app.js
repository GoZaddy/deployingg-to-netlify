var http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer();

server.on("request", function(req,res){
    if (req.url == "/"){
        const indexFile = path.join(__dirname, "public", "index.htm")
        const filedata = fs.readFileSync(indexFile)
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(filedata);   
    } else if (req.url == "//ws" || req.url == "/favicon.ico"){

    }

    else{
        const filename = req.url.slice(1)
        const filepath = path.parse(filename)
        const pathToBeUsed = path.join(__dirname, "public", ...filename.split("/"))
        console.log(filepath.ext)
        let contentType = "";
        if (filepath.ext == ".html"|| filepath.ext == ".htm"){
            contentType = "text/html"
        }
        else if (filepath.ext == ".css"){
            contentType = "text/css"
        }
        else if (filepath.ext == ".json"){
            contentType = "application/json"
        }
        else {
            contentType = "text/plain"
        }
        res.writeHead(200, { "Content-type": contentType });
        res.end(fs.readFileSync(pathToBeUsed)); 

    }

})

server.listen(3000, function() {
    console.log('Server is running at 3000')
});