import React, { useState } from "react";

interface SendMessageFormProps {
    onSendMessage: (message: string) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type your message..." 
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
            />
            <button 
                type="submit" 
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                Send
            </button>
        </form>
    );
};

export default SendMessageForm;