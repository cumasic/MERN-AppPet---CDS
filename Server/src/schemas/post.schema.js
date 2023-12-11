import {z} from "zod";

export const createPostSchema = z.object({
	description: z
		.string({
			required_error: 'Description is required',
    }),
	photo: z
		.string({
			required_error: 'Photo must be a image',
		})
		.optional(),
	date: z.string().datetime().optional(),
});