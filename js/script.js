'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const toDoData = getData('localToDoList');

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  toDoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      setData('localToDoList', toDoData);
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function () {
      const itemIndex = toDoData.indexOf(item);
      toDoData.splice(itemIndex, 1);
      setData('localToDoList', toDoData);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value.trim(),
    completed: false,
  };
  if (headerInput.value !== '') {
    toDoData.push(newToDo);
    render();
  }
  headerInput.value = '';
  setData('localToDoList', toDoData);
});
render();
