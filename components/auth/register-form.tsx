"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
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
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.success) {
            setNotification({
              type: "success",
              message: "Compte créé avec succès !",
            });
            window.location.href = "/?status=success";
          } else {
            setNotification({
              type: "error",
              message: data.error || "Échec de l'inscription.",
            });
          }
        })
        .catch(() => {
          setNotification({
            type: "error",
            message: "Une erreur inattendue est survenue.",
          });
        });
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-border mx-4 h-[95vh] flex flex-col">
        
        {/* 🔔 Notification */}
        {notification && (
          <div
            className={`text-sm p-2 mb-4 rounded-md text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-4"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground text-sm">
                Join our professional community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="John"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input
                  id="lastname"
                  {...form.register("lastname")}
                  placeholder="Doe"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  id="email"
                  {...form.register("email")}
                  placeholder="john.doe@example.com"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  id="password"
                  {...form.register("password")}
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label>Role</Label>
                <Select
                  onValueChange={(value) => form.setValue("role", value)}
                  defaultValue={form.watch("role")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
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
                <Label>Doctor Speciality</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("doctorSpeciality", value)
                  }
                  defaultValue={form.watch("doctorSpeciality")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a speciality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specialities</SelectLabel>
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
                <Label>Security Code</Label>
                <Input
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
              {isPending ? "Creating..." : "Register Now"}
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
