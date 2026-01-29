import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const TransportRegData = createContext()

const TransportReg = ({ children }) => {

    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(null)
    const [ error, setError ] = useState(null)
    const [timePeriod, setTimePeriod] = useState('today')

    useEffect(() => {
         const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:5678/webhook/get-sheet-data")
                setData(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchData()
    }, [])

  return (
    <TransportRegData.Provider value={{ data, loading, error, timePeriod, setTimePeriod }}>
        {children}
    </TransportRegData.Provider>
  )
}

export default TransportReg