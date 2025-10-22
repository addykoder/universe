"use client";

import Card from "@/components/Card"; // Assuming Card is at this path
import { CheckSquare } from "lucide-react";

/**
 * A widget to display a "Poll of the Day" on the dashboard.
 */
export default function PollWidget() {
  return (
    <Card className="hover:bg-black">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-cyan-400" />
        Poll of the Day
      </h2>
      <p className="text-slate-300 mb-4">What new merch should the college store add?</p>
      <div className="space-y-3">
        <button className="w-full text-left p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">Hoodies</button>
        <button className="w-full text-left p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">Tote Bags</button>
        <button className="w-full text-left p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">Stickers</button>
      </div>
    </Card>
  );
}

