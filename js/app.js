const login = document.getElementById('login');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const grades = document.getElementById('gradesPage');
const message = document.getElementById('message');
const head = document.getElementById('head');
const gradesArr = [];

const switchPage = (page) => {
  login.innerHTML = '';
  message.innerHTML = '';
  grades.innerHTML = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  const gradeList = document.createElement('button');
  const addGrade = document.createElement('button');

  gradeList.innerHTML = 'Grade View';
  gradeList.onclick = () => switchPage('gradesView');

  addGrade.innerHTML = 'Add Grades';
  addGrade.onclick = () => switchPage('addGrade');

  nav.append(gradeList, addGrade);
  grades.appendChild(nav);

  if (page === 'gradesView') {
    head.innerHTML = 'Grades View';
    for (const grade of gradesArr) {
      const div = document.createElement('div');
      div.style.fontSize = '20px';
      div.innerHTML = `${grade.student}: ${grade.grade}`;
      grades.appendChild(div);
    }
  } else if (page === 'addGrade') {
    head.innerHTML = 'Add Grades';
    const name = document.createElement('input');
    const grade = document.createElement('input');
    const submitInp = document.createElement('input');

    name.placeholder = 'Student Name';
    grade.placeholder = 'Student Grade (0-100)';
    submitInp.value = 'Submit';

    name.type = 'text';
    grade.type = 'text';
    submitInp.type = 'button';

    submitInp.onclick = () => {
      const studentName = name.value;
      const studentGrade = parseInt(grade.value);
      if (!studentName.length) return (message.innerHTML = 'You did not put anything valid');
      if (isNaN(studentGrade)) return (message.innerHTML = 'Grade must be a number');
      if (studentGrade > 100 || studentGrade < 0) return (message.innerHTML = 'Grade must be between 100 and 0');
      gradesArr.push({ student: name.value, grade: grade.value });
      name.value = '';
      message.innerHTML = '';
      grade.value = '';
      switchPage('gradesView');
    };
    grades.append(name, grade, submitInp);
  }
};

submit.onclick = () => {
  const { value: user } = username;
  const { value: pass } = password;

  if (user !== 'cool' && pass !== 'password') return (message.innerHTML = 'Username and password are incorrect');
  if (user !== 'cool') return (message.innerHTML = 'Username is incorrect');
  if (pass !== 'password') return (message.innerHTML = 'Password is incorrect');

  switchPage('gradesView');
};
