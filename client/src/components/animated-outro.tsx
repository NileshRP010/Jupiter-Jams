import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, Info, PaintBucket, QrCode, Settings } from "lucide-react";

export function AnimatedOutro() {
  const { data: outroData } = useQuery({
    queryKey: ['/api/outro'],
  });

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold font-montserrat mb-6">Custom Animated Outro</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-xl overflow-hidden bg-jupiter-gray relative">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-jupiter-purple to-jupiter-teal opacity-40"></div>
                <div className="flex flex-col items-center justify-center h-full px-6 py-8 relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-bg flex items-center justify-center mb-4 animate-pulse-slow">
                    <span className="text-white font-bold text-4xl font-montserrat">J</span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-xl md:text-2xl mb-2">What is Jupiter?</h3>
                    <p className="text-gray-200 text-sm mb-4">
                      Animated explainer showcasing Jupiter's key features
                    </p>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="secondary" 
                        className="bg-white text-jupiter-purple px-4 py-2 rounded-lg font-medium text-sm flex items-center"
                        onClick={() => {
                          // Would open a modal or play a video
                          if (outroData?.previewUrl) {
                            window.open(outroData.previewUrl, '_blank');
                          }
                        }}
                      >
                        <Play className="mr-2 h-4 w-4" /> Preview Outro
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-3">Outro Features</h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jupiter-purple bg-opacity-20 flex items-center justify-center mr-4">
                  <Info className="text-jupiter-purple h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">15-Second Explainer</h4>
                  <p className="text-gray-300 text-sm">Quick animated explanation of Jupiter's core offerings</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jupiter-teal bg-opacity-20 flex items-center justify-center mr-4">
                  <PaintBucket className="text-jupiter-teal h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Jupiter Branding</h4>
                  <p className="text-gray-300 text-sm">Consistent visual identity across all videos</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jupiter-orange bg-opacity-20 flex items-center justify-center mr-4">
                  <QrCode className="text-jupiter-orange h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">QR Code Integration</h4>
                  <p className="text-gray-300 text-sm">Direct onboarding to Jupiter products</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jupiter-yellow bg-opacity-20 flex items-center justify-center mr-4">
                  <Settings className="text-jupiter-yellow h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Customizable Call-to-Action</h4>
                  <p className="text-gray-300 text-sm">Tailored messaging for each video's context</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
