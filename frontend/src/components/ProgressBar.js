import React from "react";

export default function ProgressBar({percent}) {
  return (
    <div>
        <div className="text-base font-medium text-center">
            {percent}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" 
                    style={{width: percent}}>
        </div>
        </div>
    </div>
  );
}

