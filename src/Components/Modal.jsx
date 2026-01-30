import React from 'react'

const Modal = ({ data, taskId }) => {
    
    const pending_details = data && data[0]?.pending_details
    const allPendingItems = []

    data && Object.entries(pending_details).map(([category, items]) => {
        return Array.isArray(items) && items.length > 0 &&
            items.map((item, idx) => {
                allPendingItems.push({
                    id: `${category}:- ${idx+1}`,
                    category: category.replace('_', '').toUpperCase(),
                    description: item
                })
            })
    })

    console.log(allPendingItems);
    
  return (
    <div className='h-96 w-200 bg-amber-200 absolute z-99 rounded-lg left-[50%] top-[50%] transform translate-[-50%]'>
        {allPendingItems.map((items) => {
            return <p>{items.id}</p>
        })}
    </div>
  )
}

export default Modal;