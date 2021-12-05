export interface Student {
    id: number;
    name: string;
}

export interface ISemester {
    Id: number;
    Semester: string;
    Year: number;
    course: ICourse[];
}

export interface ICourse {
    CourseNumber: number;
    CourseTitle: string;
    CurriculumID: string;
}

export class Semester implements ISemester {
    Id!: number;
    Semester!: string;
    Year!: number;
    course!: ICourse[];
}

export class Course implements ICourse {
    CourseNumber!: number;
    CourseTitle!: string;
    CurriculumID!: string;
}