// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  doublePrecision,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => name);

export const UsersTable = createTable('users', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  picture: text('picture'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const BankAccountsTable = createTable('bank_accounts', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.id),
  name: varchar('name', { length: 50 }).notNull(),
  balance: doublePrecision('balance').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const TransactionsTable = createTable('transactions', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  accountId: uuid('account_id')
    .notNull()
    .references(() => BankAccountsTable.id),
  time: timestamp('time', { withTimezone: true }).notNull().defaultNow(),
  description: varchar('description', { length: 50 }).notNull(),
  category: varchar('category', { length: 50 }),
  value: doublePrecision('value').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const InvoicesTable = createTable('invoices', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  accountId: uuid('account_id')
    .notNull()
    .references(() => BankAccountsTable.id),
  lim: doublePrecision('lim').notNull().default(0),
  value: doublePrecision('value').notNull().default(0),
  dueDate: date('due_date').notNull(),
  paid: boolean('paid').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const PurchaseCategoriesTable = createTable('purchase-categories', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.id),
  name: varchar('name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const PurchasesTable = createTable('purchases', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  invoiceId: uuid('invoice_id')
    .notNull()
    .references(() => InvoicesTable.id),
  time: timestamp('time', { withTimezone: true }).notNull().defaultNow(),
  value: doublePrecision('value').notNull().default(0),
  description: varchar('description', { length: 50 }).notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => PurchaseCategoriesTable.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const InvestmentsTable = createTable('investments', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.id),
  name: varchar('name', { length: 50 }).notNull(),
  value: doublePrecision('value').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const InvestmentHistoryTable = createTable('investment_history', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  investmentId: uuid('investment_id')
    .notNull()
    .references(() => InvestmentsTable.id),
  time: timestamp('time', { withTimezone: true }).notNull().defaultNow(),
  value: doublePrecision('value').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const BudgetsTable = createTable(
  'budgets',
  {
    invoiceId: uuid('invoice_id')
      .notNull()
      .references(() => InvoicesTable.id),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => PurchaseCategoriesTable.id),
    value: doublePrecision('value').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.invoiceId, table.categoryId] }),
  }),
);
