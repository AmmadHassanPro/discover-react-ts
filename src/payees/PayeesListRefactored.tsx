import React from 'react';
import { ColumnConfig, Payee } from './payee-types';
import * as lodash from 'lodash';

interface PayeesListProps {
  columns: ColumnConfig[];
  payees: Payee[];
  selectPayee?: (selectedPayee: Payee) => void;
  selectHeader?: (column: ColumnConfig) => void;
}

const PayeesList = ({ payees, columns,selectPayee, selectHeader }: PayeesListProps) => {
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