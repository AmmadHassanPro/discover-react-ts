import React , {useEffect, useState} from 'react';
import PayeesSearch from './PayeesSearch';
import {dao} from './payees-dao';


const PayeesManager = () => {
    const [payees,setPayees] = useState([]); // since Payyees are going to be an array
  
    useEffect(() => {
        dao.getPayees().then(payees =>{
            setPayees(payees);
            console.log(`There are ${payees.length} payees.`)
        }
            );

    },[]);

    function handleSearchPayees(message : string){
        console.log("PayeesManager : handleSearchPayees",message);

    }

    return (
        <div>
            <h2 className="is-size-4">Payees</h2>
            { // Using JS , since only terneray operator is allowed in JSX , that iw hey we avoided if statement
            //JS code
                payees.length ? 
            <p>There are {payees.length} payees.</p> :
            <p>&nbsp;</p>

            }
            <PayeesSearch searchPayees={handleSearchPayees}/>

        </div>
    )
}

export default PayeesManager
