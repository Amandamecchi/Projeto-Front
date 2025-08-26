"use client"
import { useState } from "react";
import axios from "axios";

export default function Page() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarUsuarios = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users'); 
            const data = response.data;
            setUsuarios(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-blue-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Usuários</h1>
                <div className="text-center mb-8"> 
                    <div className="mb-6">
                        <button onClick={buscarUsuarios} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded">
                            {loading ? 'Carregando...' : '🔍Buscar Usuários'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {usuarios.map((usuario) => (
                        <div key={usuario.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{usuario.name}</h2>
                            <p className="text-gray-700 mb-1"><strong>Email:</strong> {usuario.email}</p>
                            <p className="text-gray-700 mb-1"><strong>Telefone:</strong> {usuario.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}