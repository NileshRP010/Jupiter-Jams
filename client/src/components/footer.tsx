import { Link } from "wouter";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-jupiter-dark py-10 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
            <div className="flex items-center mb-6 md:mb-0 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-bg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg font-montserrat">J</span>
              </div>
              <h2 className="text-xl font-bold font-montserrat text-white">Jupiter <span className="text-jupiter-teal">Jams</span></h2>
            </div>
          </Link>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="https://twitter.com/JupiterExchange" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jupiter-teal transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/jupiterdex" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jupiter-teal transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com/c/JupiterExchange" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jupiter-teal transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="https://tiktok.com/@jupiterexchange" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jupiter-teal transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                <path d="M15 8v6a6 6 0 0 1-6 6v-8"></path>
                <line x1="15" y1="10" x2="15" y2="4"></line>
              </svg>
            </a>
          </div>
          
          <div>
            <a 
              href="https://jupiter.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-jupiter-purple hover:bg-opacity-80 text-white px-4 py-2 rounded-full flex items-center font-medium transition text-sm"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Visit Jupiter
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jupiter Jams. All rights reserved. Part of the Jupiter Uplink initiative.</p>
        </div>
      </div>
    </footer>
  );
}
