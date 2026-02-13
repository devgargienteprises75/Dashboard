import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const TransportRegData = createContext()

const TransportReg = ({ children }) => {

    const [transportRegData, setTransportRegData] = useState(null)
    const [cerData, setCerData] = useState(null)
    const [gfgData, setGfgData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [timePeriod, setTimePeriod] = useState('today')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await Promise.all([
                    axios.get(import.meta.env.VITE_TRANSPORT_REG_URL),
                    axios.get(import.meta.env.VITE_CER_URL),
                    axios.get(import.meta.env.VITE_GFG_DATA)
                ])
                setTransportRegData(response[0].data)
                setCerData(response[1].data)
                setGfgData(response[2].data)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <TransportRegData.Provider value={{ 
            transportRegData, 
            cerData, 
            gfgData, 
            loading, 
            error, 
            timePeriod, 
            setTimePeriod 
        }}>
            {children}
        </TransportRegData.Provider>
    )
}

export default TransportReg