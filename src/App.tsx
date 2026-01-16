import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
          createdAt: new Date()
        }
      ])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodosCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="app">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">✦</span>
            Today's Tasks
          </h1>
          <p className="subtitle">
            {activeTodosCount === 0 
              ? "All caught up! ✨" 
              : `${activeTodosCount} task${activeTodosCount !== 1 ? 's' : ''} remaining`}
          </p>
        </header>

        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">
              <span className="empty-icon">📝</span>
              <span>
                {filter === 'all' 
                  ? "No tasks yet. Add one above!" 
                  : filter === 'active' 
                    ? "No active tasks" 
                    : "No completed tasks"}
              </span>
            </li>
          ) : (
            filteredTodos.map((todo, index) => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button 
                  className="checkbox"
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {todo.completed && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button 
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>

        {todos.some(todo => todo.completed) && (
          <button onClick={clearCompleted} className="clear-button">
            Clear completed
          </button>
        )}
      </div>
    </div>
  )
}
