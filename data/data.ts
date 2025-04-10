import { db } from "@/lib/db";


export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: {
            email

        }});

        return user;
    } catch  {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: {
            id

        }});

        return user;
    } catch  {
        return null;
    }
}

export const getUserByCode = async (code: string) => {
    try {
        const role = await db.role.findUnique({ where: {
            code 

        }});

        return role;
    } catch  {
        return null;
    }
}