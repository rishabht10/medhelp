import React, { useState } from 'react'
import "./Medio.css"
import {marked} from 'marked'
import Navbar from './Navbar'
import Acc from "./Acc.js"

const Medio = () => {

    

    async function sendMessage() {
        
        const input = document.getElementById('userInput').value;
        const responseDiv = document.getElementById('response');
        if (!input) {
            responseDiv.innerHTML = 'Please enter a message.';
            return;
        }
        responseDiv.innerHTML = 'Loading...';
        try {
            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer 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',
                        'HTTP-Referer': 'https://www.sitename.com',
                        'X-Title': 'SiteName',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'deepseek/deepseek-r1:free',
                        messages: [{ role: 'user', content: input }],
                    }),
                },
            );
            const data = await response.json();
            console.log(data);
            const markdownText =
                data.choices?.[0]?.message?.content || 'No response received.';
            responseDiv.innerHTML = marked.parse(markdownText);
        } catch (error) {
            responseDiv.innerHTML = 'Error: ' + error.message;
        }
    }
  return (
    <>
    <Navbar></Navbar>
    <div className='custcontainer'>
      <div className="container custstyle">
			<h2>Ask Medio ^^</h2>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					id="userInput"
					placeholder="Enter your question" />
			</div>
			<button className="btn btn-success " id='buttonIn' onClick={sendMessage}>Ask!</button>
			<div id="response">Response will show up here</div>
            <div className="faq">
      <h1>FAQs</h1>
      <Acc></Acc>
    </div>
		</div>
    </div>

    
    </>
  )
}

export default Medio
