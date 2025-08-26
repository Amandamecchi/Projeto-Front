"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const informacao = () => {
        router.push('/Informacoes'); 
    };

    return (
        <div className="min-h-screen bg-pink-100">
            <header className="w-full bg-pink-300 p-4 shadow-md">
                <h1 className="text-2xl font-bold text-white text-center">Bem-vindo ao Meu Perfil</h1>
            </header>
            
            <div className="flex items-center justify-center p-8 pt-16">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="space-y-4">
                        <img 
                            src="https://avatars.githubusercontent.com/u/158229094?v=4" 
                            alt="Perfil" 
                            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-pink-300"
                        />
                        
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-gray-800">Amanda Mechi</h2>
                            <p className="text-lg text-gray-600">17 anos</p>
                            <p className="text-lg text-pink-600 font-semibold">2TDS1</p>
                            <p className="text-gray-700 leading-relaxed">
                                Instrutores: Thiago & Marcello
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Estudante da rede SESI-SP / Escola SENAI Valinhos - Desenvolvedora de Software
                            </p>
                            <h2 className="text-1xl font-bold text-gray-800">Api dos personagens de Harry Potter</h2>
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