import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { joinGroup, sendMessage } from "~/lib/socket";
// TODO: make the messages as an infinite query
// the user fetches the messages of a group. So he gives group id accordingly

// getMessagesValidator
const getMessagesValidator = z.object({
    groupId: z.string()
})

const sendMessageValidator = z.object({
    groupName: z.string(), 
    payload: z.string(),
    type: z.enum(["text", "video", "image"])
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
    sendMessage: protectedProcedure.input(sendMessageValidator).mutation(async ({ input, ctx }) => {
        const { payload, groupName, type } = input;
        const user = await ctx.db.user.findUnique({
            where: {
                id: ctx.session.user.id
            },
            include: {
                groups: true
            }
        });

        if (!user) {
            return new TRPCError({ code: "UNAUTHORIZED" });
        }

        const group = 

        sendMessage({ groupId: groupId, payload: payload });


    })
});

export default MessageRouter;