import React, { useState } from 'react'

const HappyForm = (props) => {
  //Message state to save message to send to the backend:
  const MESSAGES_URL = "https://happy-thoughts-technigo.herokuapp.com/thoughts";
  //In the lecture from previous it is another url without thoughts in the end? 
  const [message, setMessage] = useState(""); //default: empty string
  
  // A submit-function that POSTs the text-field (that handles the submission) & 
  //sends the text-field to the backend as a new message
  const handleSubmit = event => {
    event.preventDefault();
    //Send a POST request using the 'message' state
    fetch(MESSAGES_URL, 
      {
        method: "POST",
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({message: message})
      })
      .then(() => {
      //Refresh on clicking submit-button (to get the new message to show). 
      //This will make both components re-render:
      //window.location.reload(); removed this and added from Jennies code:
      setMessage("") //resets the textbox to be empty after submit
      props.onFormSubmit(message)
      })
      .catch(err => console.log("error", err))
  };

  return (
    <form className="happy-form"> 
    
      <h3>Post a happy thought!</h3>
      <textarea
        rows="3"
        value={message}
        onChange={event => setMessage(event.target.value)}
      >
      </textarea>
      <div className="form-footer"> 
        <button
          type="submit"
          onClick={handleSubmit} //Why not onSubmit? Difference?
          disabled={message.length < 6 || message.length > 140 ? true : false}
          className="input-button"
          value="Add Message"
        >
          Send a happy thought!
        </button>
        <p>{message.length} / 140</p>
      </div>
    </form>
  )
};
export default HappyForm;