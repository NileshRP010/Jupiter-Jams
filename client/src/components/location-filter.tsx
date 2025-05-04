import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function LocationFilter({ selectedLocation, onLocationChange }: LocationFilterProps) {
  const locations = ["All Cities", "Mumbai", "Delhi", "Patna", "Bangalore", "Hyderabad"];

  return (
    <div className="bg-jupiter-gray sticky top-16 z-30 py-3 px-4">
      <div className="container mx-auto">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {locations.map((location) => (
            <Button
              key={location}
              onClick={() => onLocationChange(location)}
              variant={selectedLocation === location ? "default" : "secondary"}
              className={
                selectedLocation === location
                  ? "bg-jupiter-purple text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                  : "bg-white bg-opacity-10 hover:bg-jupiter-purple hover:bg-opacity-80 transition text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
              }
            >
              {location}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
