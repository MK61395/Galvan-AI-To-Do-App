import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

interface TaskFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
    initialTitle?: string;
    initialDescription?: string;
    isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
    open,
    onClose,
    onSubmit,
    initialTitle = '',
    initialDescription = '',
    isEdit = false,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        if (open) {
            setTitle(initialTitle);
            setDescription(initialDescription);
        }
    }, [open, initialTitle, initialDescription]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title.trim(), description.trim());
            setTitle('');
            setDescription('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {isEdit ? 'Edit Task' : 'Create New Task'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mb-4"
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        {isEdit ? 'Save' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskForm;
