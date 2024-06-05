import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { UsersTable } from '~/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { eq } from 'drizzle-orm';

const CreateUserSchema = createInsertSchema(UsersTable);

export const usersRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, ctx.user.id));

    return user;
  }),

  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(UsersTable).values(input);
    }),
});
