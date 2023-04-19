interface ITodo {
    _id: string
    name: string
    description: string
    label?: string
    priority?: string
    dueDate?: Date | null
    status: boolean
    createdAt?: string
    updatedAt?: string
    url?: string
  }
  
  interface TodoProps {
    todo: ITodo
  }
  
  type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
  }

  interface IFile {
    url: string,
    name: string,
  }