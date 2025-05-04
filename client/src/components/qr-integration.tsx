import { useQuery } from "@tanstack/react-query";
import { generateQRCodeUrl } from "@/lib/utils";
import { Smartphone, TrendingUp, Tags } from "lucide-react";

export function QRIntegration() {
  const { data: qrData } = useQuery({
    queryKey: ['/api/qr-code'],
  });

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold font-montserrat mb-4">QR Code Onboarding</h2>
            <p className="text-gray-300 mb-6">Each video ends with a custom QR code that takes viewers directly to the Jupiter app — turning entertainment into active users.</p>
            
            <div className="space-y-4">
              <div className="flex items-center bg-jupiter-gray bg-opacity-50 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-jupiter-purple flex items-center justify-center mr-3">
                  <Smartphone className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-medium">Instant Mobile Access</h4>
                  <p className="text-gray-400 text-sm">One scan takes users directly to their app store</p>
                </div>
              </div>
              
              <div className="flex items-center bg-jupiter-gray bg-opacity-50 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-jupiter-teal flex items-center justify-center mr-3">
                  <TrendingUp className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-medium">Tracking & Analytics</h4>
                  <p className="text-gray-400 text-sm">Monitor scan counts and conversion rates</p>
                </div>
              </div>
              
              <div className="flex items-center bg-jupiter-gray bg-opacity-50 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-jupiter-orange flex items-center justify-center mr-3">
                  <Tags className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-medium">Special Offers</h4>
                  <p className="text-gray-400 text-sm">Exclusive benefits for video viewers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="mb-4">
                <div className="w-48 h-48 mx-auto bg-black p-4 rounded-lg">
                  {qrData?.qrPath ? (
                    <img 
                      src={generateQRCodeUrl(qrData.qrPath)} 
                      alt="Jupiter QR Code"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full border-4 border-white rounded flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-bg flex items-center justify-center">
                        <span className="text-white font-bold text-2xl font-montserrat">J</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-lg text-jupiter-dark">Scan to Download Jupiter</h3>
              <p className="text-gray-600 text-sm">Start your crypto journey now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
