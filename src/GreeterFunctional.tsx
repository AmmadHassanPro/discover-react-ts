import React from 'react';

interface GreeterFunctionalProps {
company : string;

}

const GreeterFunctional = ({company}: GreeterFunctionalProps) =>{

    return( // it will return JSX component
        <section>
            <h1>GreeterFunctional : hello from {company}</h1>
        </section>

    )

}

export default GreeterFunctional;