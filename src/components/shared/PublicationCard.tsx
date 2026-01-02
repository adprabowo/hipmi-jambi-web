import Link from "next/link";
import { Calendar, ArrowRight, FileText } from "lucide-react";

interface PublicationProps {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
}

export default function PublicationCard({ title, category, date, excerpt, slug }: PublicationProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-hipmi-green bg-green-50 px-3 py-1 rounded-full border border-green-100">
            {category}
          </span>
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="w-3 h-3 mr-1.5" />
            {date}
          </div>
        </div>
        <Link href={`/publikasi/${slug}`} className="block group-hover:text-hipmi-green transition-colors">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </div>
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <FileText className="w-3 h-3 mr-1" /> PDF Tersedia
        </div>
        <Link href={`/publikasi/${slug}`} className="text-sm font-semibold text-hipmi-green flex items-center group-hover:translate-x-1 transition-transform">
          Baca Detail <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}