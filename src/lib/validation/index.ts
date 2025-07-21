import { z } from "zod"

const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Name to short'}),
    username:z.string().min(2, {message: 'Username to short'}),
    email: z.email({message: 'Invalid email address'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
})

export default SignupValidation