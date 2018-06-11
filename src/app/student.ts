export class Student{

    Id: number;
    Name: string;
    Surname: string;
    StudentID: number;
    Studentnumber: number;
    Class: string;
    Email: string;

    constructor(Id: number = null, name: string = null, surname: string = null, studentID: number = null, Class: string = null, email: string = null){
        this.Id = Id;
        this.Name = name;
        this.Surname = surname;
        this.StudentID = studentID;
        this.Class = Class;
        this.Email = email;
    }
}