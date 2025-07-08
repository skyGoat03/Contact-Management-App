const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Show form on GET "/"
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  // Handle POST to "/message"
  if (url === "/message" && method === "POST") {
    const body = [];

    // Collect request body chunks
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // Once body is fully received
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // example: message=hello
      const message = parsedBody.split("=")[1]; // extract message value

      fs.writeFileSync("message.txt", message); // write to file

      // Redirect to homepage
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  // Default fallback for other routes
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);
