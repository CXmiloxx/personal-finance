export default function TransactionsList({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Últimas Transacciones</h2>
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-3 px-3 text-sm text-gray-500">{transaction.date}</td>
                <td className="py-3 px-3 text-sm font-medium text-gray-900">{transaction.description}</td>
                <td className={`py-3 px-3 text-sm font-medium text-right ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount >= 0 ? '+' : ''}
                  {transaction.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Ver todas las transacciones
        </button>
      </div>
    </div>
  );
}