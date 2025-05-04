import { Link } from "wouter";
import { Rocket } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-jupiter-dark shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-bg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl font-montserrat">J</span>
            </div>
            <h1 className="text-xl font-bold font-montserrat text-white">
              Jupiter <span className="text-jupiter-teal">Jams</span>
            </h1>
          </div>
        </Link>
        
        <div className="flex items-center">
          <a 
            href="https://jupiter.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-jupiter-purple hover:bg-opacity-80 text-white px-4 py-2 rounded-full flex items-center font-medium transition"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Launch App
          </a>
        </div>
      </div>
    </header>
  );
}
