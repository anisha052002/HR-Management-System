import { DemoResponse } from "../shared/api";

export default function handler(req: any, res: any) {
  const response: DemoResponse = {
    message: "Hello from Express server (now serverless)",
  };
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(response));
}
