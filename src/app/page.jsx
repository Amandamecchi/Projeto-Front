"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Page() {
    const router = useRouter();

    const informacao = () => {
        router.push('/informacao'); 
    };

    const irParaPost = () => {
        router.push('/post');
    };

    return (
        <div className={`min-h-screen bg-white ${poppins.className}`}>   
            <div className="flex items-center justify-center p-8 pt-30">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full text-center">
                    <div className="space-y-4">
                        <Image 
                            src="/image/Amanda.png" 
                            alt="Amanda Mechi" 
                            width={300}
                            height={300}
                            className="rounded-full mx-auto mb-6 border-4 border-pink-300 shadow-full"
                        />
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-4">
                                <h2 className="text-3xl font-bold text-gray-800">Amanda Mechi</h2>
                                <Image 
                                    src="/image/huflepuff.png" 
                                    alt="Hufflepuff" 
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                            </div>
                            <p className="text-lg text-pink-600 font-semibold">2TDS1</p>
                            <p className="text-gray-700 leading-relaxed">
                                Instrutores: Thiago & Marcello
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Estudante da rede SESI-SP / Escola SENAI Valinhos - Desenvolvedora de Software
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                "Seja a mudança que você quer ver no mundo." - Gandhi
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                            <button 
                                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={informacao}
                            >
                                Veja a Api que Escolhi!
                            </button>
                            
                            <button 
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={irParaPost}
                            >
                                Criar Comentário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}