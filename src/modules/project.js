export default function createProject(name, description = '', tasks = []) {
  return {
    name,
    description,
    tasks,
    setName(name) {
      this.name = name;
    },
    setDescription(description) {
        this.description = description;
    },
    getName() {
      return this.name;
    },
    getDescription() {
      return this.description;
    },
    getTasks() {
      return this.tasks;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(task) {
      this.tasks = this.tasks.filter((t) => t !== task);
    }
  };
}