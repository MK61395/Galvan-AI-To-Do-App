import React, { useState } from 'react';
import { Task } from '../../types';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
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
                  size="lg"
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80 p-2"
                >
                  <MoreVertical className="h-8 w-8" strokeWidth={2.5} />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex gap-2 p-4">
                  <Button
                    variant="outline"
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-200"
                    onClick={() => setIsEditOpen(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
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