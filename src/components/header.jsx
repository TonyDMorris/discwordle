import React from "react";
import styled from "styled-components";
import turtle from "../pictures/android-chrome-512x512.png";
export default function Header() {
  return (
    <Wrapper>
      <LogoFit>
        <Image src={turtle}></Image>
        <Title>DiscWordle</Title>
      </LogoFit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgba(16, 23, 42, 0.9);
  height: 51px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 3px;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: rgb(170, 131, 81);
  border-left: 1px solid rgb(170, 131, 81);
  padding-left: 5px;
  margin-left: 5px;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
`;
const LogoFit = styled.div`
  display: flex;
  border-radius: 10px;
  width: auto;
  height: 100%;
  border: 1px solid rgb(170, 131, 81);
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding-right: 10px;
`;
