import api from "./api";

interface Task {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
}

export const getTasks = async () => {
  const response = await api.get("/tasks/");
  console.log(response.data);
  return response.data;
};

export const getTaskById = async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  };

export const createTask = async (task: Task) => {
  const response = await api.post("/tasks/", task);
  return response.data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const toggleTaskStatus = async (id: string, completed: boolean) => {
  const response = await api.put(`/tasks/${id}/toggle`, { completed });
  return response.data;
};