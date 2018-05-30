export class Company{
    
    ID: number;
    Name: string;
    Email: string;
    Phonenumber: string;
    
    constructor(id: number = null, name: string, email: string, phonenumber: string){
        this.ID = id;
        this.Name = name;
        this.Email = email;
        this.Phonenumber = phonenumber;
    }
}