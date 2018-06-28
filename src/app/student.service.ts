import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Student } from './student';
import { Observable } from 'rxjs/Observable';
import { ParseService } from './parse.service';

@Injectable()
export class StudentService {

  Url = "/api/students/";

  constructor(private http: Http, private parse: ParseService) { }

  GetAllStudents(): Observable<Array<Student>>{
    return this.http.get( this.Url).map(result => {
      var json = result.json();
      var students = new Array<Student>();
      json.forEach(student => {
        students.push(this.parse.JsonToStudent(student));
      });
      return students;
    });
  }

  GetStudentsByProjectId(id): Observable<Array<Student>>{
    return this.http.get( this.Url + "byproject/" + id).map(result => {
      var json = result.json();
      var students = new Array<Student>();
      json.forEach(student => {
        students.push(this.parse.JsonToStudent(student));
      });
      return students;
    });
  }

}
