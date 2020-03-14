import React, { useEffect } from 'react';
import { ColumnConfig, Payee } from './payee-types';
import * as lodash from 'lodash';

interface PayeesListProps {
  columns: ColumnConfig[];
  payees: Payee[];
  selectPayee?: (selectedPayee: Payee) => void;
  selectHeader?: (column: ColumnConfig) => void;
}
// The below parameter is a representation of properties extracted from the Object PayeesListProps. 
//It is easy this way, otherwise (.) operator will be utilized
const PayeesList = ({ payees, columns,selectPayee, selectHeader }: PayeesListProps) => {
  console.log("List Component being re-rendered");
    //testing to see if the components re-renders when switcing between Search and List

    useEffect(() => {
      console.log("List is being mounted");
      return () => {
        console.log("List is Un-mounted");
      };
    }, [])


  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <PayeesListHeader columns={columns} selectHeader={selectHeader}  />
      <tbody>
        {payees.map(payee => (
          <PayeesListRow payee={payee} columns={columns} key={payee.id} selectPayee={selectPayee}/>
        ))}
      </tbody>
    </table>
  );
};

type PayeesListColumns = Pick<PayeesListProps, 'columns'>;

const PayeesListHeader = ({ columns ,selectHeader}: Pick<PayeesListProps,'columns' | 'selectHeader'>) => {
  return (
    <thead>
      <tr>
        {columns.map(({ field, label }) => (
          <th key={field} onClick={() => selectHeader && selectHeader({field,label})}>{label}</th>
        ))}
      </tr>
    </thead>
  );
};
// the & sign will saay merge the properties of both the objects into one
const PayeesListRow = ({ columns, payee,selectPayee }: Pick<PayeesListProps, 'columns' | 'selectPayee'> & { payee: Payee }) => {
  return (
    <tr>
      {columns.map(column => (
        <td key={column.field} onClick={ () => selectPayee && selectPayee(payee) }>{lodash.get(payee, column.field) + ''}</td>
      ))}
    </tr>
  );
};

export default PayeesList;