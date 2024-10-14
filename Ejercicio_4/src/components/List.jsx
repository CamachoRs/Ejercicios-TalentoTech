import React from "react";

const List = React.memo(({ items, theme }) => {
    console.log('List re-rendered');
    return (
        <ul className={`list-disc pl-5 ${theme === 'Oscuro' ? 'text-white' : 'text-gray-800'}`}>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
});

export default List;