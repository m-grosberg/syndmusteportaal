import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
const createServer = () => {
  const server = new McpServer({ name: "hello", version: "1.0.0" });
  server.registerTool("say-hello", { description: "Tervitab." }, async () => ({ content: [{ type: "text", text: "Tere!" }] }));
  return server;
};
void serveStdio(createServer);