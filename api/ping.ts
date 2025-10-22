import { IncomingMessage, ServerResponse } from "http";

// Simple Vercel serverless function for /api/ping
export default function handler(req: any, res: any) {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ message: ping }));
}
