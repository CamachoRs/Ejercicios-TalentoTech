import './App.css';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de contactos</h1>
      <ContactList />
    </div>
  )
};

export default App;