
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
  submitProject.addEventListener("submit", processProjectInput);
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
  }
  