import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const createGroupValidator = z.object({
  name: z.string(),
});

const getUsersValidator = z.object({
  groupId: z.string(),
});

const getMessagesValidator = z.object({
  groupName: z.string(),
});

const AddUserToGroupValidator = z.object({
  groupId: z.string(), 
  userId: z.string()
});

const RemoveUserFromGroupValidator = z.object({ 
  groupId: z.string()
 });

const GroupRouter = createTRPCRouter({
  getGroups: protectedProcedure.query(async ({ ctx }) => {
    const groups = await ctx.db.user.findFirst({
      select: {
        groups: true,
      },
      where: {
        id: ctx.session.user.id,
      },
      take: 50,
    });

    return groups;
  }),

  addUserToGroup: protectedProcedure.input(AddUserToGroupValidator).mutation(async ({ ctx, input }) => {
    await ctx.db.group.update({
      where: {
        id: input.groupId
      },
      data: {
        users: {
          connect: {
            id: input.userId
          }
        }
      }
    });

    return true;
  }),

  removeUserFromGroup: protectedProcedure.input(RemoveUserFromGroupValidator).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.group.findFirst({
      where: {
        id: input.groupId
      },
      select: {
        users: true
      }
    });

    if (!res) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Group with given id does not exist" });
    }

    const user = res.users.find((user) => user.id === ctx.session.user.id);

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User does not belong to the group" });
    }


    await ctx.db.group.update({
      where: {
        id: input.groupId
      },
      data: {
        users: {
          disconnect: {
            id: ctx.session.user.id
          }
        }
      }
    });

  }),

  createGroup: protectedProcedure
    .input(createGroupValidator)
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.group.findFirst({
        where: {
          name: input.name,
        },
      });

      if (group) {
        return new TRPCError({ code: "CONFLICT" });
      }

      const newGroup = await ctx.db.group.create({
        data: {
          name: input.name,
          users: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return newGroup;
    }),
  getUsers: protectedProcedure
    .input(getUsersValidator)
    .query(async ({ input, ctx }) => {
      const query = await ctx.db.group.findUnique({
        where: {
          id: input.groupId,
        },
        select: {
          users: true,
        },
      });

      return query?.users;
    }),
  getMessages: protectedProcedure
    .input(getMessagesValidator)
    .query(async ({ input, ctx }) => {
      // TODO: Control the number of messages fetched
      const query = await ctx.db.group.findFirst({
        where: {
          name: input.groupName,
        },
        select: {
          users: true,
          messages: true,
        },
      });

      if (!query?.users.find((user) => user.id === ctx.session.user.id)) {
        return new TRPCError({ code: "UNAUTHORIZED" });
      }

      return query.messages.filter(async (message) => {
        const dbQuery = await ctx.db.user.findFirst({
          where: {
            id: message.senderId,
          },
          select: {
            name: true,
          },
        });

        const username = dbQuery?.name;
        return {
          payload: message.payload,
          senderName: username,
          createdAt: message.createdAt,
        };
      });
    }),
});

export default GroupRouter;
