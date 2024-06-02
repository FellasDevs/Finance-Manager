import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { UsersTable } from '~/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';

const CreateUserSchema = createInsertSchema(UsersTable);

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(UsersTable).values(input);
    }),
});
