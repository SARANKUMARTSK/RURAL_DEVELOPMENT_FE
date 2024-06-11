import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Conversation from './Conversation';
import TopBar from '../../../components/TopBar';
import Message from './Message';
import { API_URL } from '../../../App';
import { useNavigate } from 'react-router-dom';

function ChatSupport() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef();
   const navigate = useNavigate()
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/conversation/${userId}`);
        setConversations(res.data.conversation);
      } catch (error) {
        console.error(error);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(`${API_URL}/message/${currentChat._id}`);
          setMessages(res.data.messages);
        } catch (error) {
          console.error(error);
          setError('Failed to load messages');
        }
      }
    };
    getMessages();
  }, [currentChat,messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post(`${API_URL}/message`, message);
      setMessages([...messages, res.data.message]);
      setNewMessage('');
    } catch (error) {
      console.error(error);
      setError('Failed to send message');
    }
  };

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {loading ? (
              <p>Loading...</p>
            ) : (
              conversations.map((conversation, index) => (
                <div key={index} onClick={() => setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} />
                </div>
              ))
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message message={message} own={message.sender === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start a chat.</span>
            )}
          </div>
        </div>
      </div>
      <nav className='button-end'>
        <button onClick={()=>navigate('/landing-page')}>Home</button>
      </nav>
    </>
  );
}

export default ChatSupport;
