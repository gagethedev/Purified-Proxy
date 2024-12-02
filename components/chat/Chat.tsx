import { Send } from 'lucide-react'
import io from 'socket.io-client'

const socket = io()

type Message = {
    id: number
    text: string
    isSent: boolean
    timestamp?: number
    author: string
}

const messages: Message[] = [
    { id: 1, text: "blah blah blah", isSent: false, timestamp: 1733089909486 - 75000, author: "gfd" },
    { id: 2, text: "blah blah blah blah blah blah", isSent: true, timestamp: 1733089909486 - 100000, author: "Gage" },
    { id: 3, text: "blah blah blah blah blah blah blah blah blah", isSent: false, timestamp: 1733089909486 - 125000, author: "dfs" },
    { id: 4, text: "blah blah blah blah blah blah blah blah blah blah blah blah", isSent: true, timestamp: 1733089909486 - 159000, author: "Gage" },
]

const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    if (hours < 13) {
        return `${hours}:${date.getMinutes()} AM`
    } else {
        return `${hours - 12}:${date.getMinutes()} PM`
    }
}

export default function Chat() {
    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] w-100 mx-auto">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md rounded-lg relative flex flex-col ${message.isSent
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            <p className={"p-3 pb-0"}>{message.text}</p>
                            {message.isSent ? (
                                <div className="flex justify-between">
                                    <span className={`text-xs p-1 text-blue-200 pl-3`}>
                                        {formatTime(message.timestamp || 0)}
                                    </span>
                                    <span className={`text-xs p-1 text-blue-200 pr-3`}>
                                        {message.author}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <span className={`text-xs p-1 text-gray-500 pl-3`}>
                                        {message.author}
                                    </span>
                                    <span className={`text-xs p-1 text-gray-500 pr-3`}>
                                        {formatTime(message.timestamp || 0)}
                                    </span>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        socket.emit("NewChat", {
                            message: (document.getElementById("ChatInput")! as HTMLInputElement).value,
                            token: localStorage.getItem("token"),
                        })
                    }}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

