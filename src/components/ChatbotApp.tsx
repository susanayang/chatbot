'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ChatbotApp.module.css';

// Declare the external Chatbot
declare global {
  interface Window {
    Chatbot: {
      getResponseAsync: (message: string) => Promise<string>;
    };
  }
}

interface ChatMessage {
  message: string | React.JSX.Element;
  sender: 'user' | 'robot';
  id: string;
}

function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function ChatInput({ chatMessages, setChatMessages }: {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function keyboardShortcuts(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);
    const newChatMessages: ChatMessage[] = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setInputText('');
    setChatMessages([
      ...newChatMessages,
      {
        message: <Image
          src="/loading-spinner.gif"
          className={styles.loadingImage}
          alt="Loading"
          width={40}
          height={40}
        />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    try {
      const response = await window.Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } catch {
      setChatMessages([
        ...newChatMessages,
        {
          message: 'Sorry, I encountered an error.',
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.chatInputContainer}>
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={keyboardShortcuts}
        className={styles.chatInput}
      />
      <button
        onClick={sendMessage}
        className={styles.sendButton}
      >
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }: { message: string | React.JSX.Element; sender: 'user' | 'robot' }) {
  return (
    <div className={
      sender === 'user'
        ? styles.chatMessageUser
        : styles.chatMessageRobot
    }>
      {sender === 'robot' && (
        <Image src="/robot.png"
          className={styles.chatMessageProfile}
          alt="Robot"
          width={45}
          height={45}
        />
      )}
      <div className={styles.chatMessageText}>
        {message}
      </div>
      {sender === 'user' && (
        <Image src="/user.png"
          className={styles.chatMessageProfile}
          alt="User"
          width={45}
          height={45}
        />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }: { chatMessages: ChatMessage[] }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div
      className={styles.chatMessagesContainer}
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      ))}
    </div>
  );
}

export default function ChatbotApp() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  return (
    <div className={styles.appContainer}>
      {chatMessages.length === 0 && (
        <p className={styles.welcomeMessage}>
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}