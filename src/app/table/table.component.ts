import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ISemester } from '../models/student';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('semesterForm', { static: false })
  semesterForm!: NgForm;
  semesterData!: ISemester;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'Semester', 'Year'];
  constructor() { }

  ngOnInit(): void {
  }

}
