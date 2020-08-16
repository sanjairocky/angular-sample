import { Component, OnInit } from "@angular/core";
import { Employees } from "../employees";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
})
export class AddEmployeeComponent implements OnInit {
  employee: Employees;
  dummy: Employees;
  empid: number;
  emplist: Employees[];
  len: number;
  loc = [
    { id: 1, name: "Bangalore" },
    { id: 2, name: "Chennai" },
    { id: 3, name: "Pune" },
  ];
  private employeesUrl = "api/employees";

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
    console.log("hello");

    this.employee = new Employees();
    this.employee.name = "";
    this.employee.location = "";
    this.employee.email = "";
    this.employee.mobile = "";
    this.getEmployees().subscribe((data) => (this.emplist = data));
    this.len = this.emplist.length;
    this.dummy = this.emplist[this.len - 1];
    this.employee.id = this.dummy ? this.dummy.id + 1 : 1;
  }

  public onFormSubmit(emp: Employees) {
    //this.employee=emp;
    /*this.addEmployee(
      {
        id:this.emplist.length+1,name:emp.name,location:emp.location,email:emp.email,mobile:emp.mobile
      } as Employees)
    .subscribe(employee => {this.emplist.push(emp);});*/

    this.addEmployee(this.employee).subscribe((employee) => {
      this.emplist.push(employee);
    });
    this.router.navigate(["employees"]);
  }

  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(
      this.employeesUrl,
      employee,
      this.httpOptions
    );
  }

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.employeesUrl);
  }
}
