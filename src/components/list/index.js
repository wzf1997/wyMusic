import React from 'react';
import { 
  ListWrapper,
  ListItem,
  List
} from './style';
import LazyLoad from "react-lazyload";
import { getCount } from "../../api/utils";
import { withRouter } from 'react-router-dom';

function RecommendList(props) {

  //recommend 路由下 有一个子组件  在子组件里面跳转  
  //  子组件是拿不到路由对象的  一种情况下 是有父组件传过来 
  //  另一种方式是 将子组件 用 withRouter包裹也可以拿到 路由对象
  //  子路由对应一个组件  react  子路由其实在当前路由下的dom 增加了一个节点 
  const enterDetail = (id) => {
    props.history.push(`/recommend/${id}`);
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单      >></h1>
      <List>
        {
          props.recommendList.map(item => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <LazyLoad placeholder={<img width="50%" height="50%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  );
  }
 
export default React.memo(withRouter(RecommendList));