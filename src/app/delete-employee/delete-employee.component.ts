import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Employees } from "../employees";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-delete-employee",
  template: "./delete-employee.component.html",
})
export class DeleteEmployeeComponent implements OnInit, AfterViewInit {
  private employeesUrl = "api/employees";
  empid: number;

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
    this.deleteEmployee(this.empid).subscribe();
  }

  ngAfterViewInit() {
    this.router.navigate(["employees"]);
  }

  deleteEmployee(id: number): Observable<Employees> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employees>(url, this.httpOptions);
  }
}
