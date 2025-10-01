import dotenv from "dotenv";
import http, { IncomingMessage } from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

dotenv.config();

// ES module equivalent of __dirname
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes: ServerRoute[] = [];

//load all routes from routes folder
const routesDir = path.join(__dirname, "routes");

// Check if routes directory exists
if (fs.existsSync(routesDir)) {
  const routeFiles = fs.readdirSync(routesDir)
    .filter(file => file.endsWith('.js')); // Only import .js files

  for (const file of routeFiles) {
    const routePath = path.join(routesDir, file);
    // Convert Windows path to file:// URL for dynamic import
    const routeURL = url.pathToFileURL(routePath).href;
    const routerFile = await import(routeURL);
    
    // Handle different export formats
    const routeExport = routerFile.default || routerFile;
    
    if (Array.isArray(routeExport)) {
      routes.push(...routeExport);
    } else {
      routes.push(routeExport);
    }
  }
}

console.log(`Loaded ${routes.length} routes:`);
routes.forEach(r => console.log(`  ${r.method} ${r.path}`));

// helper to read body
function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

const server = http.createServer(async (req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  
  const route = routes.find(
    (r) => r.method === req.method && req.url?.startsWith(r.path)
  );

  if (route) {
    let bodyChunk = "";
    if (req.method === "POST" || req.method === "PUT") {
      bodyChunk = await parseBody(req);
    }

    return route.handler(req, res, bodyChunk);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));