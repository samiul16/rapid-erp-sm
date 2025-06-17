import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryCards from "./SummaryCards";
import CountryGrid from "./CountriesGrid";
import CountryDataTable from "./CountryDataTable";
import { Input } from "@/components/ui/input";
import YoutubeButton from "@/components/common/YoutubeButton";

export default function CountryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
  };

  // YouTube video ID (the part after 'v=' in the URL)
  const videoId = "PcVAyB3nDD4"; // Replace with your actual YouTube video ID

  const youtubeOptions = {
    height: "500",
    width: "800",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 mb-8 items-center">
        <h1 className="text-xl md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          Countries Management
        </h1>

        <div className="flex justify-end gap-2 md:gap-4">
          {/* <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 sm:w-12 hover:bg-red-100 bg-red-500 border-red-600"
            onClick={() => setIsVideoOpen(true)}
          >
            <PlayIcon className="size-4 sm:size-5 md:size-6 text-white" />
          </Button> */}

          <YoutubeButton videoId={videoId} youtubeOptions={youtubeOptions} />

          <Button className="bg-white hover:bg-white text-black border border-black">
            <Plus className="h-4 w-4 text-black" />
            <span className="ml-2 hidden sm:inline">Create Country</span>
          </Button>
        </div>
      </div>

      <SummaryCards data={summaryData} />

      <div className="mt-8 border-b pb-4">
        <div className="flex items-center justify-between">
          {/* Left-aligned Tabs */}
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Middle-aligned Search Input */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search countries..."
                className="pl-9 w-full"
                // Add your search state and handlers here
              />
            </div>
          </div>

          {/* Right-aligned Filter Button */}
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-4">
        {viewMode === "grid" ? <CountryGrid /> : <CountryDataTable />}
      </div>

      {/* YouTube Video Modal */}
      {/* <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Country Guide Video</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <YouTube videoId={videoId} opts={youtubeOptions} />
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
