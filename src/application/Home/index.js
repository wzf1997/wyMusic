import React from 'react';
import { renderRoutes } from "react-router-config";
import {
  Top,
  Tab,
  TabItem,
} from './style';
import Player from "../Player"
import { NavLink } from 'react-router-dom';//利用NavLink组件进行路由跳转

function Home(props){
  const { route } = props;
  return (
    <div>
      <Top>
        <image src={require('./logo.jpg')}></image>
        <span className="title">良晤音乐</span>
        <span className="green"> 护眼模式</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
        <NavLink to="/search" activeClassName="selected"><TabItem><span>搜索</span></TabItem></NavLink>
      </Tab>
      { renderRoutes(route.routes) }
      <Player></Player>
    </div>
  );
}
 
export default React.memo(Home);