"use client"
import * as z from "zod"
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form } from "@/components/ui/form"
import { Button } from "../ui/button";
import { Footer } from "./footer";
import { login } from "@/actions/login";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SuccessNotification } from "./SuccessNotification";


export const LoginForm = () => {
   const searchParams = useSearchParams();
const router = useRouter();
const [showSuccess, setShowSuccess] = useState(false);

useEffect(() => {
  if (searchParams.get("status") === "success") {
    setShowSuccess(true);

    const timeout = setTimeout(() => {
      setShowSuccess(false);
      router.replace("/", { scroll: false }); // efface ?status=success de l'URL
    }, 3000);

    return () => clearTimeout(timeout);
  }
}, [searchParams, router]);


    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then((data) => {
                if (data.success) {
                    window.location.href = data.redirectTo;
                }
            });
        });
    }

    return (
        <div className="min-h-[calc(100dvh)] flex items-center justify-center p-4 ">
           

            <div className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-border mx-4">
                {showSuccess && (
    <div className="mb-4">
      <SuccessNotification message="Account created successfully. You can now log in." />
    </div>
  )}
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-primary mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-muted-foreground">Sign in to continue</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
                                    Email
                                </Label>
                                <Input
                                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground
                                    focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                    type="email"
                                    id="email"
                                    {...form.register("email")}
                                    placeholder="john.doe@example.com"
                                    disabled={isPending}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium text-foreground mb-2" htmlFor="password">
                                    Password
                                </Label>
                                <Input
                                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground
                                    focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                    type="password"
                                    id="password"
                                    {...form.register("password")}
                                    placeholder="••••••••"
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full py-3 bg-primary text-white font-semibold rounded-lg
                            transform transition-all duration-200 hover:bg-secondary active:scale-95"
                        >
                            {isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </Form>

                <Footer
                    backButtonLabel="Don't have an account?"
                    backButtonHref="/auth/register"
                    className="mt-4 md:mt-6 text-center text-muted-foreground"
                />
            </div>
        </div>
    )
}
