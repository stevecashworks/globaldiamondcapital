import React from "react";
import styled from "styled-components";

const FeedbackSection = styled.div`
  padding: 60px 20px;
  background-color: #f9f9f9;
  .container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #2c3e50;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  .btn-primary {
    padding: 10px 20px;
    background-color: #1abc9c;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  .btn-primary:hover {
    background-color: #16a085;
  }
`;

const FeedbackForm = () => {
  return (
    <FeedbackSection>
      <div className="container">
        <h1>Send Us Your Feedback</h1>
        <form className="main-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Phone number"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="6"
              placeholder="Your feedback"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Submit Feedback
          </button>
        </form>
      </div>
    </FeedbackSection>
  );
};

export default FeedbackForm;
