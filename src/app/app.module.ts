import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeenamefilterPipe } from './employeenamefilter.pipe';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@NgModule({
  declarations: [ AppComponent, EmployeeListComponent, AddEmployeeComponent, EmployeenamefilterPipe, EmployeedetailsComponent, DeleteEmployeeComponent, UpdateEmployeeComponent ],
  imports: [ BrowserModule, FormsModule, 
  HttpModule, 
  HttpClientModule,
    // simulated server response
    HttpClientInMemoryWebApiModule.forRoot( InMemoryDataService, { dataEncapsulation: false }), RouterModule.forRoot([
      {
        path: 'employees', component: EmployeeListComponent
      },
      {
        path: 'details/:id', component: EmployeedetailsComponent
      },
      {
        path: 'employees/:id', component: EmployeedetailsComponent
      },
      {
        path: 'addEmployee', component: AddEmployeeComponent
      },
      {
        path: 'editEmployee/:id', component: UpdateEmployeeComponent
      },
      {
        path: 'deleteEmployee/:id', component: DeleteEmployeeComponent
      }
   ])
  ],
  providers: [ InMemoryDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }