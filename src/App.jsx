
import { useRef, useState } from 'react'
import './App.css'
import { data } from './assets/data';

function App() {
  let [index,setIndex]= useState(0);
  const [question,setQuestion]= useState(data[index])
  const [lock,setLock] = useState(false)
  const [score,setScore] = useState(0)
  const [result,setResult] = useState(false)
  const Option1 = useRef(null)
  const Option2 = useRef(null)
  const Option3 = useRef(null)
  const Option4 = useRef(null)

  const option_array = [Option1,Option2,Option3,Option4]

  const checkAns = (e,ans)=>{
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      }else{
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct")
      }
    }
    
  }
  const next = ()=>{
    if(lock===true){
      if(index===data.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map(option=>{
        option.current.classList.remove('wrong')
        option.current.classList.remove('correct')
        return null;
      })
    }
  }
 const reset = ()=>{
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
 }

  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div style={{width:'600px',height:'600px'}} className='border rounded shadow d-flex flex-column  p-3 '>
      <h1 className='text-center mt-3'>Quiz App</h1>
      <hr className='w-75 ms-4' />
      {result?<></>:<>
      <h5 className='ms-2'>{index+1}. {question.question}</h5>
      <ul className=' '>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}} style={{cursor:'pointer'}} className='p-1 border shadow rounded mb-1'>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}} style={{cursor:'pointer'}} className='p-1 border shadow rounded mb-1'>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}} style={{cursor:'pointer'}} className='p-1 border shadow rounded mb-1'>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}} style={{width:'auto',height:'45px',cursor:'pointer'}} className='p-1 border shadow rounded '>{question.option4}</li>
      </ul>
      <div className='text-center'><button onClick={next} className='btn btn-info text-center mt-2 w-50 '>Next</button></div>
      <div className='text-center'><p className='mt-2'>{index+1} of {data.length} Questions</p></div>
      </>}
      {
        result?<><h4 className='text-center'>You Scored {score} out of {data.length}</h4>
      <div className='text-center'><button onClick={reset} className='btn btn-danger '>Reset</button></div></>:<></>
      }
      
      
      </div>
    </div>
  )
}

export default App
