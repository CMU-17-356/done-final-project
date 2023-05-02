interface ITodo {
    _id: string
    name: string
    description: string
    label: string
    priority?: string
    dueDate?: Date | null
    recurring?: string
    day?: string | null
    completed: {date: Date, photo: string}[]
    createdAt: Date
    user: string
  }
  
  interface TodoProps {
    todo: ITodo
  }
  
  interface IFile {
    url: string,
    name: string,
  }