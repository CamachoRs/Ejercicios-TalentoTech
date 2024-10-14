import React from "react";

const Counter = React.memo(({ count }) => {
    console.log('Counter re-rendered');
    return <h2 className="text-xl font-semibold">Contador: {count}</h2>;
});

export default Counter;