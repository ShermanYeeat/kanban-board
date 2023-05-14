import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TicketStatus } from "~/types/ticket";

export const ticketRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.ticket.findMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        points: z.number(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.ticket.create({
        data: {
          title: input.title,
          projectId: input.projectId,
          content: input.content,
          points: input.points,
          status: TicketStatus.TO_DO,
        },
      });
    }),
  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.ticket.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.ticket.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
