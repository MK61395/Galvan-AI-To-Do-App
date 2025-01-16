import React, { useState } from 'react';
import { Task } from '../../types';

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleUpdate = (title: string, description: string) => {
        onUpdate(task.id, title, description);
        setIsEditOpen(false);
    };

    return (
        <>
          <div className={cn(
            "flex items-start gap-4 p-4 group hover:bg-accent/50 rounded-lg transition-colors",
            !isLast && "border-b"
          )}>
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium leading-none",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "mt-2 text-sm text-muted-foreground line-clamp-2",
                  task.completed && "text-muted-foreground/60"
                )}>
                  {task.description}
                </p>
              )}
            </div>
    
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    
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
