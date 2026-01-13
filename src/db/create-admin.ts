import 'dotenv/config';
import { db } from './index';
import { user, account } from './auth-schema';
import { nanoid } from 'nanoid';

// Hash password using BetterAuth's method (simple bcrypt-like for demo)
async function hashPassword(password: string): Promise<string> {
    // BetterAuth uses its own hashing, we'll create user via API instead
    // This is a placeholder - we'll use the signup API
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function createFirstAdmin() {
    const adminEmail = 'adprabowo.id@gmail.com';
    const adminPassword = 'BakastraBH1';
    const adminName = 'Aditya Prabowo';

    console.log('🔐 Creating first admin account...');

    try {
        // Check if admin already exists
        const existing = await db.select().from(user).where((fields) => fields.email.equals(adminEmail));

        if (existing.length > 0) {
            console.log('✅ Admin already exists!');
            return;
        }

        const userId = nanoid();
        const hashedPassword = await hashPassword(adminPassword);

        // Create user
        await db.insert(user).values({
            id: userId,
            name: adminName,
            email: adminEmail,
            emailVerified: true, // Admin is pre-verified
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create account with password
        await db.insert(account).values({
            id: nanoid(),
            accountId: userId,
            providerId: 'credential',
            userId: userId,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('✅ First admin created successfully!');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}`);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
    }

    process.exit(0);
}

createFirstAdmin();
