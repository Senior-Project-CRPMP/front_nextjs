import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

type Task = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  status: string;
};

export default function CustomKanban() {
  return (
    <div className="h-screen w-screen bg-gray-200 text-neutral-50">
      <Board />
    </div>
  );
};

type Card = {
  title: string;
  id: string;
  column: string;
};
const DEFAULT_CARDS: Card[] = [];

const Board = () => {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
  const projectIdStr = typeof window !== 'undefined' ? localStorage.getItem('projectId') : null;
const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/ProjectTasks/${projectId}`);
        const data: Task[] = await res.json();
        console.log(data)
        const mappedCards: Card[] = data.map(task => ({
          title: task.title,
          id: task.id.toString(),
          column: mapStatusToColumn(task.status)
        }));

        setCards(mappedCards);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCards();
  }, []);
  

  const mapStatusToColumn = (status: string): string => {
    switch (status.toLowerCase()) {
      case "todo":
        return "todo";
      case "inprogress":
        return "inprogress";
      case "done":
        return "done";
      default:
        return "backlog";
    }
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column title="Backlog" column="backlog" headingColor="text-neutral-900" cards={cards} setCards={setCards} />
      <Column title="TODO" column="todo" headingColor="text-yellow-500" cards={cards} setCards={setCards} />
      <Column title="In progress" column="inprogress" headingColor="text-blue-500" cards={cards} setCards={setCards} />
      <Column title="Complete" column="done" headingColor="text-emerald-500" cards={cards} setCards={setCards} />/
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: Card[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const Column = ({ title, headingColor, cards, column, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const updateTaskStatus = async (task: Task) => {
    try {
      console.log(task)
      const res = await fetch(`${apiBaseUrl}/api/Task/UpdateTask/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to update task status: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  const handleDragStart = (e: React.DragEvent, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const fetchTaskDetails = async (cardId: string): Promise<Task> => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/Task/SingleTask/${parseInt(cardId)}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch task details for cardId: ${cardId}`);
      }
      const taskDetails: Task = await res.json();
      console.log(taskDetails)
      return taskDetails;
    } catch (error) {
      console.error('Error fetching task details:', error);
      throw error;
    }
  };

  const handleDragEnd = async (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
  
    setActive(false);
    clearHighlights();
  
    const indicators = getIndicators() as HTMLElement[];
    const { element } = getNearestIndicator(e, indicators);
  
    const before = element.dataset.before || "-1";
  
    if (before !== cardId) {
      let copy = [...cards];
  
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      
      const newColumn = column;  // Store new column before updating state
      cardToTransfer = { ...cardToTransfer, column: newColumn };
  
      copy = copy.filter((c) => c.id !== cardId);
  
      const moveToBack = before === "-1";
  
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
  
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
  
      setCards(copy);
      
      // Fetch the original task details and update the column (status)
      const taskDetails = await fetchTaskDetails(cardId);
      const updatedTask = { ...taskDetails, status: newColumn };
  
      // Update task in backend
      await updateTaskStatus(updatedTask);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || (getIndicators() as HTMLElement[]);

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators() as HTMLElement[];

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: React.DragEvent, card: Card) => void;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

type BurnBarrelProps = {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const BurnBarrel = ({ setCards }: BurnBarrelProps) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

