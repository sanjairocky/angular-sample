import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employees } from "../employees";

@Component({
  selector: "app-update-employee",
  templateUrl: "./update-employee.component.html",
})
export class UpdateEmployeeComponent implements OnInit {
  private employeesUrl = "api/employees";
  empid: number;
  emp: Employees;
  loc = [
    { id: 1, name: "Bangalore" },
    { id: 2, name: "Chennai" },
    { id: 3, name: "Pune" },
  ];
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.empid = params["id"];
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.empid = +params["id"];
    });
    this.emp = new Employees();
    this.getEmployee(this.empid).subscribe((data) => (this.emp = data));
  }

  updateFormSubmit(emp: Employees) {
    //this.emp=emp;
    this.updateEmployee(this.emp).subscribe();
    this.router.navigate(["employees"]);
  }

  updateEmployee(emp: Employees): Observable<any> {
    return this.http.put(this.employeesUrl, emp, this.httpOptions);
  }
  getEmployee(id: number): Observable<Employees> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employees>(url);
  }
}
