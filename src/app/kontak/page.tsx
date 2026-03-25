import { Metadata } from 'next';
import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { eq } from "drizzle-orm";
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi BPD HIPMI Jambi untuk pertanyaan seputar keanggotaan, kerjasama, atau riset kebijakan.',
  openGraph: {
    title: 'Hubungi Kami | Bakastra HIPMI Jambi',
    description: 'Punya pertanyaan seputar riset, kerjasama, atau keanggotaan? Tim kami siap membantu Anda.',
  },
};

// Disable caching so CMS updates are reflected immediately
export const dynamic = 'force-dynamic';

// Default contact data
const defaultContact = {
  officeName: "Sekretariat HIPMI Jambi",
  address: "Jl. Mayjen Jusuf Singedekane, Telanaipura, Kota Jambi, 36122, Provinsi Jambi, Indonesia",
  email: "info@bakastra.hipmijambi.co.id",
  phone: "+62 741 1234 5678",
  whatsappNumber: "6285377347995",
  operationalHours: "Senin - Jumat: 08.00 - 17.00 WIB",
};

async function getContactInfo() {
  try {
    const result = await db.select().from(contactInfo).where(eq(contactInfo.id, "default"));
    if (result.length === 0) return defaultContact;
    return {
      officeName: result[0].officeName || defaultContact.officeName,
      address: result[0].address || defaultContact.address,
      email: result[0].email || defaultContact.email,
      phone: result[0].phone || defaultContact.phone,
      whatsappNumber: result[0].whatsappNumber || defaultContact.whatsappNumber,
      operationalHours: result[0].operationalHours || defaultContact.operationalHours,
    };
  } catch {
    return defaultContact;
  }
}

export default async function ContactPage() {
  const contact = await getContactInfo();
  return <ContactClient contact={contact} />;
}