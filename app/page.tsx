import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-base">
      {/* Section d'image */}
      <div className="relative h-64 md:h-screen md:w-1/2 bg-primary overflow-hidden">
        <Image 
          src="/medecin.jpg" 
          alt="Medical professional"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Healthcare Excellence</h1>
          <p className="text-sm md:text-lg opacity-90">Professional medical care at your fingertips</p>
        </div>
      </div>

      {/* Section du formulaire */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-primary h-[calc(100vh-16rem)] md:h-screen">
        <div className="w-full max-w-md space-y-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
