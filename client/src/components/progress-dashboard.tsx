import { useQuery } from "@tanstack/react-query";
import { calculateProgress } from "@/lib/utils";
import { CheckCircle, Timer, Clock } from "lucide-react";

export function ProgressDashboard() {
  const { data: progressData } = useQuery({
    queryKey: ['/api/progress'],
  });
  
  const { data: productionTimeline } = useQuery({
    queryKey: ['/api/progress/timeline'],
  });

  return (
    <section className="py-12 px-4 bg-jupiter-gray">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold font-montserrat mb-6">Weekly Progress Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressData?.metrics.map((metric) => (
            <div key={metric.id} className="bg-black bg-opacity-40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{metric.name}</h3>
                <span className={`text-jupiter-${metric.color} font-bold`}>{metric.value}</span>
              </div>
              <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
                <div 
                  className={`bg-jupiter-${metric.color} h-2 rounded-full`} 
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
              <p className="text-gray-300 text-xs mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-black bg-opacity-40 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Production Timeline</h3>
          
          <div className="space-y-6">
            {productionTimeline?.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className={`w-8 h-8 rounded-full bg-jupiter-${item.status === 'completed' ? 'purple' : item.status === 'in-progress' ? 'teal' : 'gray-600'} flex items-center justify-center flex-shrink-0 mr-4 mt-1`}>
                  {item.status === 'completed' ? (
                    <CheckCircle className="text-white h-4 w-4" />
                  ) : item.status === 'in-progress' ? (
                    <Timer className="text-white h-4 w-4" />
                  ) : (
                    <Clock className="text-white h-4 w-4" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold">{item.title}</h4>
                    <span className="text-gray-400 text-sm">{item.statusText}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`bg-${tag.color}-500 bg-opacity-20 text-${tag.color}-400 text-xs px-2 py-0.5 rounded`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
