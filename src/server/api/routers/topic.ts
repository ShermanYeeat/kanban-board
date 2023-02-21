import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const { prisma, session } = ctx;
    return prisma.topic.findMany({
      where: {
        userId: session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      return prisma.topic.create({
        data: {
          title: input.title,
          userId: session.user.id,
        },
      });
    }),
});
