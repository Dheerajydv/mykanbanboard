export const STATUS_CONSTANTS = ["todo", "doing", "done"] as const

export const COLUMNS = [
  {
    id: "todo",
    title: "Todo"
  },
  {
    id: "doing",
    title: "Doing"
  },
  {
    id: "done",
    title: "Done"
  },
] as const

export const tasks = [
  {
    id: "1",
    taskTitle: "task1",
    status: "todo"
  },
  {
    id: "2",
    taskTitle: "task2",
    status: "doing"
  },
  {
    id: "3",
    taskTitle: "task3",
    status: "done"
  },
  {
    id: "4",
    taskTitle: "task3",
    status: "todo"
  },
  {
    id: "5",
    taskTitle: "task4",
    status: "todo"
  },
  {
    id: "6",
    taskTitle: "task6",
    status: "todo"
  },
  {
    id: "7",
    taskTitle: "task7",
    status: "todo"
  },
  {
    id: "8",
    taskTitle: "task8",
    status: "todo"
  },
  {
    id: "9",
    taskTitle: "task9",
    status: "todo"
  }
]
