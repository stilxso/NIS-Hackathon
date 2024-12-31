import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopilotProvider, CopilotChat } from '@copilotjs/react';
import axios from 'axios';
import '@copilotjs/styles/default.css';

export default function Ai({ data }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.REACT_APP_EMAIL_API || 'http://localhost:3030/send-email';

  const handleOnMessageCompleted = (message) => {
    if (message?.content) {
      console.log('Received message:', message);
      setResponse(message.content);
      saveToLocalStorage(message.content);
      sendEmail(message.content);
    } else {
      console.error('Invalid message received:', message);
    }
  };

  const saveToLocalStorage = (content) => {
    try {
      if (!content) throw new Error('Empty content cannot be saved');
      const history = JSON.parse(localStorage.getItem('responseHistory')) || [];
      history.push(content);
      localStorage.setItem('responseHistory', JSON.stringify(history));
      console.log('Saved to localStorage:', history);
    } catch (error) {
      console.error('Error saving to localStorage:', error.message);
    }
  };

  const sendEmail = async (content) => {
    try {
      setLoading(true);
      const emailData = {
        to: '',
        subject: 'AI Generated Response',
        text: content,
      };
      const response = await axios.post(API_ENDPOINT, emailData);
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const accidentDetails = `Title: ${data.title}, Agency: ${data.Agency}, Description: ${data.descrip}, Address: ${data.address}`;

  const chatStyle = {
    width: '100%',
    maxWidth: '900px',
    height: '600px',
    margin: 'auto',
  };

  return (
    <div className="copilot-container">
      <h1>Accident Assistance</h1>
      <CopilotProvider
        appId="" //app id
        userId="u"
        companyId="c"
        context={{
          actionTypes:
            'explain accident with provided data. Find level of danger, in what time person will come to this accident. Explain to person what they need to do and what happened. Don’t use markers like ### or **. Provide a simple explanation. User is a government or company handling accidents. Predict possible pollution spreading (its very important), add to title possible pollution. if address starts with "S1A" - it mean water oil pollution',
          onMessageCompleted: handleOnMessageCompleted,
        }}
      >
        <CopilotChat
          style={chatStyle}
          appearance={{
            welcomePrompts: [`Explain accident: ${accidentDetails}`],
          }}
        />
      </CopilotProvider>
      {loading && <p>Sending email...</p>}
      {response && <div className="response-display"><p>Response:</p><p>{response}</p></div>}
    </div>
  );
}

Ai.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    Agency: PropTypes.string.isRequired,
    descrip: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};
