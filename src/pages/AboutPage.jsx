import Layout from '@layout/Layout';
import React from 'react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Acerca de Nosotros
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Somos una empresa dedicada a ofrecer soluciones innovadoras y
          efectivas para nuestros clientes.
        </p>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          Nuestro equipo está compuesto por profesionales altamente capacitados
          en diversas áreas.
        </p>
      </div>
    </Layout>
  );
}
