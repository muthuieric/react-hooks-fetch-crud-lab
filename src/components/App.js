import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]=useState([])
  const URL=" http://localhost:4000/questions"

  useEffect(()=>{
    fetch(URL)
    .then(res=>res.json())
    .then(questions=>setQuestions(questions))
  },[])

  function addQuestion(question){
    fetch(URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(question)
    })
    .then(res=>res.json())
    .then(newQuestion=>setQuestions([...questions,newQuestion]))
  }

  function deleteQuestion(id){
    fetch(`${URL}/${id}`,{
      method:"DELETE"
    })
    .then(res=>{
      if(res.ok){
        setQuestions(questions.filter(question=>question.id!==id))
      }
    })
  }

  function updateCorrectAnswer(correctIndex,id){
    const modifiedAnswer={correctIndex}
    fetch(`${URL}/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(modifiedAnswer)
    })
    .then(res=>res.json())
    .then(updatedQuestion=>{
      const updatedQuestions=questions.map(question=>
        //ternary solution
        question.id === id ? {...question, correctIndex} : question

       
      )
      setQuestions(updatedQuestions)
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList updateCorrectAnswer={updateCorrectAnswer} deleteQuestion={deleteQuestion} questions={questions} />}
    </main>
  );
}

export default App;











// import React, { useState } from "react";
// import AdminNavBar from "./AdminNavBar";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";

// function App() {
//   const [page, setPage] = useState("List");

//   return (
//     <main>
//       <AdminNavBar onChangePage={setPage} />
//       {page === "Form" ? <QuestionForm /> : <QuestionList />}
//     </main>
//   );
// }

// export default App;
