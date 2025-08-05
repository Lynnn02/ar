const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HTTPS_PORT = 8443;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Request handler function
function handleRequest(req, res) {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Add CORS headers for AR.js
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle the root path
  let filePath = req.url === '/' 
    ? path.join(__dirname, 'index.html') 
    : path.join(__dirname, req.url);

  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set the content type based on the file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.error(`File not found: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
      } else {
        // Server error
        console.error(`Server error: ${error.code}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>Sorry, something went wrong on the server.</p>');
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      console.log(`Served ${filePath} as ${contentType}`);
    }
  });
}

// Create HTTP server
const server = http.createServer(handleRequest);

// Create HTTPS server with self-signed certificate
let httpsServer;
try {
  // Try to create HTTPS server (will work if you have certificates)
  const options = {
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('cert.pem', 'utf8')
  };
  httpsServer = https.createServer(options, handleRequest);
} catch (err) {
  console.log('HTTPS certificates not found. Creating self-signed certificates...');
  // We'll create a simple HTTP server that redirects to HTTPS when deployed
}

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
});

// Start HTTPS server if certificates are available
if (httpsServer) {
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running at https://localhost:${HTTPS_PORT}/`);
    console.log(`Use HTTPS for camera access on mobile devices`);
  });
} else {
  console.log('\n⚠️  IMPORTANT: For camera access on mobile devices, you need HTTPS.');
  console.log('When you deploy this, make sure to use a service that provides HTTPS.');
  console.log('For local testing, you can use ngrok or similar tools to create HTTPS tunnel.');
}
