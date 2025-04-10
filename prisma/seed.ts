import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
const SALT_ROUNDS = 10
async function main() {

   // Création des rôles d'abord
   await prisma.role.createMany({
    data: [
      { name: "Admin", lastname: "User" , code: "ADMIN", roleType: "ADMIN" },
     
    ],
    skipDuplicates: true, // Évite d'insérer des doublons
  });

  // Hachage des mots de passe
  const adminPassword = await bcrypt.hash('passwordAdmin', SALT_ROUNDS)
  const dries = await prisma.user.upsert({
    where: { email: 'admin@sante.io' },
    update: {},
    create: {
      name: 'dries',
      lastname: 'abdelghani',
      email: 'admin@sante.io',
      password: adminPassword,
      role : 'ADMIN',
      code: "ADMIN"

      
     
    },
  })
  
  console.log({ dries })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })