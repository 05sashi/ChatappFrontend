import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'This is a received message', time: '02:58 PM' },
    { type: 'sent', text: 'This is a sent message', time: '02:59 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage !== '') {
      setMessages([
        ...messages,
        { type: 'sent', text: newMessage, time: getCurrentTime() },
      ]);
      setNewMessage('');
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} PM`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 720);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {!isMobileView && (
        <div className="bg-red-600 w-1/5 h-screen hidden md:block"></div>
      )}
      <div className={`flex flex-col w-full ${!isMobileView ? 'md:w-4/5' : ''}`}>
        <div className="py-3 text-center">
          22BCE1511
        </div>
        <div className="flex-grow bg-slate-100 p-4 flex flex-col-reverse overflow-y-auto">
          <div ref={messagesEndRef}></div>
          {messages.slice().reverse().map((message, index) => (
              <div className={`my-2 p-3 rounded-lg max-w-[60%] ${message.type === 'received' ? 'bg-green-200 self-start ml-0' : 'bg-blue-200 self-end ml-auto'}`} style={{ wordWrap: 'break-word' }}>
                <p>{message.text}</p>
                <p className="text-sm">{message.time}</p>
              </div>
            ))}
        </div>
        <div className="bg-gray-200 flex items-center">
          <input type="text" className="flex-grow px-2 py-3 rounded-md border border-gray-400" placeholder="Type your message" value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}/>
          <button className="bg-blue-500 text-white px-4 py-3 rounded-md ml-2" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;