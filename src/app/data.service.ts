import { Injectable } from '@angular/core';
import { Assignment } from './assignment';

@Injectable()
export class DataService {

  constructor() { }

  CurrentAssignment: Assignment;

}
