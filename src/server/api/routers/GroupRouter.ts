import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const createGroupValidator = z.object({
    name: z.string(), 
})

const getUsersValidator = z.object({
    groupId: z.string()
})

const getMessagesValidator = z.object({
    groupName: z.string()
})

const GroupRouter = createTRPCRouter({
    getGroups: protectedProcedure.query(async ({ ctx }) => {
        const groups = await ctx.db.user.findFirst({
            select: {
                groups: true
            },
            where: {
                id: ctx.session.user.id
            },
            take: 50
        });

        return groups
    }),
    createGroup: protectedProcedure.input(createGroupValidator).mutation(async ({ ctx, input } ) => {
        const group = await ctx.db.group.findFirst({
            where: {
                name: input.name
            }
        });

        if (group) {
            return new TRPCError({ code: "CONFLICT" });
        }

        const newGroup = await ctx.db.group.create({
            data: {
                name: input.name, 
                users: {
                    connect: {
                        id: ctx.session.user.id
                    }
                }
            }
        });
        return newGroup;
    }),
    getUsers: protectedProcedure.input(getUsersValidator).query(async ({ ctx }) => {
        const users = await ctx.db.group.findMany({
            select: {
                users: true
            }
        });

        return users;
    }),
    getMessages: protectedProcedure.input(getMessagesValidator).query(async ({ input, ctx }) => {
        // TODO: Control the number of messages fetched
        const query = await ctx.db.group.findFirst({
            where: {
                name: input.groupName
            },
            select: {
                users: true, 
                messages: true
            },
        });

        if (!query?.users.find((user) => user.id === ctx.session.user.id)) {
            return new TRPCError({code: "UNAUTHORIZED"});
        }

        return query.messages.filter(async (message) => {
            const dbQuery = await ctx.db.user.findFirst({
                where: {
                    id: message.senderId
                },
                select: {
                    name: true
                }
            });

            const username = dbQuery?.name;
            return {
                payload: message.payload, 
                senderName: username, 
                createdAt: message.createdAt
            }
        });
    }),

});

export default GroupRouter;