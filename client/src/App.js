import { useState, useEffect } from 'react';
import './App.css';
import './styles/styles.css'
import Cookies from 'js-cookie'


function App() {
  const [topicToAdd, setTopicToAdd] = useState('');
  const [linkToTopic, setLinkToTopic] = useState('')
  const [contentToAdd, setContentToAdd] = useState('')
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [emailAppPassword, setEmailAppPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState('false')

  const handleSubmit = async(e) => {
    let user = Cookies.get('auth-token')
    e.preventDefault()
    const lastReviewed = new Date()
    if (topicToAdd !== '' && linkToTopic !== ''){
      let req = await fetch('https://spaced-repetition-backend.onrender.com/api/topics/create-topic', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          subject: topicToAdd,
          content: contentToAdd,
          interval: 1,
          link: linkToTopic,
          token: user,
          lastReviewed: lastReviewed.toISOString(), // Use ISO format
          nextReviewDate: calcNextReviewDate().toISOString()
        })
      })
      let res = await req.json()
      setTopics(prev=> [...prev, {subject: res.subject, nextReviewDate: res.nextReviewDate, link:res.link}])
      setTopicToAdd('')
      setLinkToTopic('')
      setContentToAdd('')
    }

  }

  const calcNextReviewDate = () => {
    const today = new Date();
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(nextReviewDate.getDate() + 1); 
    return nextReviewDate;
  }
  
//   const calcNextReviewDate = () => {
//     const now = new Date();
//     const nextReviewDate = new Date(now);
//     nextReviewDate.setSeconds(nextReviewDate.getSeconds() + 30); // Add 30 seconds
//     return nextReviewDate;
// };

  const handleDeleteTopic = async (id) => {
    try {
      let req = await fetch(`https://spaced-repetition-backend.onrender.com/api/topics/delete-topic/${id}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
      })
      let res = await req.json()
      console.log(res)
      if (req.ok){
        let alreadyRemoved = false
        let filteredTopics = topics.filter(topic => {
            if (topic.id === id && !alreadyRemoved){
                alreadyRemoved = true
            }else {
                return topic
            }
        })
        setTopics(filteredTopics)
    }
    } catch (error) {
      console.log(error)
    }
  }

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${month}/${day}`;
}

  const handleLogin = async(e) => {
    e.preventDefault()
    let req = await fetch('https://spaced-repetition-backend.onrender.com/api/auth/login', {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
        {
          username: username,
          password: password,
        }
      )
    })
    let res = await req.json()
    
    if (res.error){
      console.log('try again')
    }else if (res.authToken){
      setIsLoggedIn('true')
      Cookies.set('auth-token', res.authToken)
      getTopics()
      setUsername('')
      setPassword('')
    }}
  

  const handleSignUp = async(e) => {
    e.preventDefault()
    let req = await fetch('https://spaced-repetition-backend.onrender.com/api/auth/signup',{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
        {
          username: username,
          password: password,
          name: name,
          email: email,
          emailAppPassword: emailAppPassword
        }
      )
    })

    let res = await req.json()
    if ( res.error){
      console.log("error")
    }else if (res.authToken){
      setIsLoggedIn('true')
      Cookies.set('auth-token', res.authToken)
      getTopics()
      setName('')
      setPassword('')
      setUsername('')
      setEmailAppPassword('')
      setEmail('')
    }
  }

  const handleIsUserLoggedIn = async() => {
    let user = Cookies.get('auth-token')
    let req = await fetch(`https://spaced-repetition-backend.onrender.com/api/auth/tap/${user}`)
    let res = await req.json()
    if (res.message === "valid user"){
      setIsLoggedIn('true')
    }else{
      setIsLoggedIn('false')
    }
    console.log(res)
  }

  const getTopics = async() => {
    let user = Cookies.get('auth-token')
    if (user){
      let req = await fetch(`https://spaced-repetition-backend.onrender.com/api/topics/${user}`)
      let res = await req.json()
      console.log(res)
      if (res.message === 'jwt expired'){
      }else{
        setTopics(res);
      }
    }
  }

  const handleSignOut = () => {
    Cookies.remove('auth-token')
    window.location.reload()
  }

  useEffect(()=> {
    getTopics()
    handleIsUserLoggedIn()
  },[])


  return (
    <div id='app'>
     { isLoggedIn === 'true' && <button id='sign-out' onClick={()=> {handleSignOut()}}>Sign out</button>}
      <section id="add-topic">
        { isLoggedIn !== 'true' && isLoggedIn !== 'signUp' && <div id="login-model">
          <form id="login-form" onSubmit={handleLogin}>
            <h1>LOGIN</h1>
            <input placeholder='Username' value={username} onChange={(e)=> {setUsername(e.target.value)}} type="text" id="username-field" />
            <input placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password-field" />
            <button>Login</button>
            <p onClick={()=> {setIsLoggedIn('signUp')}}>Sign Up</p>
          </form>
        </div>}
        { isLoggedIn !== 'true' && isLoggedIn !== 'login' && <div id="login-model">
          <form id="signup-form" onSubmit={handleSignUp}>
            <h1>Sign Up</h1>
            <input placeholder='Name' value={name} onChange={(e)=> {setName(e.target.value)}} type="text" id="signup-name-field" />
            <input placeholder='Username' value={username} onChange={(e)=> {setUsername(e.target.value)}} type="text" id="signup-username-field" />
            <input type="text" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="text" value={emailAppPassword} placeholder='Email app password' onChange={(e)=>{setEmailAppPassword(e.target.value)}} />
            <input placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}} type="password" id="signup-password-field" />
            <button>Login</button>
            <p onClick={()=> {setIsLoggedIn('login')}}>Login</p>
          </form>
        </div>}
        <h1 id="banner">Welcome to Spaced Repetition</h1>
        <form id='topic-form' onSubmit={handleSubmit}>
          <h1>Add a topic!</h1>
        <input
          id='subject'
          type="text"
          placeholder='Subject'
          value={topicToAdd}
          onChange={(e) => {
            setTopicToAdd(e.target.value);
          }}
        />
        <input type="text"
         id="content"
         placeholder='Content'
         value={contentToAdd}
         onChange={(e)=> {setContentToAdd(e.target.value)}}
         />
        <input type="text"
        value={linkToTopic} 
        placeholder="Link"
        onChange={(e)=> {
          setLinkToTopic(e.target.value)
        }}
        />
        <button>
          Add Topic
        </button>
        </form>
      </section >
      <section id='topic-container'>
      <ul id='topic-list'>
        {topics.map((topic) => (
          <div className='topic-list-item' key={topic.id}>
              <div className="review-container">
                <div className="top-container">
                 <h1>{`${topic.subject}: `}</h1>
                 <h3>{topic.content}</h3>
              </div>
              <div className="bottom-container">
              <h3>{`Study again on ${formatDate(topic.nextReviewDate)}`}</h3>
                <a target="_blank" href={topic.link}>Link to Topic</a>
              </div>
            </div>
            <button onClick={()=>handleDeleteTopic(topic.id)} id="delete-topic">Delete</button>
          </div>
        ))}
      </ul>
      </section>
    </div>
  );
}

export default App;
