import React, { ChangeEvent ,useState} from 'react';

interface PayeeSearchProps{
    searchPayees : (msg:string) => void;
}

const PayeesSearch = (props: PayeeSearchProps) => {

    const [searchText, setSearchText] = useState('');// The first element is the value, the next one is the setter function
    
    const handleButton = () =>{
        props.searchPayees(searchText);
        console.log(`You typed:  ${searchText}`);
    }
    
    const handleInput = (event : any) => {
        setSearchText(event.currentTarget.value);

    };
    //Read About Form on https://reactjs.org/docs/forms.html , on how to take the input from textbox
    return (    
        <div>
            <h1>Payees</h1>
            <label htmlFor="searchPayeeName">Payee Name:</label>
            <input type="text" id="searchPayeeName" onChange={handleInput} value={searchText} />
            <button type="button" onClick={handleButton}>Search!</button>
        </div>
    )
}

export default PayeesSearch
