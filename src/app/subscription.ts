import { Assignment } from "./assignment";
import { Student } from "./student";

export class Subscription{

    Id: number;
    Motivation: string;
    StatusId: number;
    AssignmentId: number;
    StudentId: number;
    Status: string;
    Assignment: Assignment;
    Student: Student

    constructor(id: number = null, motivation: string, statusId: number, assignmentId: number, studentId: number, status: string = null, assignment: Assignment = null, student: Student = null){
        this.Id = id;
        this.Motivation = motivation;
        this.StatusId = statusId;
        this.AssignmentId = assignmentId;
        this.StudentId = studentId;
        this.Status = status;
        this.Assignment = assignment;
        this.Student = student;
    }
}