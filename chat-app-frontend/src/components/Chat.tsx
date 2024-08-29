// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { io, Socket } from 'socket.io-client'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

const socket: Socket = io('http://192.168.0.104:4000');

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('message', (message: Message) => {
        if (message.sender !== socket.id) {
            setMessages((prevMessages) => [...prevMessages, {...message, sender: 'other'}]);
        }
	});

	return () => {
	    socket.off('message');
	}
    }, []);

    const sendMessageHandler = (text: string) => {
        const message: Message = { id: uuidv4(), text, sender: 'me'}
        setMessages((prevMessages) => [...prevMessages, message]);
        socket.emit('message', message);
    }

    return (
       <div>
         <MessageList messages={messages} />
         <SendMessageForm onSendMessage={sendMessageHandler} />
       </div> 
    )
}

export default Chat;
