import bcrypt from 'bcryptjs';
import prisma from '../src/utils/prisma.js';

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = 'admin@kalyam.com';
  const adminPassword = 'Admin@123456';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN',
        },
      });
      console.log(`✅ Admin user created: ${admin.email}`);
      console.log(`   Password: ${adminPassword}`);
    } else {
      console.log(`⚠️  Admin user already exists: ${existingAdmin.email}`);
    }

    // Create some test medicines
    const medicines = [
      {
        brand: 'Test Human Med 1',
        sku: 'TEST-HUM-001',
        strength: 'Test Strength 500mg',
        target: 'HUMAN',
      },
      {
        brand: 'Test Animal Med 1',
        sku: 'TEST-ANI-001',
        strength: 'Test Animal Strength',
        target: 'ANIMAL',
      },
    ];

    for (const med of medicines) {
      const existing = await prisma.medicine.findUnique({
        where: { sku: med.sku },
      });

      if (!existing) {
        await prisma.medicine.create({ data: med });
        console.log(`✅ Medicine created: ${med.brand}`);
      }
    }

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();