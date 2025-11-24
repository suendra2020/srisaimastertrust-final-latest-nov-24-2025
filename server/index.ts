import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Security middleware
  app.use(helmet());

  // Redirect HTTP → HTTPS in production
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (
      process.env.NODE_ENV === "production" &&
      req.headers["x-forwarded-proto"] !== "https"
    ) {
      return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
  });

  const server = createServer(app);

  // ------------------------
  // ✔ Correct static path
  // ------------------------
  const staticPath = path.resolve(__dirname, "../dist");

  // Static assets
  app.use(express.static(staticPath));

  // SPA fallback – serve index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);
