// File: src/components/PropertyFinder.js
import React, { useState } from 'react';
import axios from 'axios';

const PropertyFinder = () => {
  const [query, setQuery] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post('https://dream-house-ai-backend.onrender.com/api/find-properties', {
        query,
        whatsappNumber: whatsapp || undefined
      });

      setResponse(res.data.response);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Find Your Dream House</h2>
      <input
        type="text"
        placeholder="Enter house type, location, budget"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', marginBottom: '1rem' }}
      /><br />
      <input
        type="text"
        placeholder="WhatsApp number (optional)"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', marginBottom: '1rem' }}
      /><br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Finding...' : 'Find Property'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>AI Suggestions</h3>
          <p>{response}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PropertyFinder;
