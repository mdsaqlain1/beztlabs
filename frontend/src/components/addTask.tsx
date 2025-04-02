import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { createTask } from '../services/taskService';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'Work' as const
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createTask(task);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Add New Task
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
          
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !task.title}
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Saving...' : 'Save Task'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddTask;