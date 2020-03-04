import React from 'react';

interface GreeterFunctionalProps {
company : string;
location : string;

}

const GreeterFunctional = ({company,location}: GreeterFunctionalProps) =>{

    return( // it will return JSX component
        <section>
<h1>GreeterFunctional : Hello From {company} at {location}</h1>
        </section>

    )

}

export default GreeterFunctional;