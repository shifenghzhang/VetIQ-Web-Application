import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 flex justify-between">
                <p>&copy; {new Date().getFullYear()} Curious Cat. All rights reserved.</p>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="" className="hover:text-gray-300">About</a></li>
                        <li><a href="" className="hover:text-gray-300">Services</a></li>
                        <li><a href="" className="hover:text-gray-300">Privacy Policy</a></li>
                        <li><a href="" className="hover:text-gray-300">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
