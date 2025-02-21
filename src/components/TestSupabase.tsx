import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function TestSupabase() {
  const { user } = useAuth();
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    async function testConnection() {
      try {
        // Test database connection
        const { data, error } = await supabase
          .from('restaurants')
          .select('count')
          .single();

        if (error) {
          console.error('Error:', error);
          setTestMessage('❌ Database connection failed: ' + error.message);
          return;
        }

        setTestMessage('✅ Successfully connected to Supabase!');

        // If user is logged in, test auth
        if (user) {
          setTestMessage(prev => prev + '\n✅ User authentication working!');
        }

      } catch (error) {
        console.error('Error:', error);
        setTestMessage('❌ Test failed: ' + error);
      }
    }

    testConnection();
  }, [user]);

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      zIndex: 9999,
      padding: '16px',
      margin: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '2px solid #ef4444',
      maxWidth: '300px'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#ef4444'
      }}>Supabase Test</h2>
      <pre style={{
        whiteSpace: 'pre-wrap',
        fontSize: '0.875rem'
      }}>
        {testMessage || 'Testing connection...'}
      </pre>
      
      {user && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '4px'
        }}>
          <h3 style={{
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>Current User:</h3>
          <pre style={{
            fontSize: '0.875rem'
          }}>
            {JSON.stringify({ id: user.id, email: user.email }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
