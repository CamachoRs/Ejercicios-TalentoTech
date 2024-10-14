import React from 'react';
import { FaUserEdit, FaUserTimes } from "react-icons/fa";

function Contact({ contact, removeContact, editContact }) {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className="py-3 px-6">{contact.nombre}</td>
            <td className="py-3 px-6">{contact.apellido}</td>
            <td className="py-3 px-6">{contact.celular}</td>
            <td className="py-3 px-6">
                <button onClick={editContact} className="text-blue-500 hover:text-blue-700"><FaUserEdit /></button>
                <button onClick={removeContact} className="text-red-500 hover:text-red-700 ml-4"><FaUserTimes /></button>
            </td>
        </tr>
    );
};

export default Contact;