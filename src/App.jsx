import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const initialTodos = [
  {
    id: 1,
    title: "Complete GitHub assignment",
    completed: false,
    priority: "High",
    category: "Work",
  },
  {
    id: 2,
    title: "Review pull request",
    completed: true,
    priority: "Medium",
    category: "Work",
  },
  {
    id: 3,
    title: "Fix login page layout",
    completed: false,
    priority: "High",
    category: "Work",
  },
  {
    id: 4,
    title: "Update project documentation",
    completed: false,
    priority: "Low",
    category: "Other",
  },
  {
    id: 5,
    title: "Write unit tests",
    completed: true,
    priority: "Medium",
    category: "Work",
  },
  {
    id: 6,
    title: "Deploy the application",
    completed: false,
    priority: "High",
    category: "Other",
  },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Add Todo
  const addTodo = (title, priority, category) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      priority: priority || 'Medium',
      category: category || 'Other',
    }

    setTodos([newTodo, ...todos])
  }

  // Complete / Uncomplete Todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    )
  }

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    )
  }

  // Edit Todo
  const editTodo = (id, updatedData) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: updatedData.title,
              priority: updatedData.priority,
              category: updatedData.category,
            }
          : todo
      )
    )
  }

  // Search + Category Filter
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      categoryFilter === 'All' ||
      (todo.category || 'Other') === categoryFilter

    return matchesSearch && matchesCategory
  })

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

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category
          </label>

          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center bg-white rounded-xl border border-gray-100 p-8 text-gray-500">
            No Todos match your search or category.
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        )}

      </div>
    </div>
  )
}

export default App