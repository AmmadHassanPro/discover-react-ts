import React from 'react';

interface GreeterFunctionalProps {
company : string;
location : string;

}

const GreeterFunctional = ({company,location}: GreeterFunctionalProps) =>{

    return( // it will return JSX component
        <div style={{borderBottom: '3px black solid'}}> {/*JSX Specific inline styling. Notice Camel case , it will be replaced with - when it makes to build */}
            <h1 className="is-size-2" >GreeterFunctional : Hello From {company} at {location}</h1>
        </div>

    )

}

export default GreeterFunctional;