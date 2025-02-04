// registration.model.ts
export interface Address {
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
    address: Address;
  }
  