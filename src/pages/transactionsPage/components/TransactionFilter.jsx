import useFetchCategories from "!/useFetchCategories";
import DatePicker from "react-datepicker";
import { FiCalendar, FiTag, FiX, FiFilter } from "react-icons/fi";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function TransactionFilter({
  getFilteredByDate,
  getFilteredCategories,
  fetchTransactions,
  loading,
}) {
  const { categories } = useFetchCategories();
  const [startDate, setStartDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Validación: debe haber al menos una opción seleccionada para permitir filtrar o limpiar
  const isFilterActive = startDate !== null || selectedCategory !== "";
  const isClearActive = startDate !== null || selectedCategory !== "";

  const handleFilter = () => {
    if (!isFilterActive) return;
    if (startDate && selectedCategory) {
      getFilteredByDate(startDate).then(() =>
        getFilteredCategories(selectedCategory)
      );
      return;
    }
    if (startDate) {
      getFilteredByDate(startDate);
      return;
    }
    if (selectedCategory) {
      getFilteredCategories(selectedCategory);
      return;
    }
  };

  const handleClearFilter = () => {
    if (!isClearActive) return;
    setStartDate(null);
    setSelectedCategory("");
    if (fetchTransactions) {
      fetchTransactions();
    }
  };

  return (
    <div
      className={`
        w-full max-w-3xl
        flex flex-col md:flex-row md:items-end gap-4 md:gap-6
        rounded-2xl
        px-7 py-6
        bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-85
        border border-gray-200 dark:border-gray-800
        shadow-md dark:shadow-lg
        backdrop-blur-md
        transition-colors
      `}
    >
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        {/* Filtro por fecha */}
        <div className="flex-1 min-w-[180px]">
          <label
            htmlFor="date-filter"
            className="
              text-[15px] font-semibold mb-2 flex items-center gap-2
              text-gray-700 dark:text-gray-200
            "
          >
            <span className="bg-blue-100 dark:bg-blue-900/40 p-1.5 rounded-full text-blue-500 flex-shrink-0">
              <FiCalendar />
            </span>
            Fecha
          </label>
          <DatePicker
            id="date-filter"
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            className="
              w-full mt-1 px-3 py-2 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition
            "
            showPopperArrow={false}
            isClearable
            calendarClassName="!z-40 dark:bg-gray-900"
          />
        </div>

        {/* Filtro por categoría */}
        <div className="flex-1 min-w-[180px]">
          <label
            htmlFor="category-filter"
            className="
              text-[15px] font-semibold mb-2 flex items-center gap-2
              text-gray-700 dark:text-gray-200
            "
          >
            <span className="bg-pink-100 dark:bg-pink-900/40 p-1.5 rounded-full text-pink-500 flex-shrink-0">
              <FiTag />
            </span>
            Categoría
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="
              w-full mt-1 px-3 py-2 rounded-lg 
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-pink-400
              transition
            "
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon && <span>{category.icon} </span>}
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Botonera */}
      <div className="flex flex-row gap-2 mt-1 md:mt-0">
        <button
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-lg font-semibold
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            text-white
            shadow
            transition-all
            focus:outline-none focus:ring-2 focus:ring-blue-400
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
          onClick={handleFilter}
          disabled={loading || !isFilterActive}
          title="Filtrar transacciones"
          style={{ boxShadow: "0 1px 8px 0 rgba(59,130,246,0.08)" }}
        >
          <FiFilter className="w-4 h-4" />
          {loading ? "Filtrando..." : "Filtrar"}
        </button>
        <button
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-lg font-semibold
            bg-gray-200 dark:bg-gray-800
            text-gray-800 dark:text-gray-200
            shadow
            hover:bg-gray-300 dark:hover:bg-gray-700
            transition-all
            focus:outline-none focus:ring-2 focus:ring-gray-400
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
          onClick={handleClearFilter}
          disabled={loading || !isClearActive}
          title="Limpiar filtros"
        >
          <FiX className="w-4 h-4" />
          {loading ? "Limpiando..." : "Limpiar"}
        </button>
      </div>
    </div>
  );
}
