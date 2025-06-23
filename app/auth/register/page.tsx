import { RegisterForm } from "@/components/auth/register-form";
import { MotionDiv } from "@/components/motion";
import { AnimatedText } from "@/components/animated-text";

const RegisterPage = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row  overflow-hidden">
      {/* Section gauche - Texte (desktop uniquement) */}
      <div className="hidden md:flex flex-col justify-center p-8 relative h-screen md:w-1/2 border-r border-border">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 space-y-8 max-w-2xl mx-auto h-full flex flex-col justify-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            <AnimatedText 
              text="Your Health, Our Priority"
              className="block"
              splitBy=" "
            />
          </h1>

          <div className="text-muted-foreground space-y-4 text-lg flex-1 overflow-y-auto">
            <AnimatedText 
              text={`Welcome to Our Medical Excellence Center. For over two decades, we've pioneered personalized healthcare solutions combining cutting-edge technology with compassionate care. Our board-certified specialists across 15+ disciplines ensure comprehensive treatment tailored to your unique needs.`}
              className="text-base leading-relaxed"
              splitBy=" "
            />
            <AnimatedText 
              text={`We maintain strict HIPAA-compliant security protocols safeguarding your sensitive information while enabling 24/7 accessibility. Our patient-centric approach focuses on preventive care through advanced biometric monitoring and genetic testing, allowing early intervention strategies.`}
              className="text-base leading-relaxed"
              splitBy=" "
            />
          </div>
        </MotionDiv>

        {/* Cercles décoratifs */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-secondary rounded-full filter blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent rounded-full filter blur-3xl animate-pulse opacity-30" />
      </div>

      {/* Section droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 h-screen bg-white">
        <div className="w-full max-w-md relative rounded-2xl p-6 md:p-8 shadow-xl border border-border bg-white">
          
          {/* Décors du formulaire */}
          <div className="absolute -top-8 -right-8 md:-top-12 md:-right-8 w-24 h-24 md:w-32 md:h-32 bg-secondary rounded-full filter blur-3xl opacity-20" />
          <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-8 w-32 h-32 md:w-48 md:h-48 bg-accent rounded-full filter blur-3xl opacity-20" />
          
          {/* Version mobile */}
          <div className="md:hidden mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              <AnimatedText 
                text="Your Health, Our Priority"
                className="block"
                splitBy=" "
              />
            </h1>
            <p className="text-muted-foreground text-sm">
              Secure medical portal - 24/7 access
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
