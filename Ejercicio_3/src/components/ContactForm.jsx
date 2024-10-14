import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function ContactForm({ addContact, currentContact, onCancel }) {
    const [error, setError] = useState('');
    const [contact, setContact] = useState({
        nombre: '',
        apellido: '',
        celular: ''
    });

    useEffect(() => {
        if (currentContact) {
            setContact(currentContact);
        } else {
            setContact({ nombre: '', apellido: '', celular: '' });
        };
    }, [currentContact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!contact.nombre || !contact.celular) {
            setError('Por favor, completa los campos de nombre y número Celular antes de guardar.');
            return;
        };
        if (contact.celular.length !== 10) {
            setError('El número celular es inválido. Por favor, verifica que hayas ingresado el número correcto.');
            return;
        };
        addContact(contact);
        setError('');
        setContact({
            nombre: '',
            apellido: '',
            celular: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    value={contact.nombre}
                    onChange={(e) => setContact({ ...contact, nombre: e.target.value })}
                    placeholder="Ingrese su nombre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    value={contact.apellido}
                    onChange={(e) => setContact({ ...contact, apellido: e.target.value })}
                    placeholder="Ingrese su apellido"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="celular" className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                <input
                    type="tel"
                    id="celular"
                    value={contact.celular}
                    onChange={(e) => setContact({ ...contact, celular: e.target.value })}
                    placeholder="Ingrese su teléfono"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className='flex items-center space-x-4'>
                <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2">
                    {currentContact ? (
                        <><span>Editar contacto</span> <FaUserEdit /></>
                    ) : (
                        <><span>Agregar contacto</span> <FaUserPlus /></>
                    )}
                </button>
                {currentContact && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2">
                        <span>Cancelar</span> <MdCancel />
                    </button>
                )}
            </div>
        </form>
    );
};

export default ContactForm;