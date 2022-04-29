import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function QuoteCarosel({ quotes, index, gameOver }) {
  return (
    <Carousel selectedItem={index}>
      {quotes.map((item, i) => {
        return (
          <Wrapper key={i}>
            <QuoteWrapper>{item.quote}</QuoteWrapper>
          </Wrapper>
        );
      })}
    </Carousel>
  );
}

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  width: 100%;

  min-height: 30vh;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const QuoteWrapper = styled.div`
  max-width: 330px;
  padding: 20px;
  color: white;
  font: 16px/1.5em "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// function Quote({ quote, visable }) {
//   const transitions = useTransition(visable, {
//     from: { opacity: 1 },
//     enter: { opacity: 1, transform: "translate3d(10,0,0)" },
//     leave: { opacity: 0, transform: "translate3d(0,0,0)" },
//     delay: 50,
//   });
//   return transitions(
//     (styles, item) =>
//       item && <animated.div style={styles}>{quote.text}</animated.div>
//   );
// }
