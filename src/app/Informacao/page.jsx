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
                     {/* Informações da API */}
                     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Nome da API escolhida</h2>
                            <p className="text-gray-700">Potter DB API</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Link externo para a documentação oficial</h3>
                            <a href="https://docs.potterdb.com/" target="_blank" className="text-blue-600 hover:text-blue-800 underline">
                                https://docs.potterdb.com/
                            </a>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">URL base usada para o axios/fetch</h3>
                            <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">https://api.potterdb.com/v1</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Endpoint escolhido para buscar os dados</h3>
                            <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">/characters</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lista de atributos recebidos na resposta da API</h3>
                            <ul className="text-gray-700 list-disc list-inside space-y-1">
                                <li>name - Nome do personagem</li>
                                <li>gender - Gênero do personagem</li>
                                <li>height - Altura do personagem</li>
                                <li>house - Casa de Hogwarts</li>
                                <li>image - URL da imagem do personagem</li>
                                <li>patronus - Patrono do personagem</li>
                                <li>species - Espécie do personagem</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descrição breve sobre a API</h3>
                            <p className="text-gray-700">
                                A Potter DB API é uma API gratuita que fornece informações detalhadas sobre o universo de Harry Potter. 
                                Ela disponibiliza dados sobre personagens, casas de Hogwarts, feitiços, poções e muito mais. 
                                É uma fonte completa para desenvolvedores que desejam criar aplicações relacionadas ao mundo mágico criado por J.K. Rowling.
                            </p>
                        </div>
                    </div>
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