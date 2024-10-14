import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Contact from './Contact';

function ContactList() {
    const [editIndex, setEditIndex] = useState(null);
    const [currentContact, setCurrentContact] = useState(null);
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [];
    });

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (contact) => {
        if (editIndex !== null) {
            const updatedContacts = contacts.map((c, index) => (index === editIndex ? contact : c));
            setContacts(updatedContacts);
            setEditIndex(null);
            setCurrentContact(null);
        } else {
            setContacts([...contacts, contact]);
            setCurrentContact(null);
        };
    };

    const editContact = (index) => {
        setEditIndex(index);
        setCurrentContact(contacts[index]);
    };

    const removeContact = (index) => {
        const updateContacts = contacts.filter((_, i) => i !== index);
        setContacts(updateContacts);
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setCurrentContact(null);
    };

    return (
        <div>
            <ContactForm addContact={addContact} currentContact={currentContact} onCancel={cancelEdit} />
            <table className="min-w-full bg-white border border-gray-300 mt-6">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Apellido</th>
                        <th className="py-3 px-6 text-left">Teléfono</th>
                        <th className="py-3 px-6 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {contacts.map((contact, index) => (
                        <Contact
                            key={index}
                            contact={contact}
                            editContact={() => editContact(index)}
                            removeContact={() => removeContact(index)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;