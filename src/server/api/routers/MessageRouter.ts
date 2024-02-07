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
            },
            select: {
                sender: true,
                payload: true,
                senderId: true, 
                groupId: true,
                id: true,
                createdAt: true
            }
        });

        const modifiedMessages = messages.map((message) => {
            return {
                id: message.id, 
                groupId: message.groupId, 
                senderId: message.senderId, 
                username: message.sender.name,
                createdAt: message.createdAt,
                payload: message.payload
            }
        })

        return modifiedMessages;
    }),
});

export default MessageRouter;