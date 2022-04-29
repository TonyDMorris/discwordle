import React from "react";
import styled from "styled-components";
export default function Guesses({ guesses }) {
  return (
    <Wrapper>
      {guesses.map((guess, i) => {
        return (
          <Guess>
            <p key={i}>{guess.slice(0, 25)}</p>
          </Guess>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  height: 100%;
  color: white;
  padding: 5px;
`;

const Guess = styled.div`
  max-height: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  border: 1px solid white;
  color: white;
  padding: 5px;
`;
