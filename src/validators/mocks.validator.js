import { z } from 'zod';

export const mockedUsersSchema = z.object({
  users: z.coerce.number().int().min(0),
});

export const mockedPetsSchema = z.object({
  pets: z.coerce.number().int().min(0),
});

export const mockedDataSchema = z.object({
  users: z.coerce.number().int().min(0),
  pets: z.coerce.number().int().min(0),
});
