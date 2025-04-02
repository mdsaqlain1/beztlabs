import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { getTaskById, createTask, updateTask } from '../services/taskService';

const TaskForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
    category: 'Work' as const
  });

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const data = await getTaskById(id);
          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Task' : 'Create New Task'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={task.category}
            onChange={(e) => setTask({...task, category: e.target.value as any})}
            label="Category"
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          {id ? 'Update Task' : 'Create Task'}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;