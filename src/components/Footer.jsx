import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-pink-900 via-rose-800 to-pink-900 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.3)] border-t border-pink-400/30 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-6 md:mb-0">
                        <div className="relative">
                            <Image
                                src="/image/casas.png"
                                alt="Logo"
                                width={80}
                                height={80}
                                className="shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                                Hogwarts API
                            </span>
                            <p className="text-pink-200 text-sm mt-1 font-medium">amanda.mechi@aluno.senai.br</p>
                        </div>
                    </div>
                    
                    <nav className="flex space-x-6">
                        <Link 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group transition-all duration-300 hover:scale-110"
                        >
                            <div className="p-2 rounded-full bg-pink-700/50 group-hover:bg-pink-600/70 border border-pink-400/30 group-hover:border-pink-300/50 transition-all duration-300">
                                <Image src="/icons/icons8-github-96.png" alt="GitHub" width={24} height={24} />
                            </div>
                        </Link>
                        <Link 
                            href="https://www.instagram.com/amanda.mecchi?igsh=MjVhbXo4YmFkZDll" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group transition-all duration-300 hover:scale-110"
                        >
                            <div className="p-2 rounded-full bg-pink-700/50 group-hover:bg-pink-600/70 border border-pink-400/30 group-hover:border-pink-300/50 transition-all duration-300">
                                <Image src="/icons/icons8-instagram-logo-96.png" alt="Instagram" width={24} height={24} />
                            </div>
                        </Link>
                        <Link 
                            href="https://www.linkedin.com/in/amanda-mechi-4287b52b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group transition-all duration-300 hover:scale-110"
                        >
                            <div className="p-2 rounded-full bg-pink-700/50 group-hover:bg-pink-600/70 border border-pink-400/30 group-hover:border-pink-300/50 transition-all duration-300">
                                <Image src="/icons/icons8-linkedin-96.png" alt="LinkedIn" width={24} height={24} />
                            </div>
                        </Link>
                    </nav>
                </div>
                
                <div className="text-center text-pink-200 text-sm py-4 border-t border-pink-400/20">
                    <p className="font-medium">
                        © {new Date().getFullYear()} Hogwarts API. Todos os direitos reservados.
                    </p>
                    <p className="text-xs text-pink-300 mt-1">
                        Desenvolvido com magia e tecnologia ✨
                    </p>
                </div>
            </div>
        </footer>
    );
}