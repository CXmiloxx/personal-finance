import Layout from '@layout/Layout';

export default function ServicesPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Servicios
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Aquí puedes encontrar una lista de nuestros servicios.
        </p>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          Contáctanos para más información.
        </p>
      </div>
    </Layout>
  );
}
