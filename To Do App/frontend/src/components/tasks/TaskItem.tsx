import React, { useState } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    Typography,
    Menu,
    MenuItem,
    useTheme,
    Box,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { Task } from '../../types';
import TaskForm from './TaskForm';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string, description: string) => void;
    isLast?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onToggle,
    onDelete,
    onUpdate,
    isLast = false,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const theme = useTheme();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setIsEditOpen(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(task.id);
        handleMenuClose();
    };

    const handleUpdate = (title: string, description: string) => {
        onUpdate(task.id, title, description);
        setIsEditOpen(false);
    };

    return (
        <>
            <ListItem
                sx={{
                    borderBottom: !isLast ? `1px solid ${theme.palette.divider}` : 'none',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                    py: 2,
                    px: 3,
                }}
            >
                <Checkbox
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    color="primary"
                    sx={{
                        color: theme.palette.text.secondary,
                        mr: 2,
                    }}
                />
                <ListItemText
                    primary={
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? theme.palette.text.secondary : theme.palette.text.primary,
                                fontWeight: 500,
                                mb: 0.5,
                            }}
                        >
                            {task.title}
                        </Typography>
                    }
                    secondary={
                        task.description && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: task.completed 
                                        ? theme.palette.text.disabled 
                                        : theme.palette.text.secondary,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
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
                        onClick={handleMenuOpen}
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        minWidth: 120,
                        borderRadius: 2,
                        mt: 1,
                    }
                }}
            >
                <MenuItem onClick={handleEdit} sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EditIcon fontSize="small" />
                        <Typography>Edit</Typography>
                    </Box>
                </MenuItem>
                <MenuItem 
                    onClick={handleDelete}
                    sx={{ 
                        py: 1.5,
                        color: theme.palette.error.main,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeleteIcon fontSize="small" />
                        <Typography>Delete</Typography>
                    </Box>
                </MenuItem>
            </Menu>

            <TaskForm
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={handleUpdate}
                initialTitle={task.title}
                initialDescription={task.description}
                isEdit
            />
        </>
    );
};

export default TaskItem;
