import React , {useEffect, useState} from 'react';
import {Switch,Route,NavLink, Redirect} from 'react-router-dom';
import PayeesSearch from './PayeesSearch';
import {dao} from './payees-dao';
import PayeesList from './PayeesListRefactored';
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

    function handleSearchPayees(SearchText : string){
        console.log("PayeesManager : handleSearchPayees",SearchText);
        
        let searchResult = payees.filter(  (currentPayee: Payee) =>  {return currentPayee.payeeName ===  SearchText;});
        let results = (searchResult.length>0) ? searchResult[0]["payeeName"] : false; // using 0 as index, bcuz only one element could be returned?
        if(results){
        console.log("Search Results Found:");
        console.log( results);
        }
        else{
            console.log("Results did not found");
        }

    }

    let payeeCount = <p>&nbsp;</p>
    if(payees.length){
    payeeCount = <p>There are verifiably {payees.length}  payees.</p>

    }

    const columns: ColumnConfig[] = [
        {
          field: 'payeeName',
          label: 'Payee Name'
        },
        {
          field: 'address.city',
          label: 'City'
        },
        {
            field: 'address.state',
            label: 'State'
          }
      ]

      const handleSelectHeader= ({field,label} : ColumnConfig) => {
          console.log(`You clicked on the ${label} header`);
      };

      const handleSelectPayee = (payee : Payee) => {

        console.log(`You clicked on Payee: ${payee.payeeName} , Id : ${payee.id}`);
      };

    return (
        <div>
            <h2 className="is-size-4">Payees</h2>
            {payeeCount}
            <p>
            <NavLink to="/payees/search">Search</NavLink>  | {'  '}
            <NavLink to="/payees/list">Browse</NavLink>
            </p>

            {/*
            { // Using JS , since only terneray operator is allowed in JSX , that iw hey we avoided if statement
            //JS code
                payees.length ? 
            <p>There are {payees.length} payees.</p> :
            <p>&nbsp;</p>

            }
        */}
        <Switch>
        <Route path="/payees/search">
        <PayeesSearch searchPayees={handleSearchPayees}/>
        </Route>
        <Route path ="/payees/list">
        <PayeesList payees={payees} columns={columns} selectHeader={handleSelectHeader} selectPayee={handleSelectPayee} />
        </Route>
        <Route path="/payees">
        <Redirect to="/payees/search" />
        </Route>
        </Switch>
          

            

        </div>
    )
}

export default PayeesManager
