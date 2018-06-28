export class Student{

    Id: number;
    Name: string;
    Surname: string;
    Email: string;

    constructor(Id: number = null, name: string = null, surname: string = null, email: string = null){
        this.Id = Id;
        this.Name = name;
        this.Surname = surname;
        this.Email = email;
    }
}