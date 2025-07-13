import type { NextConfig } from "next";

const isFirebase = process.env.BUILD_TARGET === 'firebase';


const nextConfig: NextConfig = {
   ...(isFirebase && { output: 'export' }), 
  images: {
    unoptimized: isFirebase, 
  },
};

export default nextConfig;
