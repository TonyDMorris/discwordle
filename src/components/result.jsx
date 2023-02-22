import React from "react";
import styled from "styled-components";
export default function Result({
  imgRef,
  hasLost,
  hasWon,
  book,
  guesses,
}) {
  return (
    <Wrapper>
      <TopBox>
        <div>
          <p>
            {hasWon && "You Won !"}
            {hasLost && "You Lost !"}
            <br />
            it was {book}!
          </p>
          <ShareButton
            onClick={() => {
              navigator.clipboard.writeText(
                convertGuessesToShare(guesses, book)
              );
            }}
          >
            Share
          </ShareButton>
        </div>
      </TopBox>

      <Img src={imgRef} />
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

const Img = styled.img`
  max-width: 70%;
  max-height: 70%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const ShareButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  :active {
    background-color: white;
  }
`;
const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const convertGuessesToShare = (gs, book) => {
  let guesses = gs.map((g) => {
    if (g === "Skip") {
      return "⬜";
    }
    if (g !== book) {
      return "🟥";
    }
    return "🟩";
  });

  const share = "www.discwordle.com \n" + guesses.join("");
  return share;
};

function unescapeHtml(unsafe) {
  return unsafe
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
