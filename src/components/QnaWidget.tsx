"use client";

import Card from "@/components/Card"; // Assuming Card is at this path
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface QnaItem {
  title: string;
  user: string;
}

interface QnaWidgetProps {
  items: QnaItem[];
}

/**
 * A widget to display recent Q&A activity on the dashboard.
 */
export default function QnaWidget({ items }: QnaWidgetProps) {
	const router = useRouter();
  return (
    <Card className="md:col-span-1 hover:bg-black hover:cursor-pointer">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" onClick={()=> router.push('/dashboard/qna')}>
        <MessageSquare className="w-5 h-5 text-yellow-400" />
        Recent Q&A Activity
      </h2>
      <div className="divide-y divide-slate-800">
        {items.map((item, i) => (
          <div className="py-3" key={i}>
            <p className="font-medium text-white truncate hover:text-blue-300 cursor-pointer">{item.title}</p>
            <p className="text-sm text-slate-400">asked by {item.user}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
