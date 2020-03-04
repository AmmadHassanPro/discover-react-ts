import React , {useEffect} from 'react';
import PayeesSearch from './PayeesSearch';
import {dao} from './payees-dao';


const PayeesManager = () => {
    
    useEffect(() => {
        dao.getPayees().then(payees => console.log(`There are ${payees.length} payees.`));

    },[]);

    function handleSearchPayees(message : string){
        console.log("PayeesManager : handleSearchPayees",message);

    }

    return (
        <div>
            <PayeesSearch searchPayees={handleSearchPayees}/>

        </div>
    )
}

export default PayeesManager
