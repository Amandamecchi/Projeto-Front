"use client"
import { useState } from "react";
import { Pagination } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function informacao() {
    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const router = useRouter();

    const buscarPersonagem = async (page = 1, pageSize = 12) => {
        toast.success('Veja os personagens! 🧙‍♂️', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        
        setLoading(true);
        try {
            const response = await axios.get(`https://api.potterdb.com/v1/characters?page[number]=${page}&page[size]=${pageSize}`);
            setPersonagens(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white p-8">
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
                     <div className="bg-gradient-to-br from-pink-200 via-white to-pink-100 p-8 rounded-2xl shadow-xl border-2 border-pink-300 mb-10">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-extrabold text-pink-700 mb-2 tracking-wide">Nome da API escolhida</h2>
                            <p className="text-gray-800 font-semibold">Potter DB API</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-pink-600 mb-2">Link externo para a documentação oficial</h3>
                            <a href="https://docs.potterdb.com/" target="_blank" className="text-blue-600 hover:text-blue-800 underline break-all">
                                https://docs.potterdb.com/
                            </a>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-pink-600 mb-2">URL base usada para o axios/fetch</h3>
                            <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded-lg border border-pink-200 shadow-sm">https://api.potterdb.com/v1</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-pink-600 mb-2">Endpoint escolhido para buscar os dados</h3>
                            <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded-lg border border-pink-200 shadow-sm">/characters</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-pink-600 mb-2">Lista de atributos recebidos na resposta da API</h3>
                            <ul className="text-gray-700 list-disc list-inside space-y-2 pl-2">
                                <li><span className="font-bold text-pink-500">name</span> - Nome do personagem</li>
                                <li><span className="font-bold text-pink-500">gender</span> - Gênero do personagem</li>
                                <li><span className="font-bold text-pink-500">height</span> - Altura do personagem</li>
                                <li><span className="font-bold text-pink-500">house</span> - Casa de Hogwarts</li>
                                <li><span className="font-bold text-pink-500">image</span> - URL da imagem do personagem</li>
                                <li><span className="font-bold text-pink-500">patronus</span> - Patrono do personagem</li>
                                <li><span className="font-bold text-pink-500">species</span> - Espécie do personagem</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-pink-600 mb-2">Descrição breve sobre a API</h3>
                            <p className="text-gray-700 italic bg-pink-50 p-3 rounded-lg border-l-4 border-pink-300">
                                A Potter DB API é uma API gratuita que fornece informações detalhadas sobre o universo de Harry Potter.<br/>
                                Ela disponibiliza dados sobre personagens, casas de Hogwarts, feitiços, poções e muito mais.<br/>
                                É uma fonte completa para desenvolvedores que desejam criar aplicações relacionadas ao mundo mágico criado por J.K. Rowling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-8"> 
                    <div className="mb-6 flex gap-4 justify-center">
                        <button onClick={() => buscarPersonagem(currentPage, pageSize)} disabled={loading} className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-4 px-6 rounded">
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
                                <div className="flex flex-col h-full justify-between">
                                    <div>
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
                                    </div>
                                    <div className="mt-4 flex justify-center items-end">
                                        <button 
                                            onClick={() => router.push(`/personagem/${personagem.id}`)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                        >
                                            📋 Detalhes
                                        </button>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={500}
                        onChange={(page, size) => {
                            setCurrentPage(page);
                            setPageSize(size);
                            buscarPersonagem(page, size);
                        }}
                        showSizeChanger
                        pageSizeOptions={[6, 12, 24, 48]}
                    />
                </div>
            </div>
        </div>
    );
}