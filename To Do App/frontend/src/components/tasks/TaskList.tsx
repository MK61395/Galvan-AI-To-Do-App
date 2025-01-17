import React, { useState, useEffect } from 'react';
//import {useTheme} from '@mui/material';
//import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material';
import { taskAPI } from '../../services/api';
import { Task } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
//import { Separator } from '@/components/ui/separator';
import { Plus, CheckCircle, X } from 'lucide-react';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [error, setError] = useState<string>('');
    //const theme = useTheme();

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
        <div className="w-full">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">Tasks</CardTitle>
              </CardHeader>
    
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
    
                <div className="space-y-4 mb-8">
                  <Input
                    placeholder="Task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full"
                  />
                  <Textarea
                    placeholder="Task description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full min-h-[80px]"
                  />
                  <Button 
                    onClick={handleCreate}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
    
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-card rounded-lg border p-4">
                      {editingTask?.id === task.id ? (
                        <div className="space-y-4">
                          <Input
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                          />
                          <Textarea
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            className="min-h-[80px]"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdate(editingTask)}
                              className="w-full"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTask(null)}
                              className="w-full"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium leading-none">{task.title}</h3>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-200"
                                onClick={() => setEditingTask(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
                                onClick={() => handleDelete(task.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
};

export default TaskList;
