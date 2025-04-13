export default function SavingsGoals({ goals }) {
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 dark:text-dark-text text-light-text">Objetivos de Ahorro</h2>
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          
          const deadlineDate = new Date(goal.deadline);
          const today = new Date();
          const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={index} className="border rounded-lg p-3 dark:border-dark-border">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-light-text dark:text-dark-text">{goal.name}</span>
                <span className="text-sm text-light-text dark:text-dark-text">
                  {daysRemaining} días restantes
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {goal.current.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} de  
                  {goal.target.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </span>
                <span className="font-medium">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Te faltan {remaining.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}