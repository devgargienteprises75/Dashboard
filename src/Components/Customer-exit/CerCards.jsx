
import React from 'react'
import { Users, AlertTriangle, List } from 'lucide-react'

const CerCards = ({ cerData, timePeriod = 'today' }) => {

    if (!cerData || !cerData[timePeriod]) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-white rounded-xl h-32 shadow-sm"></div>
                ))}
            </div>
        )
    }

    const currentData = cerData[timePeriod]

    // Calculate metrics
    const totalExits = currentData.reduce((acc, item) => acc + (item.count || 0), 0)

    const topReasonItem = [...currentData].sort((a, b) => (b.count || 0) - (a.count || 0))[0]
    const topReason = topReasonItem ? topReasonItem.name : 'N/A'

    const uniqueReasons = currentData.length

    const cards = [
        {
            title: 'Total Exits',
            value: totalExits,
            icon: Users,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            title: 'Top Reason',
            value: topReason,
            icon: AlertTriangle,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            title: 'Unique Reasons',
            value: uniqueReasons,
            icon: List,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-xl p-6 shadow-sm border ${card.borderColor} hover:shadow-md transition-all duration-300`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 truncate" title={String(card.value)}>
                                {card.value}
                            </h3>
                        </div>
                        <div className={`p-3 rounded-full ${card.bgColor}`}>
                            <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CerCards
