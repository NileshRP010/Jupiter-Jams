import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ShortFormVideos } from "@/components/short-form-videos";
import { QRIntegration } from "@/components/qr-integration";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { formatViews, formatDuration } from "@/lib/utils";
import ReactPlayer from 'react-player/lazy';
import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";
import { Eye, Clock, Calendar, Share2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoPage() {
  const [match, params] = useRoute('/video/:id');
  const videoId = params?.id;
  const playerRef = useRef<ReactPlayer>(null);

  const { data: video, isLoading, error } = useQuery({
    queryKey: ['/api/videos/detail', videoId],
    enabled: !!videoId
  });

  // Update view count
  useEffect(() => {
    if (videoId) {
      const updateView = async () => {
        try {
          await fetch(`/api/videos/${videoId}/view`, { method: 'POST' });
        } catch (error) {
          console.error("Error updating view count:", error);
        }
      };
      
      updateView();
    }
  }, [videoId]);

  if (error) {
    return <div>Error loading video: {(error as Error).message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{video?.title || "Loading Video..."} | Jupiter Jams</title>
        <meta name="description" content={video?.description || "Jupiter Street to Screen video"} />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Header />
      <Hero videoId={videoId} />
      
      <section className="pt-8 pb-12 px-4">
        <div className="container mx-auto">
          <div className="rounded-xl overflow-hidden bg-jupiter-gray">
            <div className="aspect-video relative">
              {isLoading ? (
                <div className="w-full h-full bg-jupiter-gray flex items-center justify-center">
                  <div className="animate-spin h-12 w-12 border-4 border-jupiter-purple rounded-full border-t-transparent"></div>
                </div>
              ) : (
                <ReactPlayer
                  ref={playerRef}
                  url={video?.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              )}
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <span className="mr-4"><Eye className="inline mr-1 h-3 w-3" /> {formatViews(video?.views || 0)} views</span>
                <span className="mr-4"><Clock className="inline mr-1 h-3 w-3" /> {formatDuration(video?.duration || 0)}</span>
                <span><Calendar className="inline mr-1 h-3 w-3" /> {video?.uploadedAgo || "3 days ago"}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-bg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg font-montserrat">J</span>
                  </div>
                  <div>
                    <h2 className="font-medium">Jupiter Jams</h2>
                    <p className="text-sm text-gray-400">Official Channel</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Like
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
              
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <p className="text-gray-200 mb-2">{video?.description}</p>
                <span className="inline-block bg-jupiter-orange text-white px-3 py-1 rounded-full text-xs font-medium">
                  {video?.location || "Mumbai"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ShortFormVideos location="All Cities" />
      <QRIntegration />
      <Footer />
      <FloatingCTA />
    </>
  );
}
