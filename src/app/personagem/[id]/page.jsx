"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Footer from "../../../components/Footer";

export default function PersonagemDetalhes() {
    const [personagem, setPersonagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const buscarPersonagem = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/characters/${id}`);
                setPersonagem(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar personagem:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            buscarPersonagem();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Carregando...</h1>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!personagem) {
        return (
            <div className="min-h-screen bg-pink-200 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Personagem não encontrado</h1>
                    <button 
                        onClick={() => router.push('/informacao')}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar para a lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pink-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{personagem.attributes.name}</h1>
                        <button 
                            onClick={() => router.push('/informacao')}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ← Voltar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                            {personagem.attributes.image ? (
                                <img 
                                    src={personagem.attributes.image} 
                                    alt={personagem.attributes.name}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                />
                            ) : (
                                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Sem imagem</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Gênero:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.gender || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Casa:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.house || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Espécie:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.species || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Status Sanguíneo:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.blood_status || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Nascimento:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.born || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Morte:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.died || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Patronus:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.patronus || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Cor dos Olhos:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.eye_color || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Cor do Cabelo:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.hair_color || 'N/A'}</span>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded">
                                    <strong className="text-gray-800">Nacionalidade:</strong> 
                                    <span className="ml-2 text-gray-700">{personagem.attributes.nationality || 'N/A'}</span>
                                </div>
                            </div>

                            {personagem.attributes.alias_names && personagem.attributes.alias_names.length > 0 && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <strong className="text-gray-800">Apelidos:</strong>
                                    <ul className="list-disc list-inside mt-2 text-gray-700">
                                        {personagem.attributes.alias_names.map((alias, index) => (
                                            <li key={index}>{alias}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {personagem.attributes.family_members && personagem.attributes.family_members.length > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <strong className="text-gray-800">Família:</strong>
                                    <ul className="list-disc list-inside mt-2 text-gray-700">
                                        {personagem.attributes.family_members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {personagem.attributes.jobs && personagem.attributes.jobs.length > 0 && (
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <strong className="text-gray-800">Profissões:</strong>
                                    <ul className="list-disc list-inside mt-2 text-gray-700">
                                        {personagem.attributes.jobs.map((job, index) => (
                                            <li key={index}>{job}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {personagem.attributes.wiki && (
                        <div className="mt-8 text-center">
                            <a 
                                href={personagem.attributes.wiki}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
                            >
                                📖 Ver na Wiki do Harry Potter
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
