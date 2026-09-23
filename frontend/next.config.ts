import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
   
     turbopack: {
      root: path.resolve(__dirname),
     },
  //reactCompiler: true,     Important
  
};

export default nextConfig;
