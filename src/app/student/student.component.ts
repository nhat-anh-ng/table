import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Student } from '../models/student';
import { DataService } from '../services/data.service';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm;
  studentData!: Student;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name'];
  isEditMode = false;
  constructor(private httpDataService:DataService) {
    this.studentData = {} as Student
  }

  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents(){
    this.httpDataService.getList().subscribe((response:any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: any) {
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  deleteItem(id: any) {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {
      //update databledata on local 
      this.dataSource.data = this.dataSource.data.filter((o:any) => {
        return o.id !== id ? o : false;
      })
      console.log(this.dataSource.data);
    })
  }


}
