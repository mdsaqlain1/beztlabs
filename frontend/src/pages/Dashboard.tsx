import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Edit, Delete, Add, Logout } from "@mui/icons-material";
import {
  getTasks,
  deleteTask,
  toggleTaskStatus,
} from "../services/taskService";
import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const filteredTasks =
    categoryFilter === "All"
      ? tasks
      : tasks.filter((task) => task.category === categoryFilter);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = () => navigate("/tasks/new");
  const handleEditTask = (id: string) => navigate(`/tasks/${id}`);

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleStatus = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await toggleTaskStatus(id, !completed);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Task Manager
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            My Tasks
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddTask}
              sx={{ height: "fit-content" }}
            >
              New Task
            </Button>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <TableContainer>
            <Table sx={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", width: "80px" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white", width: "200px" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", width: "150px" }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ color: "white", width: "120px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TableRow
                      key={task._id}
                      hover
                      sx={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        opacity: task.completed ? 0.7 : 1,
                      }}
                    >
                      <TableCell sx={{ width: "80px" }}>
                        <Checkbox
                          checked={task.completed}
                          onChange={() =>
                            handleToggleStatus(task._id, task.completed)
                          }
                          color="primary"
                        />
                      </TableCell>
                      <TableCell
                        sx={{ width: "200px", wordWrap: "break-word" }}
                      >
                        <Typography variant="body1" fontWeight="medium">
                          {task.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ wordWrap: "break-word" }}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          whiteSpace="normal"
                        >
                          {task.description || "No description"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: "150px" }}>
                        <Chip
                          label={task.category}
                          color={
                            task.category === "Work"
                              ? "primary"
                              : task.category === "Personal"
                              ? "secondary"
                              : "default"
                          }
                        />
                      </TableCell>

                      <TableCell sx={{ width: "120px" }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              onClick={() => handleEditTask(task._id)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteTask(task._id)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        No tasks found. Create your first task!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
