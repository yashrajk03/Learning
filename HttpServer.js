
const http = require('http');
const url = require('url');

// Create server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Extract pathname and query parameters
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Log the full parsed URL object for debugging
  console.log('Parsed URL:', parsedUrl);

  // Basic routing based on pathname
  switch (path) {
    case '/':
      res.end('Home Page');
      break;
    case '/about':
      res.end('About Page');
      break;
    case '/contact':
      res.end('Contact Page');
      break;
    default:
      res.end('404 Not Found');
  }

  // Example of printing query parameters if any
  if (Object.keys(query).length > 0) {
    console.log('Query Parameters:', query);
    // You can use query parameters in your server logic
  }
});

// Start server on port 8000
server.listen(8000, () => {
  console.log('Server started at http://localhost:8000');
});
