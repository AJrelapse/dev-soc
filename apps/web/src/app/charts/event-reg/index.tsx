import { compactFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { EventRegistrationsChart } from "./chart";

export async function EventRegistrations({ className }: { className?: string }) {
  const data = await getEventRegistrationData();

 function getEventRegistrationData() {

  
    return {
      total_visitors: 784,
      performance: -1.5,
      chart: [
        { x: "S", y: 168 },
        { x: "S", y: 385 },
        { x: "M", y: 201 },
        { x: "T", y: 298 },
        { x: "W", y: 187 },
        { x: "T", y: 195 },
        { x: "F", y: 291 },
      ],
    };
  }

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="border-b border-stroke px-6 py-5.5 dark:border-dark-3">
        <div className="flex justify-between">
          <div className="mb-0.5 text-2xl font-bold text-dark dark:text-white">
            {compactFormat(data.total_visitors)}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-sm font-medium">Active Registrations</div>



          </div>
        </div>


      <EventRegistrationsChart data={data.chart} />
    </div>
  );
}
