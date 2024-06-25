import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { UsersTable } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { CreateUserParams } from '~/procedure-params/user-params';

export const usersRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, ctx.user.id));

    return user;
  }),

  create: publicProcedure
    .input(CreateUserParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(UsersTable).values(input);
    }),
});
