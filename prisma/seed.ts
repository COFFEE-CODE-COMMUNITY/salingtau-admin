import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function main() {
  console.log('🌱 Seeding database...');

  // Hash password admin123
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Cek apakah sudah ada admin
  const existingAdmin = await prisma.admin.findFirst({
    where: { username: 'admin123' }
  });

  if (!existingAdmin) {
    console.log('Creating default admin user...');
    await prisma.admin.create({
      data: {
        username: 'admin123',
        password: hashedPassword,
      }
    });
    console.log('✅ Default admin created!');
    console.log('   Username: admin123');
    console.log('   Password: admin123');
  } else {
    console.log('⚠️  Admin user already exists, skipping...');
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
