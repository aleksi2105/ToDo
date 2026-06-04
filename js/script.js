'use strict'
const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const saveToLocalStorage = function () {
  localStorage.setItem('todoData', JSON.stringify(toDoData))
}

const loadFromLocalStorage = function () {
  const savedData = localStorage.getItem('todoData')

  if (savedData) {
    toDoData = JSON.parse(savedData)
  } else {
    toDoData = []
  }
}

const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''
  toDoData.forEach(function (item) {
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>'

    if (item.completed) {
      todoCompleted.append(li)
    } else {
      todoList.append(li)
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed
      render()
      saveToLocalStorage()
    })

    li.querySelector('.todo-remove').addEventListener('click', function () {
      const index = toDoData.indexOf(item)
      if (index !== -1) {
        toDoData.splice(index, 1)
      }
      render()
      saveToLocalStorage()
    })

  })

  saveToLocalStorage()
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault()

  if (headerInput.value.trim() === '') {
    alert('Пожалуйста, введите текст дела!')
    return
  }

  const newToDo = {
    text: headerInput.value,
    completed: false
  }

  toDoData.push(newToDo)
  headerInput.value = ''

  render()

})

loadFromLocalStorage()
render() 