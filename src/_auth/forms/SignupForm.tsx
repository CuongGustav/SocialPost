"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SignupValidation from "@/lib/validation"
import Loading from "@/components/ui/shared/Loader"
import { Link } from "react-router-dom"

import { createUserAccount } from "@/lib/appwrite/api"

const SignupForm = () => {
    const isLoading = false 
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser =  await createUserAccount(values)
        console.log(newUser)
    }

    return (
        <Form {...form}>
            <div className="flex-center flex-col">
                <img className="my-0 mx-auto" src="/assets/images/logo.png" alt="Logo" />
                <h1 className="text-2xl font-medium pt-5">Create a new account</h1>

                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="flex flex-col gap-5 w-full mt-4 u"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shadow-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shadow-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shadow-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shadow-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit"
                        className="bg-blue-500"
                    >
                        {isLoading ? (
                            <div className="flex-center gap-2">
                                <Loading/> Loading...
                            </div>
                        ) : (
                            <div>Sign up</div>
                        )}
                    </Button>

                    <p>
                        You have an account ? 
                        <Link to="/sign-in" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            
            </div>   
        </Form>
    )
}

export default SignupForm
