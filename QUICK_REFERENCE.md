# Quick Reference: Dashboard Development Cheat Sheet

## 1. COMPONENT STRUCTURE TEMPLATE

```javascript
import React, { useState, useEffect } from 'react'

const ComponentName = ({ prop1, prop2 }) => {
  // 1. State
  const [state, setState] = useState(null)

  // 2. Effects
  useEffect(() => {
    // Setup or data fetching
  }, []) // Dependencies

  // 3. Handlers
  const handleClick = () => {
    // Logic
  }

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

---

## 2. COMMON PATTERNS

### Fetching Data in Custom Hook
```javascript
export const useData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

### Conditional Rendering
```javascript
if (loading) return <Spinner />
if (error) return <Error error={error} />
if (!data) return <Empty />

return <Content data={data} />
```

### Transforming Data
```javascript
const transformed = data?.map(item => ({
  ...item,
  display: formatValue(item.value)
})) || []
```

### Responsive Tailwind Classes
```javascript
<div className="
  grid-cols-1      // Mobile: 1 column
  md:grid-cols-2   // Tablet: 2 columns
  lg:grid-cols-4   // Desktop: 4 columns
  gap-6            // Space between items
">
```

---

## 3. DATA PATTERNS

### API Response Structure
```javascript
{
  metric: {
    today: number,
    yesterday: number,
    last_week: number,
    last_month: number
  }
}
```

### Component Data Format
```javascript
{
  title: string,
  value: number,
  trend: number,
  color: string
}
```

### Chart Data Format
```javascript
[
  { name: 'Category', value1: 100, value2: 200 },
  { name: 'Category', value1: 150, value2: 250 }
]
```

---

## 4. STYLING QUICK REFERENCE

### Flexbox
```javascript
<div className="flex items-center justify-between gap-4">
  {/* Horizontal, centered vertically, space between */}
</div>
```

### Grid
```javascript
<div className="grid grid-cols-3 gap-4">
  {/* 3 equal columns with 16px gap */}
</div>
```

### Responsive
```javascript
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>
```

### Colors
```javascript
// Tailwind color scale (50-950)
bg-blue-50    // Very light
bg-blue-500   // Medium
bg-blue-900   // Very dark
```

### States
```javascript
hover:bg-blue-600      // On hover
focus:ring-2           // On focus
disabled:opacity-50    // When disabled
dark:bg-gray-900       // Dark mode
```

---

## 5. HOOKS REFERENCE

### useState
```javascript
const [count, setCount] = useState(0)
setCount(count + 1)           // Update
setCount(prev => prev + 1)    // Functional update
```

### useEffect
```javascript
useEffect(() => {}, [])              // Run once on mount
useEffect(() => {}, [dependency])    // Run when dependency changes
useEffect(() => { return cleanup }) // Cleanup function
```

### useContext
```javascript
const value = useContext(MyContext)  // Get context value
```

### useCallback
```javascript
const memoized = useCallback(() => {}, [deps])  // Cache function
```

### useMemo
```javascript
const memoized = useMemo(() => expensiveCalc(), [deps])
```

---

## 6. COMMON ERRORS & FIXES

### Error: "Cannot read property 'map' of undefined"
```javascript
// ❌ WRONG
data.map(item => ...)

// ✅ CORRECT
data?.map(item => ...) || []
```

### Error: "Infinite loop"
```javascript
// ❌ WRONG
useEffect(() => {
  setState(data)
  // Missing dependency array
})

// ✅ CORRECT
useEffect(() => {
  setState(data)
}, [data])
```

### Error: "Missing dependency"
```javascript
// ❌ WRONG
useEffect(() => {
  console.log(prop)
}, [])  // prop is missing

// ✅ CORRECT
useEffect(() => {
  console.log(prop)
}, [prop])
```

---

## 7. DEBUGGING CHECKLIST

- [ ] Check browser console for errors
- [ ] Use `console.log()` to inspect values
- [ ] Open React DevTools (Chrome extension)
- [ ] Check Network tab for API calls
- [ ] Verify component names match imports
- [ ] Check CSS classes are correct
- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Check data structure matches expectations

---

## 8. PERFORMANCE TIPS

```javascript
// Memoize expensive components
const Component = React.memo(({ data }) => ...)

// Memoize functions
const handleClick = useCallback(() => {}, [])

// Memoize calculations
const total = useMemo(() => calculate(data), [data])

// Code split pages
const Page = lazy(() => import('./Page'))

// Avoid unnecessary renders
useEffect(() => {
  // Only run when needed
}, [specificDependency])
```

---

## 9. FILE NAMING CONVENTIONS

```
Components/
  StatsCard.jsx         // PascalCase for components
  Navbar.jsx

Pages/
  Dashboard.jsx
  Analytics.jsx

hooks/
  useDashboardData.js   // camelCase with 'use' prefix

utils/
  dataTransformers.js   // camelCase for utilities

Context/
  DashboardContext.jsx  // PascalCase for context
```

---

## 10. TESTING TEMPLATE

```javascript
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('renders correctly', () => {
  render(<Component prop="value" />)
  expect(screen.getByText('text')).toBeInTheDocument()
})
```

---

## 11. DEPLOYMENT CHECKLIST

- [ ] Remove `console.log()` statements
- [ ] Check for warnings in build
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Update API endpoints for production
- [ ] Add environment variables
- [ ] Build and test: `npm run build`

---

## 12. NPM COMMANDS

```bash
# Setup
npm create vite@latest my-app -- --template react
npm install                    # Install dependencies
npm install axios recharts     # Add packages
npm uninstall package-name     # Remove packages

# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview               # Preview build locally
npm run lint                  # Run linter

# Maintenance
npm update                    # Update dependencies
npm audit                     # Check for vulnerabilities
npm audit fix                 # Fix vulnerabilities
```

---

## 13. GIT COMMANDS

```bash
git init                      # Initialize repo
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push                      # Push to remote
git pull                      # Pull from remote
git status                    # Check status
git log                       # View history
```

---

## 14. ENVIRONMENT VARIABLES

**File: `.env`**
```
VITE_API_URL=http://localhost:5678
VITE_API_KEY=your-key-here
```

**Usage in Code:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 15. COMMON LIBRARIES

```bash
# UI Components
npm install recharts           # Charts
npm install lucide-react       # Icons
npm install framer-motion      # Animations

# State Management
npm install zustand            # Simple state
npm install redux              # Complex state

# Forms
npm install react-hook-form    # Form handling
npm install zod                # Validation

# HTTP
npm install axios              # API calls
npm install swr                # Data fetching

# Styling
npm install tailwindcss        # Utility CSS
npm install classnames         # Conditional classes

# Routing
npm install react-router-dom   # Navigation
```

---

## 16. QUICK WINS FOR BETTER DASHBOARDS

✅ Add loading skeletons  
✅ Add data refresh button  
✅ Add export to CSV  
✅ Add date range filters  
✅ Add search functionality  
✅ Add sorting to tables  
✅ Add pagination  
✅ Add tooltips to charts  
✅ Add dark mode  
✅ Add keyboard shortcuts  

---

## 17. MENTAL MODEL: DATA FLOW

```
User Action (click, input)
    ↓
Event Handler
    ↓
Update State/Context
    ↓
Component Re-renders
    ↓
DOM Updates
    ↓
Visual Change
```

---

## 18. MENTAL MODEL: COMPONENT HIERARCHY

```
App (Root)
  ├── Layout
  │   ├── Navbar
  │   ├── Topbar
  │   └── Main
  │       └── Dashboard
  │           ├── StatsCard
  │           ├── Chart
  │           └── Table
```

---

## 19. QUICK START COMMAND

```bash
# Create full project
npm create vite@latest dashboard -- --template react
cd dashboard
npm install axios react-router-dom recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

---

## 20. COMMON QUESTIONS ANSWERED

**Q: Should I use Redux or Context?**
A: Use Context for small-medium apps, Redux for large apps

**Q: How do I prevent infinite loops?**
A: Always include dependency array in useEffect

**Q: How do I handle errors?**
A: Try-catch in async, error state in component, error boundary for crashes

**Q: How do I improve performance?**
A: Use memo, useCallback, useMemo, lazy loading, code splitting

**Q: How do I style conditionally?**
A: Use ternary operators or className library

**Q: How do I fetch data?**
A: Use custom hook with useEffect, axios/fetch

---

This is your go-to reference! Bookmark it. 📌
