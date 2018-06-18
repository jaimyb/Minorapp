import { Assignment } from "./assignment";
import { Student } from "./student";
import { Company } from "./company";

export class Subscription{

    Id: number;
    Motivation: string;
    StatusId: number;
    AssignmentId: number;
    StudentId: number;
    CompanyId: number;
    Status: string;
    Assignment: Assignment;
    Student: Student;
    Company: Company;

    constructor(id: number = null, motivation: string, statusId: number, assignmentId: number, studentId: number, companyId: number, status: string = null, assignment: Assignment = null, student: Student = null, company: Company = null){
        this.Id = id;
        this.Motivation = motivation;
        this.StatusId = statusId;
        this.AssignmentId = assignmentId;
        this.StudentId = studentId;
        this.CompanyId = companyId;
        this.Status = status;
        this.Assignment = assignment;
        this.Student = student;
        this.Company = company;
    }
}