// TODO : useState를 react로 부터 import 합니다.
import React, { useState } from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './Tweets.css';
import dummyTweets from '../static/dummyData';

const Tweets = () => {
  // TODO : 새로 트윗을 작성하고 전송할 수 있게 useState를 적절히 활용하세요.
  const [user, setUser] = useState('parkhacker');
  const [msg, setMsg] = useState('');
  const [tweets, setTweets] = useState(dummyTweets);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredTweets, setfilteredTweets] = useState(dummyTweets);

  const filterUsername = tweets.map((el) => el.username)
  
  const handleButtonClick = (event) => {
    const tweet = {
      id: tweets.length + 1,
      username: user,
      picture: `https://randomuser.me/api/portraits/men/98.jpg`,
      content :msg,
      createdAt : new Date().toLocaleDateString('ko-kr'),
      updatedAt : new Date().toLocaleDateString('ko-kr'),
    }
    // TODO : Tweet button 엘리먼트 클릭시 작동하는 함수를 완성하세요.
    // 트윗 전송이 가능하게 작성해야 합니다.
    const newTweet = [tweet, ...tweets];
    setTweets(newTweet);
  };

  const handleChangeUser = (event) => {
    // TODO : Tweet input 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setUser(event.target.value);
  };

  const handleChangeMsg = (event) => {
    // TODO : Tweet textarea 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setMsg(event.target.value);
  };

  const handleFilter = (event) => {
    if(event.target.value === 'cola'){
      setTweets(tweets)
      setIsFiltered(false)
    }else{
      const filtered = tweets.filter((tweet) => tweet.username === event.target.value) 
      setIsFiltered(true)
      setfilteredTweets(filtered)
    }
  }  

  const handleDelete = (username, deleteidx) => {
    const deletes = tweets.filter((tweet, idx) => idx !== deleteidx)

    setTweets(deletes)
  }

  return (
    <React.Fragment>
      <div className="tweetForm__container">
        <div className="tweetForm__wrapper">
          <div className="tweetForm__profile">
            <img src="https://randomuser.me/api/portraits/men/98.jpg" />
          </div>
          <div className="tweetForm__inputContainer">
            <div className="tweetForm__inputWrapper">
              <div className="tweetForm__input">
                <input
                  type="text"
                  defaultValue={""}
                  placeholder="your username here.."
                  className="tweetForm__input--username"
                  onChange={handleChangeUser}
                ></input>
                <textarea
                placeholder="your message here.."
                className="tweetForm__input--message"
                onChange={handleChangeMsg}
                ></textarea>
              </div>
              <div className="tweetForm__count" role="status">
                <span className="tweetForm__count__text">
                  {/* TODO : 트윗 총 개수를 보여줄 수 있는 Counter를 작성하세요. */}
                  {'total: ' + tweets.length}
                </span>
              </div>
            </div>
            <div className="tweetForm__submit">
              <div className="tweetForm__submitIcon"></div>
              {/* TODO : 작성한 트윗을 전송할 수 있는 button 엘리먼트를 작성하세요. */}
              <button className="tweetForm__submitButton" onClick={handleButtonClick}>Tweet</button>
            </div>
          </div>
        </div>
      </div>
      <div className="tweet__selectUser">
        <select onClick={handleFilter}>
          <option value = "cola"> --click to filter</option>
          {filterUsername.map((el, idx) => {
            return(
              <option value={el} key={idx}>{el}</option>  
            )
          })}
        </select>
      </div>
      <ul className="tweets">
        {/* TODO : 하나의 트윗이 아니라, 주어진 트윗 목록(dummyTweets) 갯수에 맞게 보여줘야 합니다. */}
        {isFiltered ?
        filteredTweets.map((tweet, idx) => {
          return <Tweet tweet = {tweet} key={tweet.id} handleDelete={handleDelete} idx={idx}/>
        }) 
        :
        tweets.map((tweet, idx) => {
          return <Tweet tweet = {tweet} key={tweet.id} handleDelete={handleDelete} idx={idx}/>
        })
      }
      </ul>
      <Footer />
    </React.Fragment>
  );
};

export default Tweets;
