'use strict'


// constructor
function Student(name, course) {
    this.sName = name;
    this.grade = this.randomGrade();
    this.course = course;
    Student.prototype.allStudents.push(this);
}

//  Students Array
Student.prototype.allStudents = [];

// random
Student.prototype.randomGrade = function () {
    return this.grade = Math.floor(Math.random() * 100);
};

Student.prototype.passFail = function () {
    if (this.grade > 50) {
        return 'Pass';
    }
    else {
        return 'Fail';
    }
}

var table = document.getElementById('table');

// render
function renderHeader() {
    var headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    var nameCell = document.createElement('th');
    nameCell.textContent = 'Student Name';
    headerRow.appendChild(nameCell);

    var gradeCell = document.createElement('th');
    gradeCell.textContent = 'Student Grade';
    headerRow.appendChild(gradeCell);

    var courseCell = document.createElement('th');
    courseCell.textContent = 'Course';
    headerRow.appendChild(courseCell);

    var statusCell = document.createElement('th');
    statusCell.textContent = 'Status';
    headerRow.appendChild(statusCell);
}
renderHeader();

Student.prototype.render = function () {
    var studentRow = document.createElement('tr');
    table.appendChild(studentRow);

    var studentName = document.createElement('td');
    studentName.textContent = this.sName;
    studentRow.appendChild(studentName);

    var studentGrade = document.createElement('td');
    studentGrade.textContent = this.grade;
    studentRow.appendChild(studentGrade);

    var studentCourse = document.createElement('td');
    studentCourse.textContent = this.course;
    studentRow.appendChild(studentCourse);

    var studentStatus = document.createElement('td');
    studentStatus.textContent = this.passFail();
    studentRow.appendChild(studentStatus);
}


// localStorage

var studentsLS = localStorage.getItem('students');
if (studentsLS) {
    studentsLS = JSON.parse(studentsLS);
    table.innerHTML = '';
    renderHeader();
    console.log(studentsLS);
    for (var i = 0; i < studentsLS.length; i++) {
        var lsStd = new Student(studentsLS[i].sName, studentsLS[i].course);
        lsStd.grade = studentsLS[i].grade;
        lsStd.render();
    }
}


// form
var form = document.getElementById('studentsForm');
form.addEventListener('submit', addStudent);

function addStudent(event) {
    event.preventDefault();

    var stdName = event.target.studentName.value;
    var stdCourse = event.target.course.value;

    var newStudent = new Student(stdName, stdCourse);

    newStudent.render();
    form.reset();
    localStorage.setItem('students', JSON.stringify(Student.prototype.allStudents));
}