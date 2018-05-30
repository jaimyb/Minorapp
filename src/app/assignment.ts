import { Company } from "./company";

export class Assignment{

    Id: number
    Title: string
    Description: string
    Ec: number
    StatusId: number;
    CompanyId: number;
    Status: string;
    Company: Company
    AssignmentImagePath: string; 

    constructor(id: number = null, title: string, description: string, ec: number, statusId: number, companyId: number, status: string = null ,company: Company = null, assignmentImagePath: string = null){
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Ec = ec;
        this.StatusId = statusId;
        this.CompanyId = companyId;
        this.Status = status;
        this.Company = company;
        this.AssignmentImagePath = assignmentImagePath;
    }

    
}