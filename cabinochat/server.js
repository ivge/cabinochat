//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/cabinochat'));

app.get('/video', function (req, res) {
    const path = 'video/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/cabinochat/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);