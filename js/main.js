// Get Element
let input = document.querySelector(".add-task input");
let submit = document.querySelector(".plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let arrayData = [];

window.onload = function () {
  input.focus();
  calculateTask();
};
// Check the localStorage Empty or no and Json parse
if (localStorage.getItem("tasks")) {
  arrayData = JSON.parse(localStorage.getItem("tasks"));
}
// Check the localStorage Empty or no And Call Function
if (arrayData.length > 0) {
  getDatatFromLocal();
}

submit.onclick = function () {
  // if the Empty
  if (input.value === "") {
    console.log("empty");
    alert();
  } else {
    let noTaskMessage = document.querySelector(".no-tasks-message");
    if (document.body.contains(noTaskMessage)) {
      // noTaskMessage.remove();
    }
    addTaskToArray(input.value);
    calculateTask();
    input.focus();
  }
  input.value = "";
};
function addTaskToArray(inputValue) {
  // Create Object
  const task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  // push to Object in Array Data
  arrayData.push(task);
  addEleToArray(arrayData);
  addLocalToArray(arrayData);
}
function addEleToArray(arrayData) {
  tasksContainer.innerHTML = "";
  // Loop for Array Data
  arrayData.forEach((task) => {
    // Create The TAsk Box
    let taskBox = document.createElement("span");
    // Add Class To span
    taskBox.classList.add("task-box");
    // Create The attribute
    taskBox.setAttribute("data-id", task.id);
    final();
    // Add Class To Task Box if The Completed True
    function final() {
      if (task.completed) {
        taskBox.classList.toggle("finished");
      }
    }
    // Create The Main Span To Title
    let mainSpan = document.createElement("span");
    // Create The Main Span To Delete
    let deleteButn = document.createElement("span");
    //  Add Class To Delete Butn
    deleteButn.classList.add("delete");
    mainSpan.appendChild(document.createTextNode(task.title));
    deleteButn.appendChild(document.createTextNode("Delete"));
    taskBox.appendChild(mainSpan);
    taskBox.appendChild(deleteButn);
    tasksContainer.appendChild(taskBox);
  });
}
// Add Array data TO Local Storage
function addLocalToArray(arrayData) {
  localStorage.setItem("tasks", JSON.stringify(arrayData));
}
// Create new Array and append Data From GEt Local Storage
function getDatatFromLocal() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let newArr = JSON.parse(data);
    addEleToArray(newArr);
  }
}

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Add parameter to delete task 
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Delete task from task container
    e.target.parentElement.remove();
    // Check The task container empty or no
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }
  if (e.target.classList.contains("task-box")) {
    // Add parameter to Toggle Event To Change Complete Value
    ToggleEventStatusTaskWith(e.target.getAttribute("data-id"));
    // Add And Change class Complete to TAsk Box
    e.target.classList.toggle("finished");
  }
  calculateTask();
});
// Function to Delete TAsk Box
function deleteTaskWith(taskId) {
  arrayData = arrayData.filter((task) => task.id != taskId);
  // Append To Local Storage
  addLocalToArray(arrayData);
}
// Function to change Complete value
function ToggleEventStatusTaskWith(taskId) {
  for (let i = 0; i < arrayData.length; i++) {
    if (arrayData[i].id == taskId) {
      arrayData[i].completed == false
        ? (arrayData[i].completed = true)
        : (arrayData[i].completed = false);
    }
  }
  // Append Change To Local Storage 
  addLocalToArray(arrayData);
}
// Function to Create No Tasks 

function createNoTasks() {
  let msgSpan = document.createElement("span");
  msgSpan.classList.add("no-tasks-message");
  msgSpan.appendChild(document.createTextNode("No Tasks Message Show"));
  tasksContainer.appendChild(msgSpan);
}
// Function to Calcs to task Content And Complete Content

function calculateTask() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
