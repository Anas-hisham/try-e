import React from "react";

const SkeletonProductInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="h-5 w-3/4 md:w-1/2 bg-slate-200 rounded-md animate-pulse"></div>
      
      {/* Category */}
      <div className="h-4 w-full md:w-2/3 bg-slate-200 rounded-md animate-pulse"></div>
      
      {/* Description */}
      <div className="h-4 w-3/4 md:w-1/2 bg-slate-200 rounded-md animate-pulse"></div>
      
      {/* Price */}
      <div className="h-6 w-24 bg-slate-300 rounded-md animate-pulse"></div>
      
      {/* Button */}
      <div className="h-10 w-40 bg-slate-300 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default SkeletonProductInfo;
