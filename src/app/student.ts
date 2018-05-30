export class Student{


    Id: number;
    Name: string;
    Surname: string;
    StudentID: number;
    Class: string;
    Email: string;

    constructor(Id: number = null, name: string, surname: string, studentID: number, Class: string, email: string){
        this.Id = Id;
        this.Name = name;
        this.Surname = surname;
        this.StudentID = studentID;
        this.Class = Class;
        this.Email = email;
    }
}