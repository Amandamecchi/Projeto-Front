import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-pink-100 shadow-[0_-4px_10px_rgba(255,255,255,0.8)] border-t border-white/50 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Image
                        src="/image/footer.png"
                        alt="Logo"
                        width={135}
                        height={135}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-800">Hogwarts API</span>
                        <h1 className="text-gray-500 text-base mt-1">amanda.mechi@aluno.senai.br</h1>
                    </div>
                </div>
                <nav className="flex space-x-4">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/icons8-github-96.png" alt="GitHub" width={32} height={32} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/icons8-instagram-logo-96.png" alt="Instagram" width={32} height={32} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/icons8-linkedin-96.png" alt="LinkedIn" width={32} height={32} />
                    </Link>
                </nav>
            </div>
            <div className="text-center text-gray-600 text-sm py-2 border-t border-white/30">
                © {new Date().getFullYear()} Hogwarts API. Todos os direitos reservados.
            </div>
        </footer>
    );
}