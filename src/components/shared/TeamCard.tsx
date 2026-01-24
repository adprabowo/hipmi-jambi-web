import { Instagram } from "lucide-react";

interface TeamProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLink?: string | null;
}

// PERBAIKAN: Pastikan ada kata 'default' di sini
export default function TeamCard({ name, role, bio, image, socialLink }: TeamProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-hipmi-gold/50 transition-all duration-300 shadow-sm hover:shadow-lg">
      <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-hipmi-green to-gray-400 flex items-center justify-center text-white text-4xl font-serif font-bold opacity-80">
            {name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
          </div>
        )}
      </div>
      <div className="p-6 relative">
        {socialLink ? (
          <a href={socialLink} target="_blank" rel="noopener noreferrer" className="absolute -top-6 right-6 w-12 h-12 bg-hipmi-gold rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-hipmi-green transition-colors hover:scale-110">
            <Instagram className="w-5 h-5" />
          </a>
        ) : (
          <div className="absolute -top-6 right-6 w-12 h-12 bg-hipmi-gold rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-hipmi-green transition-colors">
            <Instagram className="w-5 h-5" />
          </div>
        )}

        <p className="text-sm text-hipmi-green font-bold uppercase tracking-wider mb-1">{role}</p>

        <h3 className="text-xl font-serif font-bold text-hipmi-neutral mb-3">
          {socialLink ? (
            <a href={socialLink} target="_blank" rel="noopener noreferrer" className="hover:text-hipmi-green transition-colors">
              {name}
            </a>
          ) : (
            name
          )}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{bio}</p>
      </div>
    </div>
  );
}