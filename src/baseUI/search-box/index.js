import React, {useRef, useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { debounce } from './../../api/utils';

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style["theme-color"]};
  .icon-back{
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder{
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete{
    font-size: 16px;
    color: ${style["background-color"]};
  }
`

const SearchBox = (props) => {
  const queryRef = useRef();
  const [query, setQuery] = useState('');

  const { newQuery } = props;
  const { handleQuery } = props;
   
  //  useMemo  在子组件渲染的时候  为了避免这段函数重复 渲染 造成没必要的消耗
  // 相当于生命周期 shouldComponentUpdate  只有当某一个变量发生变化的时候
  // 才会渲染那
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 1500);
  }, [handleQuery]);

  // 组件一加载的时候 就取得dom 节点 然后
  useEffect(() => {
    queryRef.current.focus();
  }, []);

  useEffect(() => {
    handleQueryDebounce(query);
    console.log(query,"查看query")
    let historyList =  localStorage.getItem("historySearch");
    console.log(historyList,"新数组")
    if(historyList === null){
      let  history = [];
      history.push(query);
      localStorage.setItem("historySearch",JSON.stringify(history) )
    }else {
        let newhistory= JSON.parse(historyList);
        console.log(newhistory,"查看新数组")
        newhistory.push(query);
        localStorage.setItem("historySearch",JSON.stringify(newhistory) )
    }
    // localStorage.setItem("history",history)
    // eslint-disable-next-line 
  }, [query]);

  useEffect(() => {
    if(newQuery !== query){
      setQuery(newQuery);
    }
    // eslint-disable-next-line
  }, [newQuery]);

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const clearQuery = () => {
    setQuery('');
    queryRef.current.focus();
  }
  
  const displayStyle = query ? {display: 'block'}: {display: 'none'};

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
};

export default React.memo(SearchBox);