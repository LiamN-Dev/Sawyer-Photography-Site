"use client";

import React from "react";
import { Wrench } from "lucide-react";

interface MaintenanceOverlayProps {
  isMaintenanceMode: boolean;
  isUltraAdmin: boolean;
  children: React.ReactNode;
}

export default function MaintenanceOverlay({
  isMaintenanceMode,
  isUltraAdmin,
  children,
}: MaintenanceOverlayProps) {
  // Ultra Admin bypasses the lock screen
  if (isMaintenanceMode && !isUltraAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
        <div className="glass-panel max-w-md w-full p-8 rounded-2xl text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-white/10 text-amber-400 mb-2">
            <Wrench className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            System Maintenance
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We are currently updating our booking portal and menu prices to improve your experience. Please check back shortly.
          </p>
          <div className="pt-4 text-xs text-gray-500 font-mono">
            Status: Operational Upgrade in Progress
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
