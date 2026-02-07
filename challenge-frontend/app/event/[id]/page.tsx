"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format_date } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, ShieldCheck } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams(); // Grabs the ID from the URL
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Auth check (hardcoded)
    const auth = localStorage.getItem("mock_auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }

    async function fetchEvent() {
      try {
        const res = await fetch(`https://api.hackthenorth.com/v3/events/${id}`);
        const data = await res.json();
        // Find the specific event in the array
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#fafaf9] text-2xl text-black flex items-center justify-center font-sans">Loading details...</div>;
  if (!event || (event.permission == "private" && !isLoggedIn)) return <div className="min-h-screen bg-[#fafaf9] text-2xl flex text-black items-center justify-center font-sans">Event not found.</div>;

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-black font-sans p-8 md:p-16">
      <main className="mx-auto max-w-3xl">
        
        {/* Back Button */}
        <Link href="/" className="group mb-12 inline-flex items-center text-zinc-500 hover:text-black transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all events
        </Link>

        {/* Content Card */}
        <div className="border border-black bg-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{event.name}</h1>
            {event.permission === "private" && (
              <Badge variant="secondary" className="bg-yellow-100 border-yellow-400 text-yellow-800">
                <ShieldCheck className="w-3 h-3 mr-1" /> Private
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-6 mb-8 text-zinc-600 border-y border-zinc-100 py-6">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>{format_date(event.start_time)} - {format_date(event.end_time)}</span>
            </div>
            {event.location && (
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <div className="prose prose-zinc max-w-none">
            <p className="text-xl leading-relaxed text-zinc-800">
              {event.description}
            </p>
          </div>

          {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="pt-8 border-zinc-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  Featured Speakers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 border border-zinc-200 rounded-none bg-[#fafaf9]"
                    >
                      {/* Simple Avatar Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center mr-4 font-bold text-zinc-500">
                        {speaker.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-lg leading-none">{speaker.name}</p>
                        {speaker.title && (
                          <p className="text-sm text-zinc-500 mt-1">{speaker.title}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Related Links / Metadata Section */}
          <div className="flex flex-wrap gap-x-4">
            {event.public_url && (
              <div className="mt-8 border-black">
                <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-none px-8 py-6 h-auto text-lg">
                  <a href={event.public_url} target="_blank" rel="noreferrer">
                    Join Event Stream
                  </a>
                </Button>
              </div>
            )}
            {isLoggedIn && event.private_url && (
              <div className="mt-8 border-black">
                <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-none px-8 py-6 h-auto text-lg">
                  <a href={event.private_url} target="_blank" rel="noreferrer">
                    Sign up
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
