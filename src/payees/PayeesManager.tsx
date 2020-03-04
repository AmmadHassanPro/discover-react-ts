import React , {useEffect, useState} from 'react';
import PayeesSearch from './PayeesSearch';
import {dao} from './payees-dao';
import PayeesList from './PayeesList';
import { ColumnConfig, Payee } from './payee-types';


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

    let payeeCount = <p>&nbsp;</p>
    if(payees.length){
    payeeCount = <p>There are verifiably {payees.length}  payees.</p>

    }

    const columns: ColumnConfig<Payee>[] = [
        {
          field: 'payeeName',
          label: 'Payee Name'
        },
        {
          field: 'active',
          label: 'Active'
        }
      ]

    return (
        <div>
            <h2 className="is-size-4">Payees</h2>
            {payeeCount}

            {/*
            { // Using JS , since only terneray operator is allowed in JSX , that iw hey we avoided if statement
            //JS code
                payees.length ? 
            <p>There are {payees.length} payees.</p> :
            <p>&nbsp;</p>

            }
        */}
            <PayeesSearch searchPayees={handleSearchPayees}/>

            <PayeesList payees={payees} columns={columns}/>

        </div>
    )
}

export default PayeesManager
