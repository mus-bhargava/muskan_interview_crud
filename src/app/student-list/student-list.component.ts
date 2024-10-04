import { Component, OnInit } from '@angular/core';
import { Student } from '../Interface/student.model';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  studentData: Student[] = [];
  showForm: boolean = false;
  currentIndex: number | null = null;
  selectedStudents: Set<number> = new Set();

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    this.studentData = this.localStorageService.getStudents();
    console.log('Student Data: ', this.studentData);
  }

  onStudentAdded() {
    this.showForm = false;
    this.loadStudentData();
  }

  toggleSelection(studentId: number) {
    if (this.selectedStudents.has(studentId)) {
      this.selectedStudents.delete(studentId);
    } else {
      this.selectedStudents.add(studentId);
    }
  }

  deleteSelected() {
    this.studentData = this.studentData.filter(
      (student) => !this.selectedStudents.has(student.id)
    );
    console.log('data', this.studentData);

    this.localStorageService.saveStudents(this.studentData);
    this.selectedStudents.clear();
  }

  deleteStudent(index: number) {
    console.log('index', index);

    this.studentData.splice(index, 1);
    this.localStorageService.saveStudents(this.studentData);
  }

  editStudent(index: number) {
    console.log('index', index);
    this.currentIndex = index;
    this.showForm = true;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.currentIndex = null;
  }

  selectAll(event: any) {
    if (event.target.checked) {
      this.studentData.forEach((student) =>
        this.selectedStudents.add(student.id)
      );
    } else {
      this.selectedStudents.clear();
    }
  }
}