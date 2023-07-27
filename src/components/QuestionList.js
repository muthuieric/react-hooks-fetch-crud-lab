import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions,deleteQuestion,updateCorrectAnswer}) {
  console.log(questions)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question=>{
        console.log(question)
        return <QuestionItem updateCorrectAnswer={updateCorrectAnswer} deleteQuestion={deleteQuestion} question={question} key={question.id} />
      })}</ul>
    </section>
  );
}

export default QuestionList;


// function QuestionList() {
//   return (
//     <section>
//       <h1>Quiz Questions</h1>
//       <ul>{/* display QuestionItem components here after fetching */}</ul>
//     </section>
//   );
// }

// export default QuestionList;