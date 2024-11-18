class School {
    constructor(name, address, zipcode, city) {
        this.name = name;
        this.address = address;
        this.zipcode = zipcode;
        this.city = city;
        this.students = [];
        this.teachers = [];
    }
}
const mySchool = new School("Teknikhögskolan", "123 St", "12345", "Lund");

class Subject {
    constructor(name) {
        this.name = name;
        this.students = [];
        this.teacher = null;
    }
}
const math = new Subject("Math");
const physics = new Subject("Physics");
const chemistry = new Subject("Chemistry");


class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.subjects = [];
    }
}
const student1 = new Student("Alice", 16);
const student2 = new Student("Bob", 17);
const student3 = new Student("Charlie", 15);
const student4 = new Student("Diana", 16);
const student5 = new Student("Eve", 18);


class Teacher {
    constructor(name) {
        this.name = name;
        this.subjects = [];
    }
}
const teacher1 = new Teacher("Mr. Smith");
const teacher2 = new Teacher("Ms. Johnson");


Teacher.prototype.addSubject = function(subject) {
    this.subjects.push(subject);
    subject.teacher = this;
};

Subject.prototype.addStudent = function(student) {
    this.students.push(student);
    student.subjects.push(this);
};

function addSubjectToTeacher(subject, teacher) {
    teacher.addSubject(subject);
    return teacher;
}
addSubjectToTeacher(math, teacher1);


School.prototype.addTeacher = function(teacher) {
    this.teachers.push(teacher);
};
School.prototype.addStudent = function(student) {
    this.students.push(student);
};
Student.prototype.enlistToSubject = function(subject) {
    subject.addStudent(this);
};
School.prototype.addSubject = function(subject) {
    this.teachers.forEach(teacher => {
        if (!teacher.subjects.includes(subject)) teacher.addSubject(subject);
    });
};


mySchool.addTeacher(teacher1);
mySchool.addTeacher(teacher2);
mySchool.addStudent(student1);
mySchool.addStudent(student2);
student1.enlistToSubject(math);
student2.enlistToSubject(physics);
console.log(mySchool);

Teacher.prototype.fire = function() {
    this.subjects.forEach(subject => subject.teacher = null);
    this.subjects = [];
};

Subject.prototype.quitSubject = function(student) {
    this.students = this.students.filter(s => s !== student);
    student.subjects = student.subjects.filter(sub => sub !== this);
};

School.prototype.removeTeacher = function(teacher) {
    this.teachers = this.teachers.filter(t => t !== teacher);
    teacher.fire();
};

School.prototype.relegateStudent = function(student) {
    this.students = this.students.filter(s => s !== student);
    student.subjects.forEach(subject => subject.quitSubject(student));
};


mySchool.addStudent(student3);
mySchool.addStudent(student4);
mySchool.addStudent(student5);
student3.enlistToSubject(chemistry);
student4.enlistToSubject(math);
teacher2.addSubject(physics);

function displayAllStudents(school) {
    school.students.forEach(student => console.log(student.name));
}
displayAllStudents(mySchool);

function displayAllSubjectsOfStudent(student) {
    return student.subjects.map(subject => subject.name);
}
function displayAllStudentsEnlistedToSubject(subject) {
    return subject.students.map(student => student.name);
}
function displayAllTeachers(school) {
    return school.teachers.map(teacher => teacher.name);
}


class Grade {
    constructor(student, subject, score) {
        this.student = student;
        this.subject = subject;
        this.score = score;
    }
}
Grade.prototype.updateScore = function(newScore) {
    this.score = newScore;
};
const grade1 = new Grade(student1, math, 85);
