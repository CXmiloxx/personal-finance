import Layout from '@layout/Layout';
import React, { useState } from 'react';
import SelectType from './components/SelectType';
import CustomForm from '@/ui/CustomForm';
import { z } from 'zod';

export default function ExpensesIncomePage() {
  const expenssesSchema = z.object({
    categoryName: z.string().min(1, 'La descripción es obligatoria'),
    type: z.string().min(1, 'Debe seleccionar un tipo'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  });

  const expenssesFields = [
    {
      name: 'categoryName',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Ej:gaste 10000 en comida',
    },
    {
      name: 'type',
      label: 'Categoría',
      options: [
        { value: 'Comida', label: 'Comida' },
        { value: 'Ropa', label: 'Ropa' },
      ],
      type: 'select',
      placeholder: 'Ej: Lujos',
    },
  ];

  const [type, setType] = useState('gasto');

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <SelectType type={type} setType={setType} />

        <CustomForm
          title={type === 'gasto' ? 'Gastos' : 'Ingresos'}
          fields={expenssesFields}
          schema={expenssesSchema}
        />
      </div>
    </Layout>
  );
}
