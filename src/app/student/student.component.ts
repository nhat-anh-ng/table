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
  displayedColumns: string[] = ['id', 'name', 'actions'];
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

  addItem(){
    this.httpDataService.createItem(this.studentData).subscribe(() => {
      this.getAllStudents();
    })
  }

  editItem(element: any) {
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  updateItem(element: any){
    this.httpDataService.updateItem(element.id, this.studentData).subscribe(() => {
      this.getAllStudents();
    })
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
