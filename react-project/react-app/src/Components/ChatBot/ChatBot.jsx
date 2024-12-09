import React, { useState } from 'react';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();

            if (res.ok) {
                setResults(data);
                setError('');
            } else {
                setResults([]);
                setError(data.error || 'An error occurred.');
            }
        } catch (err) {
            setResults([]);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    return (
        <div className="chatbot">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie, TV show, or person..."
                />
                <button type="submit">Search</button>
            </form>

            {error && <p className="error">{error}</p>}

            <div className="results">
                {results.map((result) => (
                    <div key={result.id} className="result-item">
                        <h3>{result.title || result.name}</h3>
                        <p>{result.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chatbot;
