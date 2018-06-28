export class Company{
    
    ID: number;
    Name: string;
    Email: string;
    Phonenumber: string;
    
    constructor(id: number = null, name: string = null, email: string = null, phonenumber: string = null){
        this.ID = id;
        this.Name = name;
        this.Email = email;
        this.Phonenumber = phonenumber;
    }
}