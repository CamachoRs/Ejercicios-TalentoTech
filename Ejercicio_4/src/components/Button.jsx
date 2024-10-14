import React from "react";

const Button = React.memo(({ toggleTheme, theme }) => {
    console.log('Button rendered');
    return (
        <button onClick={toggleTheme} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mb-4">
            Cambiar a {theme === 'Claro' ? 'Oscuro' : 'Claro'}
        </button>
    );
});

export default Button;