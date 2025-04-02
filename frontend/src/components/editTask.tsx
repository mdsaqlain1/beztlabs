import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { getTaskById, updateTask } from '../services/taskService';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
    category: 'Work' as const
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id!);
        setTask({
          title: data.title,
          description: data.description,
          completed: data.completed,
          category: data.category || 'Work'
        });
      } catch (err) {
        setError('Failed to load task');
        console.error('Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await updateTask(id!, task);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleComplete = () => {
    setTask(prev => ({ ...prev, completed: !prev.completed }));
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Edit Task
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            inputProps={{ maxLength: 100 }}
          />
          
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={task.category}
              onChange={(e) => setTask({...task, category: e.target.value as 'Work' | 'Personal' | 'Other'})}
              label="Category"
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              color="primary"
            />
            <Typography>Mark as completed</Typography>
          </Box>
          
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              disabled={submitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || !task.title}
              sx={{ minWidth: 120 }}
            >
              {submitting ? (
                <>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                  Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditTask;