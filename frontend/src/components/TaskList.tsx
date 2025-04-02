import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
  Typography,
  Chip
} from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

interface TaskListProps {
  tasks: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (tasks.length === 0) {
    return <Typography>No tasks found. Add your first task!</Typography>;
  }

  return (
    <Paper elevation={3}>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => onEdit(task._id)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => onDelete(task._id)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleStatus(task._id, task.completed)}
            />
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Chip 
                    label={task.category} 
                    size="small" 
                    color={
                      task.category === 'Work' ? 'primary' :
                      task.category === 'Personal' ? 'secondary' : 'default'
                    }
                    sx={{ mt: 0.5 }}
                  />
                </>
              }
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "text.disabled" : "text.primary",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;