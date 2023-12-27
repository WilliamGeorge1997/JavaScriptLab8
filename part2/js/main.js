class TaskManager {
  constructor() {
    this.taskList = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.clearTasksBtn = document.getElementById("clearTasksBtn");

    this.addTaskBtn.addEventListener("click", () => this.addTask());
    this.clearTasksBtn.addEventListener("click", () =>
      this.clearCompletedTasks()
    );

    this.refreshTaskList();
  }

  createTaskElement(task, index) {
    let listItem = document.createElement("li");
    listItem.textContent = task.text;

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "btnContainer";

    let actionButton = this.createButton(
      task.completed ? "Undo" : "Complete",
      task.completed ? "undoBtn" : "completeBtn",
      () => this.toggleCompleteTask(index)
    );
    let deleteButton = this.createButton("Delete", "deleteBtn", () =>
      this.deleteTask(index)
    );

    buttonContainer.appendChild(actionButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(buttonContainer);

    if (task.completed) {
      listItem.classList.add("completed");
    }

    return listItem;
  }

  createButton(text, className, clickHandler) {
    let button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", clickHandler);
    return button;
  }

  refreshTaskList() {
    this.taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
      let listItem = this.createTaskElement(task, index);
      this.taskList.appendChild(listItem);
    });
  }

  addTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (!this.taskInput.value.trim()) {
      alert("Please, enter a task!");
      return;
    }

    let newTask = {
      text: this.taskInput.value,
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.refreshTaskList();
    this.taskInput.value = "";
  }

  toggleCompleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.refreshTaskList();
  }

  deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.refreshTaskList();
  }

  clearCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let remainingTasks = tasks.filter((task) => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
    this.refreshTaskList();
  }
}

const taskManager = new TaskManager();
