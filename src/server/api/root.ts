import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { bankAccountsRouter } from '~/server/api/routers/bank-accounts-router';
import { transactionsRouter } from '~/server/api/routers/transactions-router';
import { usersRouter } from '~/server/api/routers/users-router';
import { invoicesRouter } from '~/server/api/routers/invoices-router';
import { purchaseCategoriesRouter } from '~/server/api/routers/purchase-categories-routes';
import { PurchasesRouter } from '~/server/api/routers/purchases-router';
import { budgetsRouter } from '~/server/api/routers/budgets-router';
import { investmentsRouter } from '~/server/api/routers/investments-router';
import { investmentsHistoryRouter } from '~/server/api/routers/investments-history-router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bankAccounts: bankAccountsRouter,
  transactions: transactionsRouter,
  invoices: invoicesRouter,
  users: usersRouter,
  purchases: PurchasesRouter,
  purchaseCategories: purchaseCategoriesRouter,
  budgets: budgetsRouter,
  investments: investmentsRouter,
  investmentsHistory: investmentsHistoryRouter,
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
