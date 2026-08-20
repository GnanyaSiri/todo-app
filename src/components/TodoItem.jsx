function TodoItem({ todo, onToggle, onDelete }) {
  const priorityStyles = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-orange-100 text-orange-700 border-orange-300',
    Low: 'bg-gray-100 text-gray-600 border-gray-300',
  }

  const priorityStyle =
    priorityStyles[todo.priority] ||
    'bg-gray-100 text-gray-600 border-gray-300'

  return (
    <li
      className={`relative p-5 transition-all duration-200 ${
        todo.completed
          ? 'bg-gray-100 opacity-70'
          : 'bg-white hover:bg-gray-50'
      } ${
        todo.priority === 'High'
          ? 'border-l-4 border-red-500'
          : 'border-l-4 border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">

        {/* Todo Information */}
        <div className="flex items-center flex-1 min-w-0 gap-4">

          {/* Complete Button */}
          <button
            onClick={onToggle}
            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-500'
            }`}
            aria-label={
              todo.completed
                ? 'Mark todo as active'
                : 'Mark todo as completed'
            }
          >
            {todo.completed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {/* Title and Priority */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Todo Title */}
            <span
              className={`text-lg font-semibold truncate ${
                todo.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-900'
              }`}
            >
              {todo.title}
            </span>

            {/* Priority Badge */}
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full border flex-shrink-0 ${priorityStyle}`}
            >
              {todo.priority || 'Medium'}
            </span>

          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          aria-label="Delete todo"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
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