import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { protectedProcedure } from "../trpc";

const GetUsersByNameValidator = z.object({
    username: z.string()
})

const UserRouter = createTRPCRouter({
    getUsersByName: protectedProcedure.input(GetUsersByNameValidator).query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany({
            where: {
                name: {
                    startsWith: input.username
                }, 

            }
        });


        return users;
    })
});

export default UserRouter;