"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function informacao() {
    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const buscarPersonagem = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.potterdb.com/v1/characters'); 
            const data = response.data;
            setPersonagens(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-pink-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <Image 
                        src="/image/plataformaa.png" 
                        alt="Plataforma 9¾" 
                        width={80}
                        height={80}
                        className="rounded"
                    />
                    <h1 className="text-3xl font-bold text-gray-800">Personagens de Harry Potter</h1>
                </div>
                <div className="text-center mb-8"> 
                    <div className="mb-6 flex gap-4 justify-center">
                        <button onClick={buscarPersonagem} disabled={loading} className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-4 px-6 rounded">
                            {loading ? 'Carregando...' : '🔍Buscar Personagem'}
                        </button>
                        <button onClick={() => window.location.href = '/'} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded">
                            🏠 Voltar para Home
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {personagens.map((personagem) => (
                        <div key={personagem.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{personagem.attributes.name}</h2>
                            <p className="text-gray-700 mb-1"><strong>Gender:</strong> {personagem.attributes.gender || 'N/A'}</p>
                            <p className="text-gray-700 mb-1"><strong>Height:</strong> {personagem.attributes.height || 'N/A'}</p>
                            <p className="text-gray-700 mb-1"><strong>House:</strong> {personagem.attributes.house || 'N/A'}</p>
                            {personagem.attributes.image && (
                                <div className="mb-2">
                                    <img src={personagem.attributes.image} alt={personagem.attributes.name} className="w-full h-32 object-cover rounded" />
                                </div>
                            )}
                            <p className="text-gray-700 mb-1"><strong>Patronus:</strong> {personagem.attributes.patronus || 'N/A'}</p>
                            <p className="text-gray-700 mb-1"><strong>Species:</strong> {personagem.attributes.species || 'N/A'}</p>
                            
                            <div className="mt-4 text-center">
                                <button 
                                    onClick={() => router.push(`/personagem/${personagem.id}`)}
                                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                >
                                    📋 Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}