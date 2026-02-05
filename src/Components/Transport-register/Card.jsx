import React from 'react'


const Card = ({ title, value, index = 0}) => {
  return (
    <div className={`h-40 w-[15vw] flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]`}>
      <h1 className='text-xl font-extrabold text-center uppercase mb-3 text-[#444] tracking-wider'>{title}</h1>
      <h2 className='text-5xl font-extrabold text-[#444] tracking-tight drop-shadow-lg'>{value ?? 0}</h2>
    </div>
  )
}

export default Card