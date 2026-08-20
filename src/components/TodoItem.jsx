import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editPriority, setEditPriority] = useState(todo.priority || 'Medium')
  const [editCategory, setEditCategory] = useState(todo.category || 'Other')

  const priorityStyles = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-orange-100 text-orange-700 border-orange-200',
    Low: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  const categoryStyles = {
    Work: 'bg-blue-100 text-blue-700',
    Personal: 'bg-purple-100 text-purple-700',
    Other: 'bg-gray-100 text-gray-600',
  }

  const priorityClass =
    priorityStyles[todo.priority] || priorityStyles.Medium

  const categoryClass =
    categoryStyles[todo.category] || categoryStyles.Other

  // Start editing
  const handleEdit = () => {
    setEditTitle(todo.title)
    setEditPriority(todo.priority || 'Medium')
    setEditCategory(todo.category || 'Other')
    setIsEditing(true)
  }

  // Cancel editing
  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditPriority(todo.priority || 'Medium')
    setEditCategory(todo.category || 'Other')
    setIsEditing(false)
  }

  // Save editing
  const handleSave = () => {
    if (editTitle.trim() === '') {
      return
    }

    onEditTodo(todo.id, {
      title: editTitle.trim(),
      priority: editPriority,
      category: editCategory,
    })

    setIsEditing(false)
  }

  // Edit Mode
  if (isEditing) {
    return (
      <li className="p-4 bg-white border border-blue-200 rounded-xl shadow-sm">
        <div className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Todo Title
            </label>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Save
            </button>
          </div>

        </div>
      </li>
    )
  }

  // Normal Mode
  return (
    <li
      className={`flex items-center justify-between p-4 bg-white border rounded-xl transition-all group ${
        todo.completed
          ? 'opacity-60 bg-gray-50'
          : 'hover:shadow-sm'
      } ${
        todo.priority === 'High'
          ? 'border-l-4 border-l-red-500'
          : 'border-gray-100'
      }`}
    >

      {/* Todo Content */}
      <div
        className="flex items-center flex-1 min-w-0 gap-4 cursor-pointer"
        onClick={onToggle}
      >

        {/* Checkbox */}
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Title + Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">

            {/* Title */}
            <span
              className={`text-base font-semibold truncate transition-all duration-200 ${
                todo.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>

            {/* Priority */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full border ${priorityClass}`}
            >
              {todo.priority || 'Medium'}
            </span>

            {/* Category */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryClass}`}
            >
              {todo.category || 'Other'}
            </span>

          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-4">

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleEdit()
          }}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all focus:outline-none focus:opacity-100"
          aria-label="Edit todo"
          title="Edit"
        >
          ✏️
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:opacity-100"
          aria-label="Delete todo"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

      </div>
    </li>
  )
}

export default TodoItem