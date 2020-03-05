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
    
    const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.currentTarget.value);

    };

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
