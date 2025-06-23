const http = require("http");
const fs = require("fs"); // import file system module

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <h1>Please Redirect to the <a href="/input">Input</a></h1>    
    `);
    return res.end();
  }

  if (url === "/input") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <form action="/result" method="POST">
        <input type="text" name="result"/>
        <button type="submit">Submit</button>
      </form>  
    `);
    return res.end();
  }

  if (url === "/result" && method === "POST") {
    const bodyChunks = [];

    req.on("data", (chunk) => {
      bodyChunks.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(bodyChunks).toString();
      const message = parsedBody.split("=")[1]; // extracting value from: result=Hello

      // Write the input to a file
      fs.writeFile("userInput.txt", decodedMessage, (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/html");
          res.write("<h1>Something went wrong while writing to the file.</h1>");
          return res.end();
        }

        res.setHeader("Content-Type", "text/html");
        res.write(`<h1>Saved Message: ${decodedMessage}</h1>`);
        return res.end();
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
