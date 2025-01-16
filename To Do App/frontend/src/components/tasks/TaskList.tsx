import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, useTheme, Divider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material';
import { taskAPI } from '../../services/api';
import { Task } from '../../types';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [error, setError] = useState<string>('');
    const theme = useTheme();

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await taskAPI.getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = async () => {
        if (!newTaskTitle.trim()) {
            setError('Title is required');
            return;
        }
        try {
            await taskAPI.createTask({
                title: newTaskTitle,
                description: newTaskDescription
            });
            setNewTaskTitle('');
            setNewTaskDescription('');
            fetchTasks();
            setError('');
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Failed to create task');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await taskAPI.deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task');
        }
    };

    const handleUpdate = async (task: Task) => {
        try {
            await taskAPI.updateTask(task.id, task);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper 
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                    Tasks
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="New Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        sx={{ mb: 2 }}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        sx={{ mb: 2 }}
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}
                        startIcon={<AddIcon />}
                        sx={{ 
                            borderRadius: 2,
                            py: 1.5
                        }}
                    >
                        Add Task
                    </Button>
                </Box>

                <List>
                    {tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <ListItem
                                sx={{
                                    bgcolor: theme.palette.background.default,
                                    borderRadius: 2,
                                    mb: 1,
                                    '&:hover': {
                                        bgcolor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                {editingTask?.id === task.id ? (
                                    <Box sx={{ width: '100%' }}>
                                        <TextField
                                            fullWidth
                                            value={editingTask.title}
                                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            value={editingTask.description}
                                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                            multiline
                                            rows={2}
                                        />
                                        <Box sx={{ mt: 1 }}>
                                            <IconButton onClick={() => handleUpdate(editingTask)} color="primary">
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton onClick={() => setEditingTask(null)} color="error">
                                                <ClearIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ) : (
                                    <>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" component="div">
                                                    {task.title}
                                                </Typography>
                                            }
                                            secondary={
                                                task.description && (
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        sx={{ 
                                                            mt: 1,
                                                            whiteSpace: 'pre-wrap'
                                                        }}
                                                    >
                                                        {task.description}
                                                    </Typography>
                                                )
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton 
                                                edge="end" 
                                                onClick={() => setEditingTask(task)}
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                edge="end" 
                                                onClick={() => handleDelete(task.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </>
                                )}
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default TaskList;
