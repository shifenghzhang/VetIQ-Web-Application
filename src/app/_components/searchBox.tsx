"use client"
import React, { useState } from 'react';

interface Clinic {
    id: number;
    name: string;
    address: string;
}

// This data is for testing purposes
const clinicsData = [
    { id: 1, name: 'Sunshine Clinic', address: '123 Sunshine St' },
    { id: 2, name: 'CBD Clinic', address: '456 CBD St' },
    { id: 3, name: 'Doncaster Clinic', address: '789 Doncaster St' },
];

const SearchBox = () => {
    "use client"; // Ensures this component runs only on the client side

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredClinics, setFilteredClinics] = useState<Clinic[]>(clinicsData);

    // Function to handle input changes and filter results
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter the clinics based on the search term
        const filtered = clinicsData.filter(clinic =>
            clinic.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredClinics(filtered);
    };

    return (
        <div className="flex justify-center pt-4">
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-blue-100 border border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute top-0 left-0 mt-2 ml-3">
                    {/* Icon or other element could go here */}
                </div>
            </div>

            {searchTerm && (
                <div className="search-results">
                    {filteredClinics.map((clinic) => (
                        <div key={clinic.id} className="search-result-item">
                            {clinic.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
