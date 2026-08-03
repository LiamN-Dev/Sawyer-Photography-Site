"use client";

import React, { useState } from "react";
import { Shield, Wrench, Plus, Trash2, Key, Award, Send } from "lucide-react";

export default function UltraAdminDashboard() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // Dynamic Service Menu Management
  const [menuItems, setMenuItems] = useState([
    { id: "1", title: "Nature Photos", duration: 15, price: 0, desc: "Quick 15-minute outdoors shoot." },
    { id: "2", title: "Social Media Portraits", duration: 30, price: 50, desc: "30-minute tailored session." },
  ]);

  const [newItem, setNewItem] = useState({ title: "", duration: 30, price: 0, desc: "" });

  // Users with Unhashed Passwords & Tier Assignment
  const [users, setUsers] = useState([
    { id: "u1", name: "Sarah Jenkins", username: "sjenkins", password: "password123!", tier: "silver" },
    { id: "u2", name: "Marcus Vance", username: "mvance", password: "vanceSecure99", tier: "gold" },
  ]);

  // Pending Bill Reviews (Submitted by Normal Admin)
  const [billQueue, setBillQueue] = useState([
    { id: "b1", clientName: "Marcus Vance", clientTier: "gold", rawAmount: 50, notes: "Portraits Session" }
  ]);

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ title: "", duration: 30, price: 0, desc: "" });
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleUpdateTier = (userId: string, tier: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, tier } : u)));
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-red-500" /> Ultra Master Console
          </h1>
          <p className="text-sm text-gray-400">System maintenance, user credentials, dynamic menus, and bill dispatch.</p>
        </div>

        {/* Global Maintenance Switch */}
        <button
          onClick={() => setMaintenanceMode(!maintenanceMode)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition ${
            maintenanceMode
              ? "bg-red-500 text-white animate-pulse"
              : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10"
          }`}
        >
          <Wrench className="w-4 h-4" />
          {maintenanceMode ? "LOCKDOWN: MAINTENANCE ACTIVE" : "Maintenance Lock: OFF"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Manager */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-400" /> Manage Service Menu Options
          </h2>

          <form onSubmit={handleAddMenuItem} className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <input
              type="text"
              placeholder="Title (e.g. Drone Shoot)"
              required
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="glass-input px-3 py-2 rounded-xl text-xs"
            />
            <input
              type="number"
              placeholder="Price ($)"
              required
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className="glass-input px-3 py-2 rounded-xl text-xs"
            />
            <input
              type="number"
              placeholder="Duration (Minutes)"
              required
              value={newItem.duration}
              onChange={(e) => setNewItem({ ...newItem, duration: parseInt(e.target.value) })}
              className="glass-input px-3 py-2 rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={newItem.desc}
              onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
              className="glass-input px-3 py-2 rounded-xl text-xs"
            />
            <button type="submit" className="col-span-2 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs">
              Add Menu Option
            </button>
          </form>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <div className="font-bold text-white">{item.title} (${item.price})</div>
                  <div className="text-gray-400">{item.duration} mins — {item.desc}</div>
                </div>
                <button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User Credential Manager & Tier Assignment */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-400" /> User Passwords & Loyalty Tiers
            </h2>

            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white">{u.name} (@{u.username})</div>
                      <div className="text-amber-300 font-mono mt-1">Raw Password: {u.password}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-400" />
                      <select
                        value={u.tier}
                        onChange={(e) => handleUpdateTier(u.id, e.target.value)}
                        className="bg-black/40 text-white rounded-lg px-2 py-1 border border-white/20 text-xs"
                      >
                        <option value="none">Standard (0%)</option>
                        <option value="silver">Silver (25%)</option>
                        <option value="gold">Gold (50%)</option>
                        <option value="platinum">Platinum (75%)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Bills Review & Dispatch */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" /> Bill Review & Dispatch Queue
            </h2>

            <div className="space-y-3">
              {billQueue.map((bill) => {
                const discountPct = bill.clientTier === "silver" ? 0.25 : bill.clientTier === "gold" ? 0.5 : bill.clientTier === "platinum" ? 0.75 : 0;
                const finalAmount = bill.rawAmount * (1 - discountPct);

                return (
                  <div key={bill.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">{bill.clientName}</div>
                        <div className="text-gray-400">{bill.notes}</div>
                      </div>
                      <div className="text-right">
                        <div className="line-through text-gray-500">${bill.rawAmount}</div>
                        <div className="font-bold text-emerald-400 text-sm">${finalAmount.toFixed(2)} ({bill.clientTier.toUpperCase()})</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        alert(`Bill dispatched to ${bill.clientName} via SMS/Email!`);
                        setBillQueue(billQueue.filter((b) => b.id !== bill.id));
                      }}
                      className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs mt-2"
                    >
                      Approve & Send Invoice
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
