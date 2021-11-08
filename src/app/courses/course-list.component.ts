import {Component, OnInit} from "@angular/core";
import {Course} from "./course";
import {CourseService} from "./course.service";

@Component({
  selector: 'app-course-list',
  templateUrl: 'course-list.component.html'
})
export class CourseListComponent implements OnInit{

  filteredCourses: Course[] = [];

  _courses: Course[] = [];

  _filterBy: string = "";

  constructor(private courseService: CourseService) {
    return;
  }

  ngOnInit(): void{
    this._courses = this.courseService.retrieveAll();
    this.filteredCourses = this._courses;
  }

  aux_filter(value:string, courses: Course[]): Course[]{
    let filteredCourses: Course[] = []
    for (const course of courses){
      console.log(course.name.toLocaleLowerCase())
      console.log(value.toLocaleLowerCase())
      console.log( course.name.toLocaleLowerCase().indexOf( value.toLocaleLowerCase() ) )
      // console.log(course.name)
      if (course.name.toLocaleLowerCase().indexOf(
          value.toLocaleLowerCase()
          ) > -1){
        console.log ("adicionando" + course.name )
        filteredCourses.push(course);
        console.log("filtered = " + filteredCourses)
      }
    }
    return filteredCourses;
  }

  set filter(value: string){
    this._filterBy = value;
    this.filteredCourses = this._courses.filter(
      (course: Course) =>
        course.name.toLocaleLowerCase()
          .indexOf(this._filterBy.toLocaleLowerCase()) > -1
    )

    // this.filteredCourses = this.aux_filter(value, this._courses);
  }

  get filter(){
    return this._filterBy;
  }

}
