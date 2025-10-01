import type { IncomingMessage, ServerResponse } from "http";

declare global {
  /**
   * Controller/handler type
   */
  type RouteHandler = (
    req: IncomingMessage,
    res: ServerResponse,
    bodyChunk?:string
  ) => void | Promise<void>;

  /**
   * Metadata for defining a server route
   */
  interface ServerRoute {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    handler: RouteHandler;
  }
}

export {}; // keep the file a module
