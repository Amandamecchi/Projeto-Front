"use client"
import { useState } from "react";
import axios from "axios";

export default function informacao() {
    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(false);

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
                <h1 className="text-3xl font-bold text-center mb-8">Personagens de Harry Potter</h1>
                <div className="text-center mb-8"> 
                    <div className="mb-6 flex gap-4 justify-center">
                        <button onClick={buscarPersonagem} disabled={loading} className="bg-red-300 hover:bg-red-400 text-white font-bold py-4 px-6 rounded">
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
                            <h2 className="text-xl font-bold mb-2">{personagem.name}</h2>
                            <p className="text-gray-700 mb-1"><strong>gender:</strong> {personagem.gender}</p>
                            <p className="text-gray-700 mb-1"><strong>height:</strong> {personagem.height}</p>
                            <p className="text-gray-700 mb-1"><strong>house:</strong> {personagem.house}</p>
                            <p className="text-gray-700 mb-1"><strong>image:</strong> {personagem.image}</p>
                            <p className="text-gray-700 mb-1"><strong>patronus:</strong> {personagem.patronus}</p>
                            <p className="text-gray-700 mb-1"><strong>species:</strong> {personagem.species}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}