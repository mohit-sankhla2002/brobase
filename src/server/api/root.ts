import { createTRPCRouter } from "~/server/api/trpc";
import MessageRouter from "./routers/MessageRouter";
import GroupRouter from "./routers/GroupRouter";

export const appRouter = createTRPCRouter({
  group: GroupRouter,
  message: MessageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
