import React, { useState } from "react";
import styled from "styled-components";
export default function Input({ handleAnswer }) {
  const [input, setInput] = useState("");
  const inputFunc = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  return (
    <Wrapper>
      <ButtonSuggestion for="bookTitle">guess the book</ButtonSuggestion>
      <InputBox
        onChange={inputFunc}
        type={"text"}
        name={"bookTitle"}
        placeholder={"Book Title"}
        value={input}
      ></InputBox>
      <ButtonWrapper>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setInput("");
            handleAnswer("Skip");
          }}
        >
          Skip
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setInput("");
            handleAnswer(input || "Skip");
          }}
        >
          Guess
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const InputBox = styled.input`
  width: 70%;

  @media (min-width: 440px) {
    margin-right: 15vw;
    margin-left: 15vw;
  }

  border: 1px solid rgba(16, 23, 42, 0.9);
  align-self: center;
  background-color: whitesmoke;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  :focus {
    border: 1px solid rgb(170, 131, 81);
  }
`;

const Button = styled.button`
  background-color: rgba(4, 14, 28, 1);
  border: 3px solid rgba(200, 23, 42, 1);
  width: 150px;
  height: 50px;
  color: white;
  border: 1px solid transparent;
  font-size: 16px;
  border-radius: 10px;
  :active {
    background-color: rgba(16, 23, 42, 1);
    border: 3px solid rgba(16, 23, 42, 0.5);
  }
`;

const ButtonWrapper = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    width: 100%;
    height: 100%;
    padding 20px;
   
`;

const ButtonSuggestion = styled.label`
  font-size: 14px;
  color: white;
  flex-grow: 1;
  text-align: center;
  :before {
    position: relative;
    color: red;
    content: "* ";
    top: 9px;
    font-size: 20px;
    font-family: arial;
  }
`;
