import { useState } from 'react';
import './App.css';
import './styles/styles.css'

function App() {
  const [topicToAdd, setTopicToAdd] = useState('');
  const [linkToTopic, setLinkToTopic] = useState('')
  const [topics, setTopics] = useState([{title: "Bio",interval: 1, time: 1000, link: ""},]);

  const handleTimeToReview = () => {
    setTimeout(()=>{
      console.log('waiting')
      alert('waiting')
    },[10000])
  }


  // const handleTopicAdd = () => {
  //   if (topicToAdd != ''){
  //     setTopics(prev=> [...prev, {title: topicToAdd, interval: 1, time: 1000, link:linkToTopic}])
  //     spacedRepetition({interval: 1})
  //     setTopicToAdd('')
  //     setLinkToTopic('')
  //     handleTimeToReview()
  //   }
  // }

  const spacedRepetition = (topic) => {
    console.log(topic)
    let today = new Date()
    if (topic.interval == 1){
      let nextInterval = topic.interval * 1
      const nextReviewDate = new Date(today);
      nextReviewDate.setDate(today.getDate() + nextInterval);
      console.log(nextReviewDate)
    }
    //Day 1 Learn
    //Day 2 Review 1 day
    //Day 4 review (Second review) 3 days
    //Day 7 review (Third Review) 6 days
    //Day 16 review (Fourth Review) 15 days
    //Day Day 35 review (fifth review) 34 days
    // Every 3 Weeks after

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    let req = await fetch('http://localhost:4000/create-topic', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        title: topicToAdd,
        interval: 1,
        link: linkToTopic,
        lastReview: new Date(),
        nextReviewDate: calcNextReviewDate()
    })
    })
    let res = await req.json()
    console.log(res)
  }

  const calcNextReviewDate = () => {
    const today = new Date();
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(nextReviewDate.getDate() + 1); 
    return nextReviewDate;
  };
  


  return (
    <div>
      <section id="add-topic">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Add Topic'
          value={topicToAdd} // Controlled component
          onChange={(e) => {
            setTopicToAdd(e.target.value);
          }}
        />
        <input type="text"
        value={linkToTopic} 
        placeholder="Add Link"
        onChange={(e)=> {
          setLinkToTopic(e.target.value)
        }}
        />
        <button
          // onClick={() => {
          //   handleTopicAdd()
          // }}
        >
          Add Topic
        </button>

        </form>
      </section >
      <section id='topic-container'>
      <ul id='topic-list'>
        {topics.map((topic, index) => (
          <div className='topic-list-item'>
            <h1>{topic.title}</h1>
            <a href={topic.link}>Link to Topic</a>
            <h3>{`Study again in ${topic.time}`}</h3>
          </div>
        ))}
      </ul>
      </section>
    </div>
  );
}

export default App;
