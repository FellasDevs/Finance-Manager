import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { UsersTable } from '~/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

const CreateUserSchema = createInsertSchema(UsersTable);

export const usersRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, ctx.user.id));

    if (!user)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      });

    return user;
  }),

  create: privateProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(UsersTable).values(input);
    }),
});
