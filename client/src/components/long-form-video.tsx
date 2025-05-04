import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { formatViews, formatDuration } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function LongFormVideo() {
  const { data: video, isLoading } = useQuery({
    queryKey: ['/api/videos/long-form'],
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/videos/long-form/stats'],
  });

  return (
    <section className="py-8 px-4 bg-jupiter-gray">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-montserrat">Featured Long-Form</h2>
        </div>
        
        {isLoading ? (
          <div className="rounded-xl overflow-hidden bg-black relative">
            <div className="aspect-video relative">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        ) : (
          <Link href={`/video/${video?.id}`}>
            <div className="rounded-xl overflow-hidden bg-black relative cursor-pointer">
              <div className="aspect-video relative">
                <img 
                  src={video?.thumbnailUrl || "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675"}
                  alt={video?.title || "Jupiter Street to Screen Compilation"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group">
                  <div className="h-20 w-20 rounded-full bg-jupiter-purple flex items-center justify-center transition duration-300 group-hover:scale-110 group-hover:bg-opacity-90">
                    <Play className="text-white h-8 w-8" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-bold text-xl md:text-2xl">{video?.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base mt-2">
                    {video?.description}
                  </p>
                  <div className="flex items-center mt-3">
                    <span className="text-jupiter-teal bg-jupiter-teal bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="inline mr-1 h-3 w-3" /> {formatDuration(video?.duration || 0)}
                    </span>
                    <span className="ml-3 text-white text-sm">
                      <Eye className="inline mr-1 h-3 w-3" /> {formatViews(video?.views || 0)} views
                    </span>
                    <span className="ml-3 text-white text-sm">
                      <Calendar className="inline mr-1 h-3 w-3" /> {video?.uploadedAgo || "3 days ago"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <span className="text-jupiter-orange text-2xl">📍</span>
            </div>
            <h3 className="text-center font-bold">{stats?.cities || 5} Indian Cities</h3>
            <p className="text-center text-sm text-gray-300 mt-1">Exploring crypto culture across India</p>
          </div>
          
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <span className="text-jupiter-yellow text-2xl">👥</span>
            </div>
            <h3 className="text-center font-bold">{stats?.interviews || "50+"} Interviews</h3>
            <p className="text-center text-sm text-gray-300 mt-1">Real people, real reactions, real fun</p>
          </div>
          
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <span className="text-jupiter-teal text-2xl">🎓</span>
            </div>
            <h3 className="text-center font-bold">Crypto Education</h3>
            <p className="text-center text-sm text-gray-300 mt-1">Learn while you laugh</p>
          </div>
        </div>
      </div>
    </section>
  );
}
