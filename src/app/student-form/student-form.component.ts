import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  @Output() studentAdded = new EventEmitter<void>();
  @Input() studentData: any;
  addStudent: FormGroup;
  profileImage: string | ArrayBuffer | null | undefined;
  imageFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private readonly localStorageService: LocalStorageService
  ) {
    this.addStudent = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      country: ['', Validators.required],
      // profileImage: [''],
    });
  }

  // patchValue(item, i){
  //   firstName: item.firstName,
  //     lastName: item.lastName,
  //     department: item.department,
  //     email: item.email,
  //     country: item.country,
  // }

  ngOnInit(): void {
    if (this.studentData) {
      this.addStudent.patchValue(this.studentData);
      this.profileImage = this.studentData.profileImage;
      this.imageFileName = this.studentData.profileImage
        ? 'Image uploaded'
        : null;
    }
  }

  // onImageSelected(event: Event) {
  //   console.log('event', event);

  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   console.log('file', file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.profileImage = e.target?.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.imageFileName = file.name;
      console.log('fileName', this.imageFileName);
    }
  }

  emailValidator(control: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  generateUniqueId(): number {
    return Date.now();
  }

  saveStudent() {
    if (this.addStudent.valid) {
      const studentData = {
        ...this.addStudent.value,
        profileImage: this.profileImage || this.studentData?.profileImage,
      };
      console.log('studentDataaaaa', studentData);
      if (!this.studentData) {
        studentData.id = this.generateUniqueId();
        this.localStorageService.addStudent(studentData);
      } else {
        this.localStorageService.updateStudent(
          this.studentData.id,
          studentData
        );
      }
      this.addStudent.reset();
      this.profileImage = null;
      this.studentAdded.emit();
    } else {
      alert('Your data is invalid!');
    }
  }
}