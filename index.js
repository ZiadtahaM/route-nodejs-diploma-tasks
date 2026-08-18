const http = require('http');
const { parse, format, isAbsolute } = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/path-info') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const filePath = JSON.parse(body).filePath;
            const parsedPath = parse(filePath);


            const joinedPath = join(filePath, 'file1.txt');
            const isAbsolute = isAbsolute(filePath);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                root: parsedPath.root,
                dir: parsedPath.dir,
                base: parsedPath.base,
                ext: parsedPath.ext,
                formattedPath: format(parsedPath),
joinedPath,isAbsolute   : parsedPath.isAbsolute                         
            }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//2
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('file', () => {
  console.log('Hello, World!');
});

emitter.emit('greet'); // Output: Hello, World!
fs.watch('example.txt', (f, filename) => {
    console.log(`File ${filename} changed: ${eventType}`);
  });
  //2
  const http = require('http');
const fs = require('fs');
const { parse, format, isAbsolute, join } = require('path');
const EventEmitter = require('events');

const emittr = new EventEmitter();

emittr.on('fileCreated', (filename) => {
  console.log(`Event emitted: fileCreated for ${filename}`);
});


emittr.on('fileDeleted', (filename) => {
  console.log(`Event emitted: fileDeleted for ${filename}`);
});

const serverr = http.createServer((req, res) => {


  if (req.method === 'POST' && req.url === '/create-file') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const { filename } = JSON.parse(body);

      fs.writeFile(filename, 'File content', (err) => {
        if (err) {
          console.error('Error creating file:', err);
          res.writeHead(500);
          res.end('Error creating file');
        } else {
       
          emitter.emit('fileCreated', filename);
          res.writeHead(201);
          res.end('File created successfully');
        }
      });
    });
  } else if (req.method === 'DELETE' && req.url === '/delete-file') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const { filename } = JSON.parse(body);

      fs.unlink(filename, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          res.writeHead(500);
          res.end('Error deleting file');
        } else {
          
          emitter.emit('fileDeleted', filename);
          res.writeHead(200);
          res.end('File deleted successfully');
        }
      });
    });
  } else {
 res.writeHead(404);
  }
});

serverr.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//3
const http = require('http');
const os = require('os');

const serve = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/system-info') {
    const systemInfo = {
      architecture: os.arch(),
      platform: os.platform(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem(),
    };

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(systemInfo));
  } else {
    
    res.writeHead(404);
    res.end('Not Found');
  }
});

serve.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//4
const http = require('http');
const fs = require('fs');
const path = require('path');

const servr = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/create-file') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { filename } = JSON.parse(body);

            fs.writeFile(filename, 'File content', (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    res.writeHead(500);
                    res.end('Error creating file');
                } else {
                    res.writeHead(201);
                    res.end('File created successfully');
                }
            });
        });
    } else if (req.method === 'DELETE' && req.url === '/delete-file') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { filename } = JSON.parse(body);

            fs.unlink(filename, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    res.writeHead(500);
                    res.end('Error deleting file');
                } else {
                    res.writeHead(200);
                    res.end('File deleted successfully');
                }
            });
        });
    } else if (req.method === 'POST' && req.url === '/append-async') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { filename, content } = JSON.parse(body);
            const filePath = path.join(__dirname, filename);

            fs.appendFile(filePath, content, (err) => {
                if (err) {
                    console.error('Error appending to file:', err);
                    res.writeHead(500);
                    res.end('Error appending to file');
                } else {
                    res.writeHead(200);
                    res.end('Content appended successfully');
                }
            });
        });
    } else if (req.method === 'POST' && req.url === '/read-async') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { filename } = JSON.parse(body);
            const filePath = path.join(__dirname, filename);

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    res.writeHead(500);
                    res.end('Error reading file');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
        });
    } else {
        
        res.writeHead(404);
        res.end('Not Found');
    }
});

servr.listen(3000, () => {
    console.log('Server listening on port 3000');
});
//5

if (req.method === 'POST' && req.url === '/stream-file') {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const { filename } = JSON.parse(body);
        const filePath = path.join(__dirname, filename);

        const readStream = fs.createReadStream(filePath, { highWaterMark: 16 });

        readStream.on('open', () => {
            console.log('Stream opened');
        });

        readStream.on('data', (chunk) => {
            console.log('Data event received:', chunk.toString()); })})}
            