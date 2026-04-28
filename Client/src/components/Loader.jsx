import React from "react";

const Loader = () => {
    const text = "KALAYAM PHARMA";

    return (
        <div className="fixed inset-0 z-[9999] h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-orange-100 to-white">

            {/* Logo Wrapper */}
            <div className="relative flex items-center justify-center">
                {/* Glow Ring */}
                <div className="absolute w-40 h-40 rounded-full border-4 border-orange-300 animate-ping opacity-30"></div>

                {/* Logo */}
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="w-28 z-10 animate-[scaleIn_0.8s_ease-out_forwards] drop-shadow-xl"
                />
            </div>

            {/* Premium Letter Animation */}
            <div className="mt-6 flex space-x-1 text-sm tracking-[0.4em] text-gray-800 font-medium">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className="inline-block opacity-0 animate-[fadeUp_0.5s_ease_forwards]"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            {/* Animations */}
            <style>
                {`
                @keyframes scaleIn {
                    0% {
                        transform: scale(0.6);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes fadeUp {
                    0% {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Loader;