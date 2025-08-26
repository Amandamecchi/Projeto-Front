"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
    const router = useRouter();

    const informacao = () => {
        router.push('/informacao'); 
    };

    return (
        <div className="min-h-screen bg-pink-100">   
            <div className="flex items-center justify-center p-8 pt-16">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="space-y-4">
                        <Image 
                            src="/image/Amanda.png" 
                            alt="Amanda Mechi" 
                            width={200}
                            height={200}
                            className="rounded-full mx-auto mb-6 border-4 border-pink-300"
                        />
                        
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-gray-800">Amanda Mechi</h2>
                            <p className="text-lg text-pink-600 font-semibold">2TDS1</p>
                            <p className="text-gray-700 leading-relaxed">
                                Instrutores: Thiago & Marcello
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Estudante da rede SESI-SP / Escola SENAI Valinhos - Desenvolvedora de Software
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                "Seja a mudança que você quer ver no mundo. Gandhi"
                            </p>
                        </div>
                        
                        <button 
                            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Veja a Api que escolhi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}