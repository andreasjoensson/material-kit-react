import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const userMessage = { user: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    axios
      .post('http://localhost:5000/chat', { message })
      .then((response) => {
        console.log('response', response.data);
        const botMessage = { bot: response.data.response ? response.data.response.message : response.data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => console.error('Error:', error));

    setMessage('');
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
      {messages.map((message, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {message.user ? `User: ${message.user}` : `Bot: ${message.bot}`}
        </Typography>
      ))}
      <Box sx={{ display: 'flex', marginTop: '16px' }}>
        <TextField
          id="outlined-basic"
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;
