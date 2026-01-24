import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi BPD HIPMI Jambi untuk pertanyaan seputar keanggotaan, kerjasama, atau riset kebijakan.',
  openGraph: {
    title: 'Hubungi Kami | Bakastra HIPMI Jambi',
    description: 'Punya pertanyaan seputar riset, kerjasama, atau keanggotaan? Tim kami siap membantu Anda.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}