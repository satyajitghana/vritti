"use client";

import { useState } from "react";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanItem,
  KanbanItems,
  KanbanOverlay,
} from "./component";

interface Task {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Research competitors" },
      { id: "2", title: "Write user stories" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "Design mockups" },
      { id: "4", title: "Set up CI/CD" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "5", title: "Project kickoff" },
    ],
  },
];

export default function KanbanExample() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-x-auto p-8">
      <Kanban>
        <KanbanBoard>
          {columns.map((column) => (
            <KanbanColumn key={column.id} value={column.id}>
              <KanbanColumnHeader>
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {column.tasks.length}
                </span>
              </KanbanColumnHeader>
              <KanbanItems>
                {column.tasks.map((task) => (
                  <KanbanItem key={task.id} value={task.id}>
                    <p className="text-sm">{task.title}</p>
                  </KanbanItem>
                ))}
              </KanbanItems>
            </KanbanColumn>
          ))}
        </KanbanBoard>
        <KanbanOverlay />
      </Kanban>
    </div>
  );
}
