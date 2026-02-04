import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const TransportRegData = createContext()

const TransportReg = ({ children }) => {

    const [ transportRegData, setTransportRegData ] = useState(null)
    const [ cerData, setCerData ] = useState(null)
    const [ loading, setLoading ] = useState(null)
    const [ error, setError ] = useState(null)
    const [timePeriod, setTimePeriod] = useState('today')

    useEffect(() => {
         const fetchData = async () => {
            try {
                const response = await Promise.all([
                    axios.get("http://localhost:5678/webhook/get-sheet-data"),
                    axios.get("http://localhost:5678/webhook/get-sheet-data-cer")
                ])
                console.log(response[1].data);
                setTransportRegData(response[0].data)
                setCerData(response[1].data)
            } catch (err) {
                setError(err.message)
            }
        }
        fetchData()
    }, [])
  return (
    <TransportRegData.Provider value={{ transportRegData, cerData, loading, error, timePeriod, setTimePeriod }}>
        {children}
    </TransportRegData.Provider>
  )
}

export default TransportReg