"use client";

import React, { useState } from "react";
import { Calendar, Clock, CheckCircle, Palette, Sparkles, AlertTriangle } from "lucide-react";

// Mock Sample Menu Items provided by client
const MENU_ITEMS = [
  { id: "1", title: "Nature Photos", duration: 15, price: 0, desc: "Quick 15-minute outdoors shoot in local nature trails." },
  { id: "2", title: "Social Media Portraits", duration: 30, price: 50, desc: "30-minute tailored portrait session for social profiles." },
  { id: "3", title: "Pet Photoshoot", duration: 45, price: 75, desc: "Action and portrait shots of your beloved pets." },
];

// Color Theme Options
const COLOR_THEMES: Record<string, string> = {
  blue: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
  red: "from-red-500/20 to-rose-500/10 border-red-500/30",
  orange: "from-orange-500/20 to-amber-500/10 border-orange-500/30",
  yellow: "from-yellow-500/20 to-amber-300/10 border-yellow-500/30",
  green: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  purple: "from-purple-500/20 to-fuchsia-500/10 border-purple-500/30",
};

export default function UserDashboard() {
  const [selectedTheme, setSelectedTheme] = useState("blue");
  const [userTier, setUserTier] = useState<"silver" | "gold" | "platinum" | "standard">("silver");
  const [selectedService, setSelectedService] = useState(MENU_ITEMS[0]);
  const [bookingTime, setBookingTime] = useState("14:00");
  const [conflictError, setConflictError] = useState("");
  const [appointmentFinished, setAppointmentFinished] = useState(false);

  // Example booked slot representation
  const existingBooking = { start: "14:00", end: "14:15" };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError("");

    // Double Booking Logic Check
    if (bookingTime === existingBooking.start) {
      setConflictError(
        `A different user has already requested the time block ${existingBooking.start} to ${existingBooking.end}. Please select a different time block.`
      );
      return;
    }

    alert(`Appointment requested for ${selectedService.title} at ${bookingTime}`);
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Dashboard</h1>
          <p className="text-sm text-gray-400">Manage bookings, dashboard colors, and appointment statuses.</p>
        </div>

        {/* Tier Discount Badge */}
        {userTier !== "standard" && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>
              {userTier.toUpperCase()} MEMBER — {userTier === "silver" ? "25%" : userTier === "gold" ? "50%" : "75%"} OFF ALL APPOINTMENTS
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Request Appointment */}
        <div className={`lg:col-span-2 glass-panel p-6 rounded-3xl bg-gradient-to-br ${COLOR_THEMES[selectedTheme]}`}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" /> Request an Appointment
          </h2>

          <form onSubmit={handleBookingSubmit} className="space-y-5">
            {/* 1. Select Photoshoot Type */}
            <div>
              <label className="block text-xs uppercase text-gray-400 tracking-wider mb-2 font-medium">
                1. Choose Photoshoot Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className={`p-4 rounded-2xl text-left border transition ${
                      selectedService.id === item.id
                        ? "bg-white/20 border-white text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.duration} mins • ${item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Locked Duration Info */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Selected Option Duration: <strong>{selectedService.duration} Minutes</strong> (Locked by menu)</span>
            </div>

            {/* 2. Pick Time Block */}
            <div>
              <label className="block text-xs uppercase text-gray-400 tracking-wider mb-2 font-medium">
                2. Select Preferred Time Slot
              </label>
              <input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="glass-input px-4 py-3 rounded-xl w-full text-white font-mono"
              />
            </div>

            {/* Double Booking Conflict Alert */}
            {conflictError && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{conflictError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Submit Appointment Request
            </button>
          </form>
        </div>

        {/* Right Column: Post-Shoot Action & Theme Customizer */}
        <div className="space-y-6">
          {/* Post-Appointment Completion Box */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Appointment Verification
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Once your photoshoot is completed, click below to mark it finished so the studio can prepare your itemized invoice.
            </p>
            <button
              onClick={() => setAppointmentFinished(true)}
              disabled={appointmentFinished}
              className={`w-full py-3 rounded-xl font-medium text-xs transition ${
                appointmentFinished
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              {appointmentFinished ? "✓ Appointment Marked Finished" : "Click to Confirm Appointment Finished"}
            </button>
          </div>

          {/* Theme Color Customizer */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5" /> Dashboard Theme Color
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(COLOR_THEMES).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedTheme(color)}
                  className={`py-2 px-3 rounded-xl text-xs capitalize font-medium border transition ${
                    selectedTheme === color
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
