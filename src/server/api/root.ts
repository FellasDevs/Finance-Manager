import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { bankAccountsRouter } from '~/server/api/routers/bank-accounts-router';
import { transactionsRouter } from '~/server/api/routers/transactions-router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bankAccounts: bankAccountsRouter,
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
