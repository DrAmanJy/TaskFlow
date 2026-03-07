import React, { useRef } from "react";
import { Camera, AlertCircle } from "lucide-react";

const ImageUpload = ({ value, onImageChange, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Pass the base64 string back to the form
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-1">
      <div
        className="relative group cursor-pointer rounded-full"
        onClick={() => fileInputRef.current.click()}
      >
        <div
          className={`w-20 h-20 rounded-full bg-slate-50 border-2 border-dashed flex items-center justify-center overflow-hidden transition-all shadow-sm
          ${error ? "border-red-300 bg-red-50/50" : "border-slate-300 group-hover:border-indigo-400 group-hover:bg-indigo-50"}`}
        >
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera
              className={`w-6 h-6 ${error ? "text-red-400" : "text-slate-400 group-hover:text-indigo-500"}`}
            />
          )}
        </div>

        <div className="absolute inset-0 rounded-full bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-[10px] font-bold uppercase">
            Change
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Internal Error Display */}
      <div className="min-h-[20px] flex items-center justify-center gap-1.5 mt-1">
        {error?.message && (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <p className="text-[11px] font-medium text-red-500 leading-none">
              {error.message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
