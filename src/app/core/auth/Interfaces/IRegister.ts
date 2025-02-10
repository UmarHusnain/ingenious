// registration.model.ts
export interface IAddress {
    aspNetUserId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }
  
  export interface IRegister {
    roleId: string;
    username: string;
    contactNumber: string;
    fullName: string;
    password: string;
    isBlocked: boolean;
    isDeleted: boolean;
    address: IAddress;
  }
  