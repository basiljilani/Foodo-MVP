import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

export default function RestaurantDetail() {
  const { id } = useParams();

  return (
    <Layout>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Restaurant Details</h1>
        <p>Restaurant ID: {id}</p>
        {/* TODO: Add restaurant details from Supabase */}
      </div>
    </Layout>
  );
}
