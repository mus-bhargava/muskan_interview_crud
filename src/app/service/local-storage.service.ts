import { Injectable } from '@angular/core';
import { Student } from '../Interface/student.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'students';

  getStudents(): Student[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  addStudent(student: Student) {
    const students = this.getStudents();
    students.push(student);
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }

  saveStudents(students: Student[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }

  // updateStudent(id: number, updatedStudent: Student) {
  //   const students = this.getStudents();
  //   const index = students.findIndex((s) => s.id === id);
  //   if (index !== -1) {
  //     students[index] = { ...students[index], ...updatedStudent };
  //     this.saveStudents(students);
  //   }
  // }

  updateStudent(id: number, updatedStudent: Student) {
    const students = this.getStudents();
    console.log('ssssssssssssssss', students);

    const index = students.findIndex((s) => s.id === id);
    console.log('index', index);

    if (index !== -1) {
      const existingStudent = { ...students[index] };
      const updatedStudentData = { ...existingStudent, ...updatedStudent };

      students[index] = updatedStudentData;
      this.saveStudents(students);
    } else {
      console.error('Student not found for update:', id);
    }
  }
}