type AddressKeys = 'address.city' | 'address.street' | 'address.state' | 'address.zip';
type PayeeKeys = keyof Payee | AddressKeys; // So the key could be of Payee or one from Address keys
export interface ColumnConfig{
field: string;
label : string;

}


export interface Payee{
    
        id: string,
        version: number,
        payeeName: string,
        address: Address,
        categoryId: string,
        image: string,
        motto: string,
        active: true,
        //[key:string]:any // this is telling typescript that a key of type string could be added and its value could be anything
      
}

export interface Address{
    stree: string;
    city: string;
    state: string;
    zip : string;

}