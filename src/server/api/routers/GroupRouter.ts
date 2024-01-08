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
    getUsers: protectedProcedure.input(getUsersValidator).query(async ({ input, ctx }) => {
        const users = await ctx.db.group.findMany({
            select: {
                users: true
            }
        });

        return users;
    }),
    getMessages: protectedProcedure.input(getMessagesValidator).query(async ({ input, ctx }) => {
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
        
        return query.messages;
    })
});

export default GroupRouter;