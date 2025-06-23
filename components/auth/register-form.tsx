"use client";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Footer } from "./footer";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";
import { useState } from "react";



export const RegisterForm = () => {
  const [notification, setNotification] = useState<{
  type: "success" | "error";
  message: string;
} | null>(null);

  

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      doctorSpeciality: "",
      code: ""
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  startTransition(() => {
    register(values).then((data) => {
      if (data.success) {
        setNotification({ type: "success", message: "Account successfully created!" });
        window.location.href = "/?status=success";

      } else {
        setNotification({ type: "error", message: data.error || "Registration failed." });
      }
    }).catch(() => {
      setNotification({ type: "error", message: "An unexpected error occurred." });
    });
  });
};


  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-border mx-4 h-[95vh] flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground text-sm">Join our professional community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">First Name</Label>
                <Input
                  className="bg-input border border-border text-foreground placeholder-muted-foreground rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  id="name"
                  {...form.register("name")}
                  placeholder="John"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">Last Name</Label>
                <Input
                  className="bg-input border border-border text-foreground placeholder-muted-foreground rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  id="lastname"
                  {...form.register("lastname")}
                  placeholder="Doe"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  className="bg-input border border-border text-foreground placeholder-muted-foreground rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  type="email"
                  id="email"
                  {...form.register("email")}
                  placeholder="john.doe@example.com"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label className="text-sm font-medium text-foreground">Password</Label>
                <Input
                  className="bg-input border border-border text-foreground placeholder-muted-foreground rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  type="password"
                  id="password"
                  {...form.register("password")}
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label className="text-sm font-medium text-foreground">Role</Label>
                <Select
                  onValueChange={(value) => form.setValue("role", value)}
                  defaultValue={form.watch("role")}
                >
                  <SelectTrigger className="bg-input border border-border text-sm text-foreground rounded-md px-3 py-2 focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border text-sm text-foreground">
                    <SelectGroup>
                      <SelectLabel className="text-accent">Roles</SelectLabel>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="ADMIN_Imagery">ADMIN Imagery</SelectItem>
                      <SelectItem value="ADMIN_LAB_ANALYSE">LAB Analyse</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label className="text-sm font-medium text-foreground">Doctor Speciality</Label>
                <Select
                  onValueChange={(value) => form.setValue("doctorSpeciality", value)}
                  defaultValue={form.watch("doctorSpeciality")}
                >
                  <SelectTrigger className="bg-input border border-border text-sm text-foreground rounded-md px-3 py-2 focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select a speciality" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border text-sm text-foreground">
                    <SelectGroup>
                      <SelectLabel className="text-accent">Specialities</SelectLabel>
                      <SelectItem value="Cardiologue">Cardiologue</SelectItem>
                      <SelectItem value="Dermatologue">Dermatologue</SelectItem>
                      <SelectItem value="Gynécologue">Gynécologue</SelectItem>
                      <SelectItem value="Neurologue">Neurologue</SelectItem>
                      <SelectItem value="Psychiatre">Psychiatre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label className="text-sm font-medium text-foreground">Security Code</Label>
                <Input
                  className="bg-input border border-border text-foreground placeholder-muted-foreground rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  id="code"
                  {...form.register("code")}
                  placeholder="XXXX-XXXX-XXXX"
                  disabled={isPending}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-2 text-sm bg-primary text-white font-semibold rounded-md transition-all duration-200 hover:bg-secondary active:scale-95"
            >
              {isPending ? 'Creating...' : 'Register Now'}
            </Button>
          </form>
        </Form>

        <Footer
          backButtonLabel="Already have an account?"
          backButtonHref="/"
          className="mt-2 text-center text-accent text-sm"
        />
      </div>
    </div>
  );
};
