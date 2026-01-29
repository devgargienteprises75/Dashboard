# Practical Examples: Building Dashboard Components Step-by-Step

## EXAMPLE 1: Creating a Custom Data Fetching Hook

### Problem:
Multiple components need the same data. Repeating fetch code in each component is messy.

### Solution:
Create a reusable hook that handles data fetching logic.

### Step-by-Step:

**Step 1: Create the hook file**
```javascript
// hooks/useDashboardData.js

import { useEffect, useState } from 'react'
import axios from 'axios'

export const useDashboardData = () => {
  // 1. Define state variables
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2. Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API request
        const response = await axios.get(
          'http://localhost:5678/webhook/get-sheet-data'
        )
        // Store the data
        setData(response.data)
      } catch (err) {
        // Handle errors
        setError(err.message)
      } finally {
        // Always set loading to false when done
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty array = runs only once on mount

  // 3. Return state for components to use
  return { data, loading, error }
}
```

**Step 2: Use the hook in a component**
```javascript
// Pages/Dashboard.jsx

import { useDashboardData } from '../hooks/useDashboardData'

const Dashboard = () => {
  // Get data from hook
  const { data, loading, error } = useDashboardData()

  // Handle states
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  // Use data
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bills: {data[0]?.bills_received?.today}</p>
    </div>
  )
}

export default Dashboard
```

### Key Concepts:
- **useState**: Holds data, loading, error states
- **useEffect**: Runs code when component mounts
- **Dependency array `[]`**: Means "run once on mount"
- **Return object**: Provides access to states

### Why This Works:
✅ Logic is separated from UI  
✅ Can reuse hook in multiple components  
✅ Easy to test  
✅ Changes to API call only need update in one place  

---

## EXAMPLE 2: Building a Reusable Stats Card Component

### Problem:
Dashboard has multiple stat cards with different data. Hardcoding each card is repetitive.

### Solution:
Create one component that accepts different props.

### Step-by-Step:

**Step 1: Design the component**
```javascript
// Components/StatsCard.jsx

import React from 'react'
import { TrendingUp } from 'lucide-react' // Icon library

const StatsCard = ({ 
  title,           // "Bills Received"
  value,           // 42
  icon,            // React component
  trend,           // "+15%"
  color = 'blue'   // Default color
}) => {
  // Define colors
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      {/* Top section: Icon + Title + Value */}
      <div className='flex items-start justify-between mb-4'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>{title}</p>
          <h3 className='text-3xl font-bold text-gray-900 mt-2'>
            {value}
          </h3>
        </div>
        
        {/* Icon badge */}
        {icon && (
          <div className={`${colorClasses[color]} p-3 rounded-lg`}>
            {React.createElement(icon, { size: 24 })}
          </div>
        )}
      </div>

      {/* Bottom section: Trend */}
      <div className='flex items-center gap-2 text-sm'>
        <TrendingUp size={16} className='text-green-500' />
        <span className='text-green-500 font-medium'>{trend}</span>
        <span className='text-gray-500'>than last week</span>
      </div>
    </div>
  )
}

export default StatsCard
```

**Step 2: Use the component with different data**
```javascript
// Pages/Dashboard.jsx

import StatsCard from '../Components/StatsCard'
import { DollarSign, Users, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {/* Card 1 */}
      <StatsCard 
        title="Total Revenue" 
        value="$45,231"
        icon={DollarSign}
        trend="+12%"
        color="green"
      />

      {/* Card 2 */}
      <StatsCard 
        title="Active Users" 
        value="1,234"
        icon={Users}
        trend="+8%"
        color="blue"
      />

      {/* Card 3 */}
      <StatsCard 
        title="Growth Rate" 
        value="23%"
        icon={TrendingUp}
        trend="+5%"
        color="orange"
      />
    </div>
  )
}
```

### Key Concepts:
- **Props**: Component configuration from parent
- **Destructuring**: `{ title, value }` extracts props
- **Ternary operator**: `{icon && <div>...</div>}` - renders only if icon exists
- **Default props**: `color = 'blue'` - sets default value
- **Conditional classes**: Different styling based on props

### Why This Works:
✅ One component, infinite variations  
✅ Easy to maintain design consistency  
✅ No code duplication  
✅ Props make it flexible  

---

## EXAMPLE 3: Creating a Context for Global State

### Problem:
Dashboard data needs to be accessible from many components deep in the tree. 
Passing through props gets messy.

### Solution:
Use React Context to provide data globally.

### Step-by-Step:

**Step 1: Create context file**
```javascript
// Context/DashboardContext.jsx

import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// 1. Create context
export const DashboardContext = createContext()

// 2. Create provider component
export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 3. Fetch data once when app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5678/webhook/get-sheet-data'
        )
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 4. Provide data to all children
  return (
    <DashboardContext.Provider value={{ data, loading, error }}>
      {children}
    </DashboardContext.Provider>
  )
}
```

**Step 2: Wrap your app with the provider**
```javascript
// App.jsx

import { DashboardProvider } from './Context/DashboardContext'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}

export default App
```

**Step 3: Use context in any component**
```javascript
// Components/StatsCard.jsx

import { useContext } from 'react'
import { DashboardContext } from '../Context/DashboardContext'

const StatsCard = () => {
  // Get data from context (works anywhere in the app)
  const { data, loading, error } = useContext(DashboardContext)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h3>{data[0]?.bills_received?.today}</h3>
    </div>
  )
}

export default StatsCard
```

### Key Concepts:
- **createContext()**: Creates a context object
- **Provider**: Wraps app to provide data to all children
- **useContext()**: Hook to consume context data anywhere
- **No prop drilling**: Data goes directly from Provider to component

### Data Flow:
```
DashboardProvider (fetches data)
    ↓
<Context.Provider value={data}>
    ↓
Any nested component can call useContext()
    ↓
Component accesses data directly
```

### Why This Works:
✅ Data available everywhere without props  
✅ Single source of truth  
✅ Clean component tree  
✅ Easy to update global state  

---

## EXAMPLE 4: Building a Chart Component with Data Transformation

### Problem:
API returns data in one format, but chart library needs different format.

### Solution:
Transform data in component before passing to chart.

### Step-by-Step:

**Step 1: Understand data formats**
```javascript
// API Response (your format)
{
  bills_received: { today: 10, yesterday: 8, last_week: 12, last_month: 69 },
  mr_created: { today: 5, yesterday: 3, last_week: 2, last_month: 46 }
}

// Chart expects (Recharts format)
[
  { name: 'Today', bills: 10, mr: 5 },
  { name: 'Yesterday', bills: 8, mr: 3 },
  { name: 'Last Week', bills: 12, mr: 2 },
  { name: 'Last Month', bills: 69, mr: 46 }
]
```

**Step 2: Create transformation function**
```javascript
// utils/dataTransformers.js

export const transformTimelineData = (apiData) => {
  if (!apiData) return []
  
  return [
    {
      name: 'Today',
      bills: apiData.bills_received?.today || 0,
      mr: apiData.mr_created?.today || 0
    },
    {
      name: 'Yesterday',
      bills: apiData.bills_received?.yesterday || 0,
      mr: apiData.mr_created?.yesterday || 0
    },
    {
      name: 'Last Week',
      bills: apiData.bills_received?.last_week || 0,
      mr: apiData.mr_created?.last_week || 0
    },
    {
      name: 'Last Month',
      bills: apiData.bills_received?.last_month || 0,
      mr: apiData.mr_created?.last_month || 0
    }
  ]
}
```

**Step 3: Use transformation in component**
```javascript
// Components/TimelineChart.jsx

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { transformTimelineData } from '../utils/dataTransformers'

const TimelineChart = ({ data }) => {
  // Transform raw data into chart format
  const chartData = transformTimelineData(data[0])

  return (
    <div className='bg-white p-6 rounded-lg'>
      <h2 className='text-lg font-bold mb-4'>Process Timeline</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="bills" fill="#FF6B35" />
          <Bar dataKey="mr" fill="#4366FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimelineChart
```

### Key Concepts:
- **Data mapping**: Converting between formats
- **Optional chaining**: `?.` prevents errors if data is missing
- **Default values**: `|| 0` provides fallback if value is undefined
- **Separation**: Transform logic separate from component

### Why This Works:
✅ API can change without breaking components  
✅ Transform logic reusable  
✅ Component stays clean and focused  
✅ Easy to test transformation separately  

---

## EXAMPLE 5: Conditional Rendering Pattern

### Problem:
Component needs to handle loading, error, empty, and success states.

### Solution:
Check state and render appropriate UI for each case.

### Step-by-Step:

**Step 1: Define all possible states**
```javascript
const Dashboard = () => {
  const { data, loading, error } = useDashboardData()

  // State 1: Loading
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        <p className='ml-4'>Loading dashboard...</p>
      </div>
    )
  }

  // State 2: Error
  if (error) {
    return (
      <div className='bg-red-50 p-4 rounded-lg'>
        <h3 className='text-red-800 font-bold'>Error loading data</h3>
        <p className='text-red-600'>{error}</p>
        <button className='mt-4 bg-red-600 text-white px-4 py-2 rounded'>
          Retry
        </button>
      </div>
    )
  }

  // State 3: No data
  if (!data || data.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>No data available</p>
      </div>
    )
  }

  // State 4: Success - render dashboard
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsCard value={data[0].bills_received.today} />
      {/* Rest of dashboard */}
    </div>
  )
}
```

### Key Concepts:
- **Early returns**: Check states and return early
- **Guard clauses**: Each `if` returns before reaching real UI
- **Loading spinner**: Provides feedback to user
- **Error message**: Helps user understand what went wrong
- **Empty state**: Handles case when data exists but is empty

### Why This Works:
✅ Clear flow of logic  
✅ Handles all edge cases  
✅ Better user experience  
✅ Prevents broken UI  

---

## EXAMPLE 6: Responsive Grid Layout

### Problem:
Dashboard looks good on desktop but terrible on mobile.

### Solution:
Use Tailwind grid classes that change based on screen size.

### Step-by-Step:

**Step 1: Create responsive grid**
```javascript
// Pages/Dashboard.jsx

const Dashboard = () => {
  return (
    <div className='p-6'>
      {/* Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatsCard title="Revenue" value="$45K" />
        <StatsCard title="Users" value="1.2K" />
        <StatsCard title="Orders" value="823" />
        <StatsCard title="Growth" value="12.5%" />
      </div>

      {/* Charts section: 1 column on mobile, 2 on desktop */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <TimelineChart />
        <PieChart />
      </div>

      {/* Full width table */}
      <div className='grid grid-cols-1 gap-6'>
        <DataTable />
      </div>
    </div>
  )
}
```

### Key Concepts:
- **Breakpoints**:
  - `grid-cols-1`: Mobile (default)
  - `md:grid-cols-2`: Tablet (768px+)
  - `lg:grid-cols-4`: Desktop (1024px+)
  - `xl:grid-cols-4`: Large desktop (1280px+)

- **Gap**: Space between grid items
- **Responsive order**: Change layout at different sizes

### Mobile-First Approach:
```javascript
// ✅ GOOD: Start with mobile, add desktop
<div className='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

// ❌ AVOID: Start with desktop, try to shrink
<div className='grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
```

### Why This Works:
✅ Works on all screen sizes  
✅ No media queries needed  
✅ Scales automatically  
✅ Mobile users get good experience  

---

## Quick Decision Tree: When to Use What

```
Data needed by multiple components?
├─ YES → Use Context API
└─ NO → Use useState

Need to fetch from API?
├─ YES → Create custom hook
└─ NO → Use direct state

Component needs many variations?
├─ YES → Accept multiple props
└─ NO → Keep it simple

Data needs transformation?
├─ YES → Create utility function
└─ NO → Use directly

Handling multiple states (loading, error, etc)?
├─ YES → Use conditional rendering
└─ NO → Direct JSX
```

---

## Practice Exercises

### Exercise 1: Create Your First Custom Hook
Create a hook that:
- Fetches from your API
- Returns data, loading, error
- Handle errors gracefully

### Exercise 2: Build a Stats Card Clone
Build a card component that:
- Accepts title, value, icon, trend props
- Styles based on props
- Shows colored badges

### Exercise 3: Setup Context
Create context that:
- Provides dashboard data globally
- Updates when API data changes
- Can be accessed from any component

### Exercise 4: Build a Chart
Create chart component that:
- Receives raw API data
- Transforms it for chart
- Displays with Recharts

### Exercise 5: Responsive Dashboard
Create layout that:
- Shows 1 column on mobile
- Shows 2 columns on tablet
- Shows 3-4 columns on desktop

---

## Next Steps

1. Start with a simple component (StatsCard)
2. Add a data fetching hook
3. Setup Context for global data
4. Build more complex components (Charts)
5. Add responsive design
6. Optimize performance
7. Add error handling
8. Deploy to production

Happy learning! 🚀
