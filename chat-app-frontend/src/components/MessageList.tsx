// src/components/MessageList.tsx
import React from 'react';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
    <div>
      {messages.map((message, index) => (
          <div 
          key={index}
          style={{
            display: 'flex',
            justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
            marginBottom: '10px',
          }}
          >
            <div 
                style={{
                    maxWidth: '60%',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: message.sender === 'me' ? '#DCF8C6' : '#FFF',
                    border: message.sender === 'me' ? '1px solid #DCF8C6' : '1px solid #FFF',
                    textAlign: message.sender === 'me' ? 'right' : 'left',
                }}
            >
                {message.text}
            </div>
            
    </div>
      ))}
    </div>
);

export default MessageList;
