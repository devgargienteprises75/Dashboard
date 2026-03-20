import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const TransportRegData = createContext()

const TransportReg = ({ children }) => {

    const [transportRegData, setTransportRegData] = useState(null)
    const [cerData, setCerData] = useState(null)
    const [gfgData, setGfgData] = useState(null)
    const [servicingData, setServicingData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [timePeriod, setTimePeriod] = useState('today')

    // Helper function to get API URL
    const getApiUrl = (endpoint) => {
        // Use relative URL for development (proxied by Vite)
        // Use full URL for production
        if (import.meta.env.DEV) {
            return `${endpoint}`
        } else {
            // For production, use the full N8N URL (you may need to configure CORS on the backend)
            return `https://n8n-dashboard-workflow.onrender.com${endpoint}`
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // Define your endpoints
                const endpoints = {
                    transport: '/webhook/get-sheet-data',
                    cer: '/webhook/get-sheet-data-cer',
                    gfg: '/webhook/get-gfg-data',
                    service: '/webhook/get-service-data'
                }
                
                // Create array of promises
                const promises = [
                    axios.get(getApiUrl(endpoints.transport)),
                    axios.get(getApiUrl(endpoints.cer)),
                    axios.get(getApiUrl(endpoints.gfg)),
                    axios.get(getApiUrl(endpoints.service))
                ]
                
                const response = await Promise.all(promises)
                
                setTransportRegData(response[0].data)
                setCerData(response[1].data)
                setGfgData(response[2].data)
                setServicingData(response[3].data)
                
                console.log('Transport Data:', response[0].data)
                console.log('CER Data:', response[1].data)
                console.log('GFG Data:', response[2].data)
                console.log('Service Data:', response[3].data)
                
            } catch (err) {
                setError(err.message)
                console.error( 'Error fetching data:', err)
                
                // Log more details about the error
                if (err.response) {
                    console.error('Response status:', err.response.status)
                    console.error('Response data:', err.response.data)
                } else if (err.request) {
                    console.error('No response received')
                }
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [])

    // Retry function
    const retryFetch = async () => {
        setLoading(true)
        setError(null)
        try {
            const endpoints = {
                transport: '/webhook/get-sheet-data',
                cer: '/webhook/get-sheet-data-cer',
                gfg: '/webhook/get-gfg-data',
                service: '/webhook/get-service-data'
            }
            
            const promises = [
                axios.get(getApiUrl(endpoints.transport), { timeout: 30000 }),
                axios.get(getApiUrl(endpoints.cer), { timeout: 30000 }),
                axios.get(getApiUrl(endpoints.gfg), { timeout: 30000 }),
                axios.get(getApiUrl(endpoints.service), { timeout: 30000 })
            ]
            
            const response = await Promise.all(promises)
            
            setTransportRegData(response[0].data)
            setCerData(response[1].data)
            setGfgData(response[2].data)
            setServicingData(response[3].data)
            
            console.log('Retry successful')
            
        } catch (err) {
            setError(err.message)
            console.error('Retry failed:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <TransportRegData.Provider value={{ 
            transportRegData, 
            cerData, 
            gfgData, 
            servicingData,
            loading, 
            error, 
            timePeriod, 
            setTimePeriod,
            retryFetch
        }}>
            {children}
        </TransportRegData.Provider>
    )
}

export default TransportReg