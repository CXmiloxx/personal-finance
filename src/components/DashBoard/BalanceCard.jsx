import React from 'react';

export default function BalanceCard({ balance, income, expenses }) {
  const savings = income - expenses;
  const savingsRate = (savings / income * 100).toFixed(1);
  
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Balance General</h2>
      <div className="mb-3">
        <p className="text-sm text-gray-500">Balance actual</p>
        <p className="text-2xl font-bold text-blue-600">{balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-lg font-semibold text-green-600">
            +{income.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gastos</p>
          <p className="text-lg font-semibold text-red-600">
            -{expenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t dark:border-dark-border">
        <p className="text-sm text-gray-500">Ahorro mensual</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-indigo-600">
            {savings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
            {savingsRate}% de ingresos
          </span>
        </div>
      </div>
    </div>
  );
}
