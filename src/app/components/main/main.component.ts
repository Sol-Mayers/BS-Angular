import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { courses } from 'src/app/mock/courses';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
// OnChanges,
// DoCheck,
// AfterContentInit,
// AfterContentChecked,
// AfterViewInit,
// AfterViewChecked,
// OnDestroy
export class MainComponent implements OnInit {
  @Input() courses: Courses[] = [];
  filteredCourses: Courses[] = [];

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes, 'ngOnChanges');
  // }
  // ngDoCheck() {
  //   console.log('ngDoCheck');
  // }
  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit');
  // }
  // ngAfterContentChecked() {
  //   console.log('ngAfterContentChecked');
  // }
  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit');
  // }
  // ngAfterViewChecked() {
  //   console.log('ngAfterViewChecked');
  // }
  // ngOnDestroy() {
  //   console.log('ngOnDestroy');
  // }

  ngOnInit(): void {
    // console.log('ngOnInit');
    this.courses = [...courses];
  }
}
