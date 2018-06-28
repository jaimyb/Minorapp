import { Company } from "./company";
import { AssignmentImage } from "./assignmentimage";

export class Assignment{

    Id: number
    Title: string
    Description: string
    Ec: number
    StatusId: number;
    CompanyId: number;
    Status: string;
    Company: Company
    AssignmentImage: AssignmentImage; 
    Semester: number;
    SchoolYear: string;

    constructor(id: number = null, title: string = null, description: string = null, ec: number = null, statusId: number = null, companyId: number = null, status: string = null ,company: Company = null, assignmentImage: AssignmentImage = null, schoolYear: string = null, semester: number = null){
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Ec = ec;
        this.StatusId = statusId;
        this.CompanyId = companyId;
        this.Status = status;
        this.Company = company;
        this.AssignmentImage = assignmentImage;
        this.Semester = semester;
        this.SchoolYear = schoolYear;
    }

    
}