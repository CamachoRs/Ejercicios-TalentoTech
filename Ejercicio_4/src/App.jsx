import React, { useState, useCallback, useMemo, Suspense } from "react";
import Button from "./components/Button";
import List from "./components/List";
import Counter from "./components/Counter";

const App = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('Claro');

  const addItem = useCallback(() => {
    setItems(prevItems => [...prevItems, `Item ${prevItems.length + 1}`]);
  }, []);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'Claro' ? 'Oscuro' : 'Claro'));
  }, []);

  const expensiveCalculation = (items) => {
    console.log('Calculo costoso');
    return items.reduce((acc, item) => acc + item.length, 0);
  };

  const memoizedValue = useMemo(() => expensiveCalculation(items), [items]);

  const LazyComponent = React.lazy(() => import('./components/LazyComponent'));

  return (
    <div className={`w-full p-8 ${theme === 'Oscuro' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <Counter count={count} />
      <button onClick={increment} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 mb-4">Incrementar Contador</button>
      <List items={items} theme={theme} />
      <button onClick={addItem} className="bg-green-500 text-white font-bold mr-2 py-2 px-4 rounded hover:bg-green-700 transition duration-300 mb-4">
        Agregar Item
      </button>
      <Button theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={<div>Cargando...</div>}>
        <LazyComponent />
      </Suspense>

      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Parte 1: Optimización con React.memo</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Cómo cambia el comportamiento del componente cuando se usa React.memo?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>React.memo evita la re-renderización del componente si las props no cambian, mejorando así el rendimiento.</p>
          </li>
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Qué situaciones pueden causar que el componente se vuelva a renderizar?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>El componente se volverá a renderizar si las props cambian (es decir, la lista de elementos en este caso).</p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 2: Uso de useMemo para Cálculos Costosos</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Cuándo debería usarse useMemo?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>useMemo debería usarse para memorizar el resultado de cálculos costosos que dependen de ciertas props o estados, evitando que se recalculen innecesariamente en cada renderizado.</p>
          </li>
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Qué sucede si no se usa useMemo en un cálculo costoso?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>Si no se usa useMemo, la función se ejecutará en cada renderizado, lo que puede afectar el rendimiento si el cálculo es intensivo.</p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 3: Uso de useCallback para Funciones Memorables</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿En qué escenarios es útil useCallback?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>useCallback es útil para memorizar funciones que se pasan como props a componentes hijos, evitando que se vuelvan a crear en cada renderizado y, por lo tanto, evitando renderizaciones innecesarias de esos componentes hijos.</p>
          </li>
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Cómo se determina cuándo una función debe memorizarse?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>Una función debe memorizarse si se pasa como prop a un componente que usa React.memo o si es utilizada en un efecto (useEffect) donde sus dependencias pueden cambiar, para evitar la creación de nuevas instancias en cada renderizado.</p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 4: Lazy Loading y Suspense</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Cómo ayuda el Lazy Loading a mejorar el rendimiento de la aplicación?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>Lazy Loading permite que solo se carguen componentes cuando son necesarios, lo que reduce el tamaño del paquete inicial y mejora los tiempos de carga de la aplicación.</p>
          </li>
          <li>
            <strong className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>¿Qué consideraciones debes tener al usar Suspense?</strong>
            <p className={`${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>Debes asegurarte de que los componentes hijos sean compatibles con Lazy Loading y que el fallback de Suspense sea adecuado para mejorar la experiencia del usuario mientras se cargan los componentes.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
