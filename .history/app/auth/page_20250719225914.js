import React from "react";

const page = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-wavey" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 opacity-30 rounded-full blur-2xl animate-floatX delay-200" />

      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1> */}
          h1
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
        <path
          fill="#302b63"
          fillOpacity="0.4"
          d="M0,160L80,154.7C160,149,320,139,480,128C640,117,800,107,960,112C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default page;
