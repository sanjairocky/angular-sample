import { Component, OnInit } from '@angular/core';
import {Employees} from '../employees';
import {Router, ActivatedRoute, Params} from '@angular/router';

// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  static getEmployees() {
    throw new Error("Method not implemented.");
  }

  model: Employees;
  empid: number;
  name: string;

  emp: Employees[] ;
  

  nameFilter: string='';

  private employeesUrl = 'api/employees';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient)
  { 
    this.activatedRoute.queryParams.subscribe(params => { this.empid = params['id']; });
  }

  ngOnInit()
  {
    this.getEmployees().subscribe(data => this.emp = data);
  }

  getEmployees(): Observable<Employees[]> 
  {
    return this.http.get<Employees[]>(this.employeesUrl);
  }
}