const http = require("http");
const { URL } = require("url");

const PORT = 3000;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString();

      if (data.length > 1_000_000) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });

    req.on("end", () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = fullUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (method === "GET" && (path === "/" || path === "")) {
    if (fullUrl.searchParams.has("message")) {
      res.statusCode = 200;
      return res.end(JSON.stringify({ msg: "Hello, How are you?" }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({ msg: "Hello" }));
  }

  if (method === "POST" && path === "/api/sayhi") {
    try {
      const body = await readJsonBody(req);

      const name = body?.name;
      if (!name) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ msg: "Name is required" }));
      }

      res.statusCode = 200;
      return res.end(JSON.stringify({ msg: `Hello ${name}, How are you?` }));
    } catch (err) {

      res.statusCode = 400;
      return res.end(JSON.stringify({ msg: err.message }));
    }
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ msg: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});