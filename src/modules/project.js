import { displayTodoList, id } from "./todo.js";

// CreateProject Factory
const CreateProject = (todoProject, name) => {
  const todoList = [];
  const taskNum = todoList.length;
  return {
    todoProject,
    name,
    todoList,
    taskNum
  }
}

// add event listeners to DOM
const addProjectEventList = () => {
  const addProject = document.querySelector("#addProject");
  addProject.addEventListener("click", showProjectForm);

  const cancelProject = document.querySelector("#projectCancelBtn");
  cancelProject.addEventListener("click", hideProjectForm);
  cancelProject.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      hideProjectForm();
    }
  });

  const submitProject = document.querySelector("#projectSubmitBtn");
  submitProject.addEventListener("click", processProjectInput);
  submitProject.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      processProjectInput(e);
    }
  });

  const projectNavbar = document.querySelector(".navbar");
  projectNavbar.addEventListener("click", checkProject); //check if project is clicked
}

//get project list of objects from local storage or start with empty
let defaultProjectList=[];
let projectList = localStorage.getItem("myProjectList");
    projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));

//process the input and prepare to create element project
const processProjectInput = (e) => {
    let projectName = document.getElementById("projectInput").value;
    let dataProject = findNextDataset();
    const newProject = CreateProject(dataProject, projectName);

    projectList.push(newProject);
    saveToLocalStorage();

    addProject(dataProject, projectName);
    hideProjectForm();
    e.preventDefault();
}

// save projectList and last id data on local storage

// popup add project form
const showProjectForm = () => {
  const projectForm = document.querySelector("#projectForm");
  projectForm.classList.remove("hidden");
  document.getElementById('projectInput').focus();
}

// hide add-project form
const hideProjectForm = () => {
  const projectForm = document.querySelector("#projectForm");
  projectForm.classList.add("hidden");

  // clear input fields
  document.querySelector("#projectInput").value = "";
}

// display list of projects in navbar 
const displayProjectList = (array) => {
  array.forEach((project) => {
    addProject(project.todoProject, project.name);
  });
}

// create project and add to navbar list of projects - html
const addProject = (todoProject, projectName) => {
  const project = document.querySelector('.projects');
  const form = document.querySelector('#projectForm');

  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');
  projectDiv.setAttribute('data-project', todoProject);
  projectDiv.textContent = projectName;

  project.insertBefore(projectDiv, form);

  // project icon
  const projectIcon = document.createElement('i');
  projectIcon.classList.add('fas', 'fa-tasks', 'projectIcon');
  projectDiv.appendChild(projectIcon);

  // project delete icon
  const projectDelete = document.createElement('i');
  projectDelete.classList.add('fas', 'fa-trash-alt', 'projectDelete');
  projectDiv.appendChild(projectDelete);

  // project name edit by clicking on project name
  projectDiv.addEventListener('click', (e) => {
    editProjectName(e);
  });

  // project delete by clicking on delete icon
  projectDelete.addEventListener('click', (e) => {
    deleteProject(e);
  });

}

// check if project is clicked
const checkProject = (e) => {
  if (e.target.classList.contains('project')) {
    let project = e.target;
    let projectData = project.getAttribute('data-project');
    let todoList = document.querySelector('.todoList');
    todoList.innerHTML = "";
    displayTodoList(projectData);

    selectedProject(projectData);
  }
}

// find next dataset for project
const findNextDataset = () => {
  let dataProject = 0;
  if (projectList.length > 0) {
    dataProject = projectList[projectList.length - 1].todoProject + 1;
  }
  return dataProject;
}

// edit project name
const editProjectName = (e) => {
  let project = e.target;
  let projectData = project.getAttribute('data-project');
  let projectIndex = projectList.findIndex((project) => project.todoProject == projectData);
  let projectName = projectList[projectIndex].name;
  let newProjectName = prompt("Edit Project Name", projectName);
  if (newProjectName != null) {
    projectList[projectIndex].name = newProjectName;
    saveToLocalStorage();
    project.textContent = newProjectName;
  }
}

// delete project
const deleteProject = (e) => {
  let project = e.target.parentElement;
  let projectData = project.getAttribute('data-project');
  let projectIndex = projectList.findIndex((project) => project.todoProject == projectData);
  projectList.splice(projectIndex, 1);
  saveToLocalStorage();
  project.remove();
}

// save projectList and last id data on local storage
const saveToLocalStorage = () => {
  localStorage.setItem("myProjectList", JSON.stringify(projectList));
  localStorage.setItem("myId", JSON.stringify(id));
}

// add .selected to selected project and remove from others
const selectedProject = (projectData) => {
  let project = document.querySelector(`[data-project="${projectData}"]`);
  project.classList.add('selected');
  let projectList = document.querySelectorAll('.project');
  projectList.forEach((project) => {
    if (project.getAttribute('data-project') != projectData) {
      project.classList.remove('selected');
    }
  });
}

// show addtodo form when project is selected
const showAddTodoForm = () => {
  const addTaskBtn = document.getElementById('addTodo');
  addTaskBtn.classList.remove('hidden');
}

// hide addtodo form when project is not selected
const hideAddTodoForm = () => {
  const addTaskBtn = document.getElementById('addTodo');
  addTaskBtn.classList.add('hidden');
}

// export functions
export { addProjectEventList, displayProjectList, saveToLocalStorage, projectList, showAddTodoForm, hideAddTodoForm };