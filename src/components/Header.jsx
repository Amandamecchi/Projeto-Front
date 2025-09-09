import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-pink-900 via-pink-700 to-rose-900 shadow-2xl border-b-4 border-pink-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Image 
                                src="/image/footer.png"
                                alt="Logo"
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-pink-400 shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full blur opacity-30"></div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400 bg-clip-text text-transparent drop-shadow-lg">
                                Hogwarts API
                            </h1>
                            <p className="text-pink-200 text-sm italic">Discubra a Mágia</p>
                        </div>
                    </div>
                    <nav className="bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-400/30">
                        <ul className="flex space-x-8">
                            <li>
                                <Link href="/" className="text-pink-300 hover:text-pink-100 font-semibold text-lg transition-all duration-300 hover:scale-110 flex items-center space-x-2">
                                    <span>🏠</span>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/informacao" className="text-pink-300 hover:text-pink-100 font-semibold text-lg transition-all duration-300 hover:scale-110 flex items-center space-x-2">
                                    <span>⚡</span>
                                    <span>Personagens</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
