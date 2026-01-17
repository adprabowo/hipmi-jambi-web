import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

async function getEvents() {
  return await db
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(desc(events.createdAt));
}

export default async function EventsPage() {
  const allEvents = await getEvents();

  return (
    <div className="relative z-10 bg-white min-h-screen">
      <section className="bg-hipmi-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Agenda &amp; Kegiatan</h1>
          <p className="text-white max-w-2xl mx-auto">
            Ikuti berbagai forum diskusi, seminar, dan workshop untuk meningkatkan wawasan bisnis Anda.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {allEvents.length > 0 ? (
            allEvents.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-hipmi-green transition-colors shadow-sm hover:shadow-md group">
                {/* Tanggal Box */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-32 bg-gray-50 rounded-xl border border-gray-100 p-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                    {event.date.split(" ")[1]}
                  </span>
                  <span className="text-4xl font-serif font-bold text-hipmi-green my-1">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {event.date.split(" ")[2]}
                  </span>
                </div>

                {/* Detail Event */}
                <div className="flex-grow">
                  <div className="inline-block px-3 py-1 bg-hipmi-gold/10 text-hipmi-gold text-xs font-bold rounded-full mb-3">
                    {event.type}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-hipmi-neutral mb-3 group-hover:text-hipmi-green transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-500 border-t border-gray-100 pt-4">
                    {event.time && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-hipmi-green" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-hipmi-green" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tombol Action */}
                <div className="flex items-center justify-center md:justify-end">
                  {event.registrationLink && event.registrationLink !== "#" ? (
                    <Link
                      href={event.registrationLink}
                      className="w-full md:w-auto px-6 py-3 bg-white border border-hipmi-green text-hipmi-green font-semibold rounded-lg hover:bg-hipmi-green hover:text-white transition flex items-center justify-center gap-2"
                    >
                      Daftar <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="w-full md:w-auto px-6 py-3 bg-white border border-hipmi-green text-hipmi-green font-semibold rounded-lg hover:bg-hipmi-green hover:text-white transition flex items-center justify-center gap-2">
                      Daftar <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>Belum ada acara yang dijadwalkan.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}