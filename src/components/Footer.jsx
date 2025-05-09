import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white py-6 shadow-lg flex justify-center items-center">
            <div className="container mx-auto flex flex-col items-center gap-4"> {/* Reduced gap */}
                {/* Links Section */}
                <div className="flex flex-wrap justify-center gap-2"> {/* Reduced gap */}
                    <a href="#" className="hover:text-yellow-400 text-lg font-medium">About Us</a>
                    <a href="#" className="hover:text-yellow-400 text-lg font-medium">Contact</a>
                    <a href="#" className="hover:text-yellow-400 text-lg font-medium">Privacy Policy</a>
                </div>

                {/* Social Media Section */}
                <div className="flex gap-4 text-2xl"> {/* Reduced size and gap */}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                        <FaInstagram />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                        <FaFacebook />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                        <FaTwitter />
                    </a>
                </div>

                {/* Copyright Section */}
                <p className="text-yellow-500 font-bold text-md text-center">&copy; 2025 Timora. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
