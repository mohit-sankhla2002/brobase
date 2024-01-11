import { createTRPCRouter } from "~/server/api/trpc";
import MessageRouter from "./routers/MessageRouter";
import GroupRouter from "./routers/GroupRouter";
import UserRouter from "./routers/UserRouter";

export const appRouter = createTRPCRouter({
  group: GroupRouter,
  message: MessageRouter,
  user: UserRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
