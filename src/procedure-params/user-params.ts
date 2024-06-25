import { createInsertSchema } from 'drizzle-zod';
import { UsersTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseUserParams = createInsertSchema(UsersTable, {
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
  email: z.string().email(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateUserParams = BaseUserParams;
