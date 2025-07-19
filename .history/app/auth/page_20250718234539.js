import React from "react";

const page = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Gradient blob */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 opacity-30 rounded-full blur-2xl animate-pulse delay-200" />

      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
