import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  const emailArg = args.find((a) => a.startsWith("email="));
  const passwordArg = args.find((a) => a.startsWith("password="));

  if (!emailArg || !passwordArg) {
    console.error("❗ Usage: npm run create-admin email=... password=...");
    process.exit(1);
  }

  const email = emailArg.split("=")[1];
  const password = passwordArg.split("=")[1];

  if (!email || !password) {
    console.error("❗ Email and password must not be empty.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.create({
      data: {
        email,
        password_hash: hashed,
        role: "Admin",
      },
    });

    console.log("✔️ Admin created successfully:");
    console.log(`   Email: ${admin.email}`);
    console.log(`   ID: ${admin.id}`);
  } catch (err: any) {
    if (err.code === "P2002") {
      console.error("❗ Email already exists.");
    } else {
      console.error(err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
