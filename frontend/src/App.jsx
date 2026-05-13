import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/tasks";


  // GET TASKS
  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL);

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getTasks();
  }, []);


  // CREATE TASK
  const createTask = async () => {
    if (!title) return;

    try {
      await axios.post(API_URL, {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };


  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };


  // EDIT BUTTON
  const handleEdit = (task) => {
    setEditingId(task._id);

    setTitle(task.title);
    setDescription(task.description);
  };


  // UPDATE TASK
  const updateTask = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, {
        title,
        description,
      });

      setEditingId(null);

      setTitle("");
      setDescription("");

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };


  // TOGGLE COMPLETED
  const toggleCompleted = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container">
      <h1>Task Management System</h1>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {editingId ? (
        <button onClick={updateTask}>
          Update Task
        </button>
      ) : (
        <button onClick={createTask}>
          Add Task
        </button>
      )}

      <hr />

      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            Status:
            {task.completed
              ? " Completed"
              : " Pending"}
          </p>

          <button onClick={() => handleEdit(task)}>
            Edit
          </button>

          <button onClick={() => toggleCompleted(task)}>
            {task.completed
              ? "Mark Pending"
              : "Mark Completed"}
          </button>

          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;