import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Student } from './student';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {

  Url = "/api/students/";

  constructor(private http: Http) { }

  GetAllStudents(): Observable<Array<Student>>{
    return this.http.get( this.Url).map(result => {
      var json = result.json();
      var students = new Array<Student>();
      json.forEach(student => {
        students.push(new Student(student.StudentID, student.voornaam, student.achternaam, student.studentnummer, student.klas, student.email));
      });
      return students;
    });
  }

  GetStudentsByProjectId(id): Observable<Array<Student>>{
    return this.http.get( this.Url + "byproject/" + id).map(result => {
      var json = result.json();
      var students = new Array<Student>();
      json.forEach(student => {
        students.push(new Student(student.StudentID, student.voornaam, student.achternaam, student.studentnummer, student.klas, student.email));
      });
      return students;
    });
  }

}
