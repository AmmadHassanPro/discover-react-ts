import React from 'react';

interface GreeterClassProps {
    company: string;

}
class GreeterClass extends React.Component<GreeterClassProps>{

    render() {

        return (
            <section>
                <h1>GreeterClass : Hello from {this.props.company} </h1>
            </section>


        )
    }

}

export default GreeterClass;