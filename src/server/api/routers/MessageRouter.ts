import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

// TODO: make the messages as an infinite query
// the user fetches the messages of a group. So he gives group id accordingly

// getMessagesValidator
const getMessagesValidator = z.object({
    groupId: z.string()
})

const createMessageValidator = z.object({

})

const MessageRouter = createTRPCRouter({
    getMessages: protectedProcedure.input(getMessagesValidator).query(async ({ input, ctx }) => {
        const messages = await ctx.db.message.findMany({
            where: {
                groupId: input.groupId
            }
        });
        return messages;
    }),
    createMessage: protectedProcedure.input(createMessageValidator).mutation(({ input, ctx }) => {
        
    })
});

export default MessageRouter;