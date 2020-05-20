import React from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
const FooterContainer = styled.div`
  position: fixed;
  bottom:0
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style["font-color-light"]};
  background:black;
  &>a{
      margin-left:auto;
      margin-right:10px;
  }
`
export default  function Footer(){

    return   <FooterContainer>
       <span>良晤： 取自今日良晤，豪兴不浅，以乐会友</span>
       <a>欢迎来我的网站</a>
    </FooterContainer>
}