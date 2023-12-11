import {z} from "zod";

export const registerSchema = z.object({
  username: z
		.string({
		required_error: 'Username is required',
	}),
	email: z
		.string({
			required_error: 'Email is required',
    })
		.email({
			message: 'Invalid email',
    }),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(6,{
			message: 'Password must be at least 6 characters',
		}),
	phone: z
		.string({
			required_error: 'Phone is required',
		})
		.min(6,{
			message: 'Number Phone must be at least 6 characters',
		}),
	address: z
		.string({
			required_error: 'Address must be a String',
		})
		.optional(),
	photo: z
		.string({
			required_error: 'Address must be a Image',
		})
		.optional(),
});

export const loginSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required',
    })
		.email({
			message: 'Invalid email',
    }),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(6,{
			message: 'Password must be at least 6 characters',
		})
});