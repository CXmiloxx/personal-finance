export default function BudgetProgress({ categories }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Progreso del Presupuesto</h2>
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          let statusColor = 'bg-green-500'; // Por defecto verde
          
          if (percentage > 90) {
            statusColor = 'bg-red-500';
          } else if (percentage > 75) {
            statusColor = 'bg-yellow-500';
          }
          
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">
                    {category.spent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} / 
                    {category.budget.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${statusColor} h-2.5 rounded-full`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}