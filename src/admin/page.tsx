"use client";

import React, { useState } from "react";
import { Users, Calendar, FileText, Check, X, AlertCircle, Send } from "lucide-react";

// Mock Registered Users (Client can see info, but CANNOT see passwords or delete users)
const REGISTERED_USERS = [
  { id: "u1", name: "Sarah Jenkins", email: "sarah@example.com", phone: "(555) 234-5678", username: "sjenkins" },
  { id: "u2", name: "Marcus Vance", email: "marcus@example.com", phone: "(555) 876-5432", username: "mvance" },
];

// Mock Appointments
const APPOINTMENTS = [
  {
    id: "a1",
    userName: "Sarah Jenkins",
    service: "Nature Photos",
    timeSlot: "Friday, 2:00 PM - 2:15 PM",
    status: "pending",
    isClientFinished: false, // Client hasn't clicked "Finished" yet
  },
  {
    id: "a2",
    userName: "Marcus Vance",
    service: "Social Media Portraits",
    timeSlot: "Saturday, 11:00 AM - 11:30 AM",
    status: "accepted",
    isClientFinished: true, // Client marked as finished!
  },
];

export default function NormalAdminDashboard() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [selectedApptForBill, setSelectedApptForBill] = useState<any>(null);
  const [billAmount, setBillAmount] = useState("");
  const [billNotes, setBillNotes] = useState("");

  const handleStatusChange = (id: string, newStatus: "accepted" | "rejected") => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleSubmitBill = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bill of $${billAmount} for ${selectedApptForBill.userName} submitted for system processing.`);
    setSelectedApptForBill(null);
    setBillAmount("");
    setBillNotes("");
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Studio Admin Management</h1>
        <p className="text-sm text-gray-400">Review requests, check registered client profiles, and draft client billing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Section */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Appointment Requests
          </h2>

          <div className="space-y-3">
            {appointments.map((appt) => (
              <div key={appt.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white">{appt.userName}</div>
                    <div className="text-xs text-gray-400">{appt.service} • {appt.timeSlot}</div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full capitalize font-semibold ${
                      appt.status === "accepted"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : appt.status === "rejected"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>

                {appt.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleStatusChange(appt.id, "accepted")}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(appt.id, "rejected")}
                      className="flex-1 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Deny
                    </button>
                  </div>
                )}

                {/* Create Bill Trigger */}
                {appt.status === "accepted" && (
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedApptForBill(appt)}
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Create Itemized Bill
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Client Accounts & Billing Drawer */}
        <div className="space-y-6">
          {/* Billing Form Drawer */}
          {selectedApptForBill && (
            <div className="glass-panel p-6 rounded-3xl space-y-4 border-amber-500/40">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" /> Bill for {selectedApptForBill.userName}
                </h3>
                <button onClick={() => setSelectedApptForBill(null)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Requirement Check: Has client confirmed completion? */}
              {!selectedApptForBill.isClientFinished ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-400" /> Confirmation Not Complete
                  </div>
                  <p>
                    Appointment confirmation is not yet complete. Please have the client re-log in and select "Finished Appointment" in order to create and send the bill.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitBill} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Itemized Amount ($)</label>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Services Provided / Notes</label>
                    <textarea
                      required
                      placeholder="e.g. Social Media Shoot + 5 Edited Proofs"
                      value={billNotes}
                      onChange={(e) => setBillNotes(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm h-20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit for Processing
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Registered Users List (Read-Only) */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5" /> Registered Clients
            </h3>
            <div className="space-y-2">
              {REGISTERED_USERS.map((user) => (
                <div key={user.id} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="font-semibold text-white">{user.name} (@{user.username})</div>
                  <div className="text-gray-400">{user.email} • {user.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
