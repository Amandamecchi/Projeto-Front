"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Footer from "../../../components/Footer";

export default function PersonagemDetalhes() {
    const [personagem, setPersonagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [searching, setSearching] = useState(false);
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

    const handleSearchByName = async () => {
        if (searchName.trim()) {
            setSearching(true);
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/characters?filter[name_cont]=${encodeURIComponent(searchName)}`);
                setSearchResults(response.data.data || []);
                setShowResults(true);
            } catch (error) {
                console.error('Erro ao buscar personagens:', error);
                setSearchResults([]);
                setShowResults(true);
            } finally {
                setSearching(false);
            }
        }
    };

    const selectCharacter = (characterId) => {
        router.push(`/personagem/${characterId}`);
        setShowResults(false);
        setSearchName("");
    };

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
            <div style={{
                maxWidth: '1024px', 
                margin: '0 auto 2rem auto', 
                position: 'relative',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '3px solid red' 
            }}>
                <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem'}}>
                    🔍 BUSCAR PERSONAGENS (TESTE)
                </h3>
                
                <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Digite o nome do personagem"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            fontSize: '1rem'
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchByName()}
                    />
                    <button
                        onClick={handleSearchByName}
                        disabled={searching || !searchName.trim()}
                        style={{
                            backgroundColor: searching ? '#9ca3af' : '#ec4899',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: searching ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {searching ? 'Buscando...' : '🔍 Buscar'}
                    </button>
                </div>

                {showResults && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                        zIndex: 50,
                        marginTop: '0.5rem',
                        maxHeight: '20rem',
                        overflowY: 'auto'
                    }}>
                        {searchResults.length > 0 ? (
                            <>
                                <div style={{padding: '0.75rem', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                                    <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#374151'}}>
                                        {searchResults.length} personagem(s) encontrado(s)
                                    </span>
                                </div>
                                {searchResults.map((character) => (
                                    <div
                                        key={character.id}
                                        onClick={() => selectCharacter(character.id)}
                                        style={{
                                            padding: '1rem',
                                            borderBottom: '1px solid #e5e7eb',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                    >
                                        {character.attributes.image ? (
                                            <img 
                                                src={character.attributes.image} 
                                                alt={character.attributes.name}
                                                style={{
                                                    width: '3rem',
                                                    height: '3rem',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '3rem',
                                                height: '3rem',
                                                backgroundColor: '#d1d5db',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                color: '#6b7280'
                                            }}>
                                                N/A
                                            </div>
                                        )}
                                        <div>
                                            <div style={{fontWeight: '600', color: '#111827'}}>
                                                {character.attributes.name}
                                            </div>
                                            {character.attributes.house && (
                                                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                                                    Casa: {character.attributes.house}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div style={{padding: '1.5rem', textAlign: 'center', color: '#6b7280'}}>
                                Nenhum personagem encontrado com o nome "{searchName}"
                            </div>
                        )}
                        <button
                            onClick={() => setShowResults(false)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#f9fafb',
                                border: 'none',
                                borderTop: '1px solid #e5e7eb',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                color: '#6b7280'
                            }}
                        >
                            ✕ Fechar resultados
                        </button>
                    </div>
                )}
            </div>

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
