import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authConfig);
  
  console.log("🔍 Session from API:", session); // 🔥 Voir si la session est bien récupérée
  return res.json(session);
}
