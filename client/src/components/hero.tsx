import { Play, Share2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface HeroProps {
  videoId?: string;
}

export function Hero({ videoId }: HeroProps) {
  const { data: featuredVideo } = useQuery({
    queryKey: ['/api/videos/featured'],
    enabled: !videoId
  });

  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="relative w-full rounded-xl overflow-hidden" style={{ maxHeight: "85vh" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-jupiter-dark to-transparent z-10"></div>
          <img 
            src={featuredVideo?.coverImage || "https://images.unsplash.com/photo-1616832880334-b1004d6c3c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1336&h=768"} 
            alt="Streets of India" 
            className="w-full object-cover h-[40vh] md:h-[60vh]"
          />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
            <div className="mb-4">
              <span className="inline-block bg-jupiter-orange text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                <span className="mr-1">🔥</span> Trending
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-2">
                {featuredVideo?.title || "Jupiter Street to Screen"}
              </h2>
              <p className="text-gray-200 text-lg mb-4">
                {featuredVideo?.description || "Bringing the Jupiverse to the streets of India"}
              </p>
              <div className="flex items-center space-x-2">
                <Link href={videoId ? "/" : `/video/${featuredVideo?.id || "featured"}`}>
                  <Button size="lg" className="bg-jupiter-purple hover:bg-opacity-90 transition text-white px-6 py-3 rounded-full flex items-center font-bold text-lg">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Latest
                  </Button>
                </Link>
                <Button size="icon" variant="secondary" className="bg-white bg-opacity-10 hover:bg-opacity-20 transition backdrop-blur-sm text-white px-4 py-3 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
