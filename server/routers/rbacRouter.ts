import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { roles, userRoles } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const rbacRouter = router({
  // List all roles
  listRoles: publicProcedure.query(async () => {
    const db = getDb();
    return await db.select().from(roles);
  }),

  // Create role
  createRole: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      permissions: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(roles).values({
        name: input.name,
        description: input.description,
        permissions: input.permissions || [],
      });
      return { id: Number(result.insertId), ...input };
    }),

  // Update role
  updateRole: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      permissions: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(roles)
        .set({
          name: input.name,
          description: input.description,
          permissions: input.permissions,
        })
        .where(eq(roles.id, input.id));
      return { success: true };
    }),

  // Delete role
  deleteRole: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(roles).where(eq(roles.id, input.id));
      return { success: true };
    }),

  // Assign role to user
  assignRole: publicProcedure
    .input(z.object({
      userId: z.string(),
      roleId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(userRoles).values({
        userId: input.userId,
        roleId: input.roleId,
      });
      return { id: Number(result.insertId) };
    }),

  // Get user roles
  getUserRoles: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(userRoles).where(eq(userRoles.userId, input.userId));
    }),
});
