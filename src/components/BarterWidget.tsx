"use client";

import Card from "@/components/Card"; // Assuming Card is at this path
import { Repeat } from "lucide-react";
import { useRouter } from "next/navigation";


interface BarterItem {
  title: string;
  user: string;
}

interface BarterWidgetProps {
  items: BarterItem[];
}

/**
 * A widget to display new barter/buy-sell items on the dashboard.
 */
export default function BarterWidget({ items }: BarterWidgetProps) {
	const router = useRouter();
  return (
    <Card className="md:col-span-1 hover:bg-black hover:cursor-pointer">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" onClick={()=> {router.push('/dashboard/buy-sell')}}>
        <Repeat className="w-5 h-5 text-red-400" />
        New Barter Items
      </h2>
      <div className="divide-y divide-slate-800">
        {items.map((item, i) => (
          <div className="py-3" key={i}>
            <p className="font-medium text-white truncate hover:text-blue-300 cursor-pointer">{item.title}</p>
            <p className="text-sm text-slate-400">posted by {item.user}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
