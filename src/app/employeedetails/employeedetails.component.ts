import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Employees } from "../employees";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-employeedetails",
  templateUrl: "./employeedetails.component.html",
})
export class EmployeedetailsComponent implements OnInit {
  id: any;
  emp: Employees;
  private employeesUrl = "api/employees";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params["id"];
    });
    this.getEmployee(this.id).subscribe((data) => (this.emp = data));
  }

  goBack(): void {
    this.location.back();
  }

  getEmployee(id: number): Observable<Employees> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employees>(url);
  }
}
