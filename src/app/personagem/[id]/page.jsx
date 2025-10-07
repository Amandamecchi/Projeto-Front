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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-pink-200">
                    <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 text-white p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">
                                {personagem.attributes.name}
                            </h1>
                            <button 
                                onClick={() => router.push('/informacao')}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg transition duration-300 border border-white/30"
                            >
                                ← Voltar para Lista
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex justify-center">
                                {personagem.attributes.image ? (
                                    <div className="relative">
                                        <img 
                                            src={personagem.attributes.image} 
                                            alt={personagem.attributes.name}
                                            className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-pink-200"
                                        />
                                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur opacity-20"></div>
                                    </div>
                                ) : (
                                    <div className="w-80 h-80 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center border-4 border-pink-200">
                                        <div className="text-center text-pink-700">
                                            <div className="text-6xl mb-4">🧙‍♂️</div>
                                            <p className="font-semibold">Imagem não disponível</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-pink-200">
                                    Informações do Personagem
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">👤</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Nome</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">⚥</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Gênero</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.gender || 'Não informado'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">📏</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Altura</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.height || 'Não informado'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🏠</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Casa de Hogwarts</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.house || 'Não informado'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🦌</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Patrono</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.patronus || 'Não informado'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🧬</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Espécie</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.species || 'Não informado'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-pink-200">
                            <div className="grid md:grid-cols-2 gap-6">
                                {personagem.attributes.nationality && (
                                    <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🌍</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Nacionalidade</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.nationality}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {personagem.attributes.skin_color && (
                                    <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🎨</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Cor da Pele</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.skin_color}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {personagem.attributes.hair_color && (
                                    <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">💇</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Cor do Cabelo</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.hair_color}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {personagem.attributes.eye_color && (
                                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-400">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">👁️</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Cor dos Olhos</h3>
                                                <p className="text-gray-900 font-medium">{personagem.attributes.eye_color}</p>
                                            </div>
                                        </div>
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
                                    className="inline-flex items-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <span className="mr-2">📖</span>
                                    Saiba mais na Wiki
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
