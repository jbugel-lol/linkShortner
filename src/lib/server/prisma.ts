import { PrismaClient } from "@prisma/client";
import { execSync } from 'child_process';

export let prisma: PrismaClient;
try {
    prisma = new PrismaClient();
} catch (error) {
    //@ts-expect-error
    throw new Error(error);
    console.log(error);
}

export async function createSQLLiteDB() {
    execSync(`npx prisma migrate dev --name init`);
    prisma = new PrismaClient();
    return true;
}
