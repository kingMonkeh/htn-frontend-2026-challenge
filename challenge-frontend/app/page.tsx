"use client";

import { Event } from "./event";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("mock_auth");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Auth check (hardcoded)
    const auth = localStorage.getItem("mock_auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }

    // Fetch events
    async function loadData() {
      try {
        const res = await fetch('https://api.hackthenorth.com/v3/events');
        const data = await res.json();
        console.log(data);

        const filteredData = data.filter((event: any) => {
          if (auth || event.permission == "public") {
            return true;
          } 
          else {
            return false;
          }
        });
        
        // Sort by start_time and save the data into our bucket
        const sorted = [...filteredData].sort((a, b) => a.start_time - b.start_time);
        setEvents(sorted);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Loading Screen
  if (loading) return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#fafaf9] text-black font-sans">
        <div className="p-20 text-center text-2xl">Loading Events...</div>;
      </div>
    </>
  )

  const displayedEvents = events
    .filter((event: any) => isLoggedIn || event.permission === "public")
    .sort((a, b) => a.start_time - b.start_time);

  return (
    <div className="flex min-h-screen items-center justify-center text-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between p-4 bg-[#fafaf9] sm:items-start">
        {/* Header Section */}
        <div className="flex w-full items-center justify-between pt-4 pb-12">
          <h1 className="font-bold tracking-tight">
            <span className="text-4xl md:text-5xl block sm:inline">Hackathon Global Inc.™</span>
            <span className="text-2xl md:text-3xl text-zinc-600 ml-0 sm:ml-2">Events</span>
          </h1>

          {isLoggedIn ?
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="rounded-full px-10 py-4 text-white hover:text-black border-zinc-300 hover:bg-zinc-100"
            >
              Logout
            </Button>
          :
            <Link href="/login" passHref>
              <Button variant="outline" className="rounded-full px-10 py-4 text-white hover:text-black border-zinc-300 hover:bg-zinc-100">
                Login
              </Button>
            </Link>
          }
        </div>
        {/*Events Section*/}
        <div className="flex flex-wrap w-full gap-y-8">
          {displayedEvents.map((eventItem: any) => (
            <Event key={eventItem.id} data={eventItem}/>
          ))}
        </div>
      </main>
    </div>
  );
}
