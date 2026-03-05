import React from "react";
import { Camera } from "lucide-react";

const ImageUpload = ({ image, onChange }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div
        className="relative group cursor-pointer rounded-full"
        onClick={() => document.getElementById("avatar-upload").click()}
      >
        <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-50">
          {image ? (
            <img
              src={image}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          )}
        </div>
        <div className="absolute inset-0 rounded-full bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-medium">Upload</span>
        </div>
      </div>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageUpload;
