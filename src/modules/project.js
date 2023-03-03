
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
