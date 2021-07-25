import { Component, OnDestroy, OnInit } from '@angular/core';
import { EschoolService } from './eschool.service';
import { Student } from './student';
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  condition: boolean = false;
  username: string = "admin";
  password: string = "1"
  formLogin!: FormGroup

  formValue!: FormGroup;
  studentModel: Student = new Student();
  students !: any;
  constructor(private studentService : EschoolService, private formbuilder: FormBuilder){}
  

  ngOnInit(): void {
    this.condition
    this.getAllStudents();
    this.formValue = this.formbuilder.group({
      name : [''],
      studentGroup : ['']
    })
    this.formLogin = this.formbuilder.group({
      username: [''],
      password: ['']
    })
    
  }
  login(){
    
    if (this.formLogin.value.username == this.username && this.formLogin.value.password == this.password){
      this.condition = true;
      alert(this.formLogin.value.username)
    }
    else{
      alert('asd')
    }
  }
  addStudent(){
    this.studentModel.name = this.formValue.value.name;
    this.studentModel.studentGroup = this.formValue.value.studentGroup;

    this.studentService.addStudent(this.studentModel).subscribe(res=>{
      alert("addes")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    },
    err=>{
      alert('something went')
    })
    
  }
  getAllStudents(){
    this.studentService.getStudents().subscribe(res=>{
      this.students = res;
    })
  }

  deleteStudent(student: Student){
    this.studentService.deleteStudents(student.id).subscribe(res=>{
      console.log(student.id)
      alert("Student Deleted");
      this.getAllStudents();
    })
  }
  myFunc():any{
    console.log('clicked');
    alert("Student Deleted");
  }
}
 