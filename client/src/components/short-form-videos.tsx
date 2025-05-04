import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { formatViews, formatDuration } from "@/lib/utils";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ShortFormVideosProps {
  location: string;
}

export function ShortFormVideos({ location }: ShortFormVideosProps) {
  const { data: videos, isLoading } = useQuery({
    queryKey: ['/api/videos/short-form', location !== 'All Cities' ? location : undefined],
  });

  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-montserrat">Short-Form Jams</h2>
          <Link href="/videos/short-form">
            <a className="text-jupiter-teal hover:underline text-sm font-medium cursor-pointer">
              View All
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden bg-jupiter-gray">
                <div className="aspect-[9/16] relative">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-3">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            videos?.map((video) => (
              <Link key={video.id} href={`/video/${video.id}`}>
                <div className="video-card rounded-xl overflow-hidden bg-jupiter-gray relative group cursor-pointer">
                  <div className="aspect-[9/16] relative">
                    <img 
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="video-overlay absolute inset-0 bg-black bg-opacity-40 transition-opacity opacity-0 flex items-center justify-center">
                      <div className="play-icon h-16 w-16 rounded-full bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center transition duration-300">
                        <Play className="text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-jupiter-purple text-white text-xs font-medium px-2 py-1 rounded-full">
                      {formatDuration(video.duration)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                      <div className="flex items-center">
                        <span className="bg-jupiter-orange px-2 py-0.5 rounded text-xs font-medium mr-2">{video.location}</span>
                        <span className="text-sm text-white font-medium">{formatViews(video.views)} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-lg">{video.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{video.shortDescription}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
