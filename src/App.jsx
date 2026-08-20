import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const initialTodos = [
  {
    id: 1,
    title: "Complete GitHub assignment",
    completed: false,
  },
  {
    id: 2,
    title: "Review pull request",
    completed: true,
  },
  {
    id: 3,
    title: "Fix login page layout",
    completed: false,
  },
  {
    id: 4,
    title: "Update project documentation",
    completed: false,
  },
  {
    id: 5,
    title: "Write unit tests",
    completed: true,
  },
  {
    id: 6,
    title: "Deploy the application",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [searchTerm, setSearchTerm] = useState('')

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Todo Manager
          </h1>

          <p className="text-lg text-gray-500">
            Manage your tasks and stay productive.
          </p>
        </div>

        {/* Add Todo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <TodoForm onAddTodo={addTodo} />
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Todos
          </label>

          <input
            id="search"
            type="text"
            placeholder="Search by todo title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center bg-white rounded-xl border border-gray-100 p-8 text-gray-500">
            No Todos match your search.
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        )}

      </div>
    </div>
  )
}

export default App