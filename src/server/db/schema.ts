// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm';
import {
  date,
  doublePrecision,
  index,
  pgTableCreator,
  serial,
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

export const posts = createTable(
  'post',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index('name_idx').on(example.name),
  }),
);

export const UsersTable = createTable('users', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .unique()
    .default(sql`uuid_generate_v4()`),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
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
  name: varchar('name', { length: 30 }).notNull(),
  balance: doublePrecision('balance').notNull().default(0),
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
  time: timestamp('time', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  description: varchar('description', { length: 30 }),
  category: varchar('category', { length: 30 }),
  value: doublePrecision('value').notNull().default(0),
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
  time: timestamp('time', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  value: doublePrecision('value').notNull().default(0),
  name: varchar('name', { length: 30 }),
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
  name: varchar('name', { length: 30 }).notNull(),
  value: doublePrecision('value').notNull().default(0),
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
  time: timestamp('time', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  value: doublePrecision('value').notNull().default(0),
});
