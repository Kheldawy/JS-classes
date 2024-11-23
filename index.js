class School{
    constructor(name, address, zipcode, city){
        this.name=name;
        this.address=address;
        this.zipcode=zipcode;
        this.city=city;
        this.students=[];
        this.teachers=[];
        this.subjects=[] // 13
    }
    addTeacher(teacher){
        this.teachers.push(teacher);
    }
    addStudent(student){
        this.students.push(student);
    }
    addSubject(subject){
        this.subjects.push(subject);
    }

    removeTeacher(teacher){
        this.teachers=this.teachers.filter (t=>t !== teacher);
    }

    relegateStudent(student){
        this.students=this.students.filter(s=> s !== student);
    }

    fireTeacher(teacher){
        teacher.subjects.forEach(subject => subject.teacher=null);
        this.removeTeacher(teacher);
    }
    
}

const mySchool= new School ("Teknikhogskolan", "123st", "12345", "Lund");

class Subject{
    constructor(name){
        this.name=name;
        this.students=[];
        this.teacher= null;
    }
addStudent(student){
    this.students.push(student);
    student.subjects.push(this);
}

}

const math = new Subject("Math");
const physics= new Subject("Physics");
const chemistry= new Subject("Chemistry");

// math.addStudent=function(student){
//     this.students.push(student);
// };

// math.addStudent(student1);
// console.log(math);
// console.log(student1);

class Student {
    constructor(name,age){
        this.name=name;
        this.age=age;
        this.subjects=[];
    }
    enlistToSubject(subject){
        this.subjects.push(subject);
        subject.addStudent(this);
    }
    quitSubject(subject) {
        this.subjects=this.subjects.filter(s => s !==subject);
        subject.students= subject.students.filter(s => s !== this);
    }
    
}

const student1= new Student ("Alice", 16);
const student2= new Student ("Bob",17);
const student3= new Student ("Charlie", 15);
const student4= new Student ("Diana", 16);
const student5= new Student ("Eve", 18);


class Teacher{
    constructor(name){
        this.name=name;
        this.subjects=[];
    }
    addSubject(subject){
        this.subjects.push(subject);
        subject.teacher=this;
    }
}

const teacher1= new Teacher("Mr. Smith");
const teacher2= new Teacher("Mr.Johnson");

teacher1.addSubject(math);
console.log(teacher1);
console.log(math);


function addSubjectToTeacher(subject,teacher){
    teacher.addSubject(subject);
    subject.teacher=teacher;
    return teacher;
}

addSubjectToTeacher(math,teacher1);
console.log(teacher1);
console.log(math);

teacher2.addSubject(physics);
console.log(teacher2, physics);

teacher1.addSubject(math);
console.log(teacher1,math);


mySchool.addTeacher(teacher1);
mySchool.addTeacher(teacher2);
mySchool.addStudent(student1);
mySchool.addStudent(student2);
mySchool.addSubject(chemistry);
student3.enlistToSubject(chemistry);
student4.enlistToSubject(physics);
teacher1.addSubject(math);
console.log(mySchool);


mySchool.fireTeacher(teacher1);
console.log(mySchool);

const teacher3 = new Teacher("Mr. Brown");

mySchool.addTeacher(teacher3);
mySchool.addStudent(student2);
mySchool.addSubject(chemistry);

student2.enlistToSubject(chemistry);
teacher3.addSubject(chemistry);
console.log(mySchool)

function displayAllStudents(school){
    school.students.forEach(student => console.log(student.name));
}
displayAllStudents(mySchool);

function displayAllSubjectsOfStudent(student){
    return student.subjects.map(subject => subject.name);
}

function displayAllStudentsEnlistedToSubject(subject){
    return subject.students.map(student => student.name);
}

function displayAllTeachers(teacher){
    return mySchool.teachers.map( teacher => teacher.name);
}
displayAllStudents(mySchool);
console.log(displayAllTeachers(mySchool))
console.log(displayAllSubjectsOfStudent(student2));

class Grade{
    constructor(student, subject, score){
        this.student=student;
        this.subject=subject;
        this.score=score;
    }
}
const grade1= new Grade (student2,math, 85);
console.log(grade1);
