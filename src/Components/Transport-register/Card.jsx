import React from 'react'


const Card = ({ title, value, index = 0}) => {
  return (
    <div className={`min-h-32 w-full flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-white p-4 sm:p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]`}>
      <h1 className='text-base sm:text-lg lg:text-xl font-extrabold text-center uppercase mb-3 text-[#444] tracking-wider'>{title}</h1>
      <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#444] tracking-tight drop-shadow-lg'>{value ?? 0}</h2>
    </div>
  )
}

export default Card
