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
        <div style={{minHeight: '100vh', backgroundColor: '#fce7f3', padding: '2rem'}}>
            <div style={{maxWidth: '1024px', margin: '0 auto'}}>
                <div style={{backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                        <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937'}}>
                            {personagem.attributes.name}
                        </h1>
                        <button 
                            onClick={() => router.push('/informacao')}
                            style={{
                                backgroundColor: '#ec4899',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            ← Voltar
                        </button>
                    </div>
                    
                    <p>Detalhes do personagem: {personagem.attributes.name}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
