import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Re-export auth schema
export * from './auth-schema';

// Tabel Berita
export const news = pgTable('news', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    category: text('category').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content'),
    image: text('image'),
    published: boolean('published').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabel Acara
export const events = pgTable('events', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    time: text('time'),
    location: text('location'),
    type: text('type'),
    description: text('description'),
    registrationLink: text('registration_link'),
    published: boolean('published').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabel Program
export const programs = pgTable('programs', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    status: text('status'),
    icon: text('icon'),
    published: boolean('published').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabel Publikasi
export const publications = pgTable('publications', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    date: text('date').notNull(),
    author: text('author'),
    excerpt: text('excerpt'),
    content: text('content'), // Full content/body of publication
    image: text('image'),
    downloadLink: text('download_link'),
    tags: text('tags'), // JSON string
    published: boolean('published').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabel Tim/Pengurus
export const teamMembers = pgTable('team_members', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    bio: text('bio'),
    image: text('image'),
    socialLink: text('social_link'),
    category: text('category').notNull(), // 'bpd' atau 'bakastra'
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabel Informasi Kontak (single-row settings)
export const contactInfo = pgTable('contact_info', {
    id: text('id').primaryKey().default('default'),
    officeName: text('office_name').default('Sekretariat HIPMI Jambi'),
    address: text('address').default('Jl. Mayjen Jusuf Singedekane, Telanaipura, Kota Jambi, 36122, Provinsi Jambi, Indonesia'),
    email: text('email').default('info@bakastra.hipmijambi.co.id'),
    phone: text('phone').default('+62 741 1234 5678'),
    whatsappNumber: text('whatsapp_number').default('6285377347995'),
    operationalHours: text('operational_hours').default('Senin - Jumat: 08.00 - 17.00 WIB'),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Types
export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;

export type Publication = typeof publications.$inferSelect;
export type NewPublication = typeof publications.$inferInsert;

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;

export type ContactInfo = typeof contactInfo.$inferSelect;
export type NewContactInfo = typeof contactInfo.$inferInsert;
