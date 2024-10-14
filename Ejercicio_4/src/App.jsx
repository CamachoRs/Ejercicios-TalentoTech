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
            <strong>¿Cómo cambia el comportamiento del componente cuando se usa React.memo?</strong>
            <p>React.memo evita la re-renderización del componente si las props no cambian, mejorando así el rendimiento.</p>
            <p><strong>Componente que ejecuta:</strong> <code>Counter</code></p>
          </li>
          <li>
            <strong>¿Qué situaciones pueden causar que el componente se vuelva a renderizar?</strong>
            <p>El componente se volverá a renderizar si las props cambian (es decir, el valor de <code>count</code> en este caso).</p>
            <p><strong>Componente que ejecuta:</strong> <code>Counter</code></p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 2: Uso de useMemo para Cálculos Costosos</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>¿Cuándo debería usarse useMemo?</strong>
            <p>useMemo debería usarse para memorizar el resultado de cálculos costosos que dependen de ciertas props o estados, evitando que se recalculen innecesariamente en cada renderizado.</p>
            <p><strong>Componente que ejecuta:</strong> <code>List</code></p>
          </li>
          <li>
            <strong>¿Qué sucede si no se usa useMemo en un cálculo costoso?</strong>
            <p>Si no se usa useMemo, la función se ejecutará en cada renderizado, lo que puede afectar el rendimiento si el cálculo es intensivo.</p>
            <p><strong>Componente que ejecuta:</strong> <code>List</code></p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 3: Uso de useCallback para Funciones Memorables</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>¿En qué escenarios es útil useCallback?</strong>
            <p>useCallback es útil para memorizar funciones que se pasan como props a componentes hijos, evitando que se vuelvan a crear en cada renderizado y, por lo tanto, evitando renderizaciones innecesarias de esos componentes hijos.</p>
            <p><strong>Componente que ejecuta:</strong> <code>Button</code>, <code>List</code></p>
          </li>
          <li>
            <strong>¿Cómo se determina cuándo una función debe memorizarse?</strong>
            <p>Una función debe memorizarse si se pasa como prop a un componente que usa React.memo o si es utilizada en un efecto (<code>useEffect</code>) donde sus dependencias pueden cambiar, para evitar la creación de nuevas instancias en cada renderizado.</p>
            <p><strong>Componente que ejecuta:</strong> <code>Button</code>, <code>List</code></p>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-5 mb-2">Parte 4: Lazy Loading y Suspense</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>¿Cómo ayuda el Lazy Loading a mejorar el rendimiento de la aplicación?</strong>
            <p>Lazy Loading permite que solo se carguen componentes cuando son necesarios, lo que reduce el tamaño del paquete inicial y mejora los tiempos de carga de la aplicación.</p>
            <p><strong>Componente que ejecuta:</strong> <code>LazyComponent</code></p>
          </li>
          <li>
            <strong>¿Qué consideraciones debes tener al usar Suspense?</strong>
            <p>Debes asegurarte de que los componentes hijos sean compatibles con Lazy Loading y que el fallback de Suspense sea adecuado para mejorar la experiencia del usuario mientras se cargan los componentes.</p>
            <p><strong>Componente que ejecuta:</strong> <code>Suspense</code></p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;