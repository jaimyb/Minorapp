import { Injectable } from '@angular/core';
import { Student } from './student';
import { Company } from './company';
import { AssignmentImage } from './assignmentimage';
import { Assignment } from './assignment';
import { Subscription } from './subscription';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class ParseService {
  //Deze klasse zet database(JSON) data van de API om in hun typescript objecten

  constructor() { }

  JsonToStudent(json: any): Student{
    return new Student(json.StudentID, json.voornaam, json.achternaam, json.studentemail);
  }

  JsonToCompany(json: any): Company{
    return new Company(json.BedrijfID, json.bedrijfnaam, json.bedrijfemail, json.telefoonnummer);
  }

  JsonToAssignmentImage(json: any): AssignmentImage{
    if(json.OpdrachtAfbeeldingID != undefined){
      return new AssignmentImage(json.OpdrachtAfbeeldingID,'http://localhost:3000/' + json.opdrachtafbeelding);
    }
    else{
      return new AssignmentImage(null,'http://localhost:3000/' + json.opdrachtafbeelding);
    }
  }

  JsonToAssignment(json: any){
    let company = this.JsonToCompany(json);
    let assignmentImage = this.JsonToAssignmentImage(json);
    return new Assignment(json.OpdrachtID, json.titel, json.beschrijving, json.ec, json.opdrachtstatusid, json.bedrijfid ,json.opdrachtstatus, company,  assignmentImage, json.schooljaar , json.semester);
  }

  JsonToSubscription(json): Subscription{
    let student = this.JsonToStudent(json);
    let company = this.JsonToCompany(json);
    let assignment = this.JsonToAssignment(json);
    return new Subscription(json.IntekeningID, json.motivatie, json.intekeningstatusid, json.opdrachtid, json.studentid, json.BedrijfID ,json.intekeningstatus, assignment, student, company);
  }

  // EncryptString(string: string): string{
  //   let hash: string = bcrypt.hashSync(string, 10);
  //   return hash;
  // }
}
