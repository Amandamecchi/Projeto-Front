import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-pink-100 shadow-[0_4px_10px_rgba(255,255,255,0.8)] border-b border-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image 
                            src="/image/casas.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                        <h1 className="text-2xl font-bold text-pink-600">Hogwarts API</h1>
                    </div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link href="/" className="text-pink-600 hover:text-pink-800 font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/informacao" className="text-pink-600 hover:text-pink-800 font-medium">
                                    Personagens
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
