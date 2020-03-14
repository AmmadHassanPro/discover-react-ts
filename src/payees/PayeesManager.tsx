import React , {useEffect, useState} from 'react';
import {Switch,Route,NavLink, Redirect,useHistory} from 'react-router-dom';
import PayeesSearch from './PayeesSearch';
import {dao} from './payees-dao';
import PayeesList from './PayeesListRefactored';
import { ColumnConfig, Payee } from './payee-types';



const PayeesManager = () => {
    

    //useState will rerender componenent when the value changes
    const [payees,setPayees] = useState([]); // since Payyees are going to be an array
    const [searchText , setSearchText] = useState('');
    const history = useHistory();
    console.log("Payees Manager component being re-rendered!");
    console.log("Payees Manager current state:" + "searchText = "+searchText+" , payees(length) = "+ payees.length);

    /*  
        UseEffect(
        ()=>{}, []

        )
        // no second argument, always run function 
        // [] no values , run once , like ComponentDidMount
        // [foo] run when foo’s value changes // like componentDidUpdate
        // if the first argument function returns another function, that returned function will run when ComponentDidUnMount()

        Look at the React Document, it has more useful information

    */
    useEffect(() => {
        console.log("Payees Manager Component is being Mounted");
        dao.getPayees().then(payees =>{
            setPayees(payees);
            
            console.log(`There are ${payees.length} payees.`);
        }
            );
            return () => {console.log('Run this code to perform CleanUp!')}; // This function will be run , when component is unmounted, meaning , it will be used to do the cleanup
    },[]);



    function handleSearchPayees(SearchText : string){
        console.log("PayeesManager : handleSearchPayees",SearchText);
        setSearchText(SearchText);
        console.log("Using History");
        history.push('/payees/list'); // Preffered way to go from one component to another
        // This will route to list by providing current state

        /* My Version
        let searchResult = payees.filter(  (currentPayee: Payee) =>  {return currentPayee.payeeName ===  SearchText;});
        let results = (searchResult.length>0) ? searchResult[0]["payeeName"] : false; // using 0 as index, bcuz only one element could be returned?
        if(results){
        console.log("Search Results Found:");
        console.log( results);
        }
        else{
            console.log("Results did not found");
        }
        */

    }

    let payeeCount = <p>&nbsp;</p>
    if(payees.length){
    payeeCount = <p>There are verifiably {payees.length}  payees.</p>

    }
    // contains the mapping between the Payees object keys , and column header , NOT CONFUSING AT ALL!
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
          ,
          {
            field: 'address.street',
            label: 'Street'
          }
      ]

      const handleSelectHeader= ({field,label} : ColumnConfig) => {
          console.log(`You clicked on the ${label} header`);
      };

      const handleSelectPayee = (payee : Payee) => {

        console.log(`You clicked on Payee: ${payee.payeeName} , Id : ${payee.id}`);
      };
      // Updating displayPayees as soon as the component re-renders
      console.log("Display Payees gettig updated!");
      const displayPayees = payees.filter( (payee : Payee) => {
        if(searchText === ''){
            return true;
        } else{
            return payee.payeeName.toUpperCase().includes(searchText.toUpperCase());
        }

      });
      

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
        { console.log("Search Route Code Hit")}
        <PayeesSearch searchPayees={handleSearchPayees}/>
        </Route>
        <Route path ="/payees/list">
            { console.log("<---List Route Code Hit-->")}
        <PayeesList payees={displayPayees} columns={columns} selectHeader={handleSelectHeader} selectPayee={handleSelectPayee} />
        </Route>
        <Route path="/payees">
        { console.log("Redirect:Search Route Code Hit")}
        <Redirect to="/payees/search" />
        </Route>
        </Switch>
          

            

        </div>
    )

    
}

export default PayeesManager
