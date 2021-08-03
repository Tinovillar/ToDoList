const submit = document.getElementById('submit');
const input = document.getElementById('task');
const todos = document.getElementById('todos');
let arr = [];
let checks = [];

document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('todos')) !== null) {
        arr = JSON.parse(localStorage.getItem('todos'));
        checks = JSON.parse(localStorage.getItem('checks'));
        if (arr.length == 0) {
            arr = ['Example'];
            checks = [''];
        }
    } else {
        arr = ['Example'];
        checks = [''];
    }
    for(let i = 0; i < arr.length; i++) {
        taskCreator(arr[i], checks[i]);
        if (todos.children[i].children[0].checked) {
            todos.children[i].style.background = 'green';
        } else {
            todos.children[i].style.background = 'grey';
        }
    }
    localStorage.setItem('checks', JSON.stringify(checks));
    localStorage.setItem('todos', JSON.stringify(arr));
})

submit.addEventListener('click', () => {
    if (input.value != '') {
        taskCreator(input.value, '');
        arr.push(input.value);
    }
    input.value = '';
    checkeando();
    localStorage.setItem('checks', JSON.stringify(checks));
    localStorage.setItem('todos', JSON.stringify(arr));
})

todos.addEventListener('click', (e) => {
    if (e.target.name == 'checkbox') {
        if (e.target.checked) {
            e.target.parentNode.style.background = 'green';
        } else {
            e.target.parentNode.style.background = 'grey';
        }
    }

    if (e.target.id == 'trash') {
        e.target.parentNode.remove();
        let i = arr.indexOf(e.target.parentNode.childNodes[3].textContent);
        arr.splice(i, 1);
    }
    checkeando();
    localStorage.setItem('checks', JSON.stringify(checks));
    localStorage.setItem('todos', JSON.stringify(arr));
})

const taskCreator = (o, c) => {
    todos.innerHTML += `
    <div class="todo">
    <input type="checkbox" name="checkbox" id="checkbox" ${c}>
    <h2>${o}</h2>
    <i id="trash" class="fas fa-trash-alt"></i>
    </div>
    `;
}


const checkeando = () => {
    checks = [];
    for(let i = 0; i < arr.length; i++) {
        if (todos.children[i].children[0].checked) {
            checks.push('checked');
        } else {
            checks.push('')
        }
    }
}
