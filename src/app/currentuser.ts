export class CurrentUser{
    
    Email: string;
    Roles: Array<string>;
    StudentId: number;
    BedrijfId: number;
    CoordinatorId: number;
    
    constructor(email: string, roles: Array<string>, studentId: number, bedrijfId: number, coordinatorId: number){
        this.Email = email;
        this.Roles = roles;
        this.StudentId = studentId;
        this.BedrijfId = bedrijfId;
        this.CoordinatorId = coordinatorId;
    }
}