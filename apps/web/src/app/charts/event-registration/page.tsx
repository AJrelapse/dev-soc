import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { EventRegistrations } from "@/app/charts/event-reg";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Registration",
};

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Page(props: PropsType) {
  const { selected_time_frame } = await props.searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Breadcrumb pageName="Event Registration" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-5">
          <EventRegistrations />
        </div>
      </div>
    </>
  );
}
