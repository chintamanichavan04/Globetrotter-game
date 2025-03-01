const { useState, useEffect } = require("react");

const QuizCard = ({questionData, index, answered}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loader, setLoader] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [fact, setFact] = useState("");
    console.log("questionList", questionData)
    useEffect(()=>{
        setFeedback(null);
        setCorrect(false);
        setFact("");
        setSelectedAnswer(null);
        setLoader(false);
    },[questionData])
    const handleSubmit = async (answer) => {
        setSelectedAnswer(answer);
    
        // Call verify API
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: questionData.id,
            selectedAnswer: answer,
          }),
        });
    
        const result = await response.json();
        if (result.correct) {
          setFeedback("🎉 Correct! Well done!");
          answered();
        } else {
          setFeedback(
            `❌ Incorrect. The correct answer was: ${result.correctAnswer}`
          );
        }
        setFact(result?.funFact);
        setCorrect(result?.correct);
        setLoader(true);
      };

    return(
        <>
        {questionData?.question!=undefined&&<div className="p-6 text-center">
        <div className="text-[#FF0000] text-left font-extrabold text-[20px]">
            {`Quiz Number: ${index+1}/10`}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-[#000000CC]">{`"${questionData?.question}"`}</h2>
        <div className="grid grid-cols-2 gap-4">
          {questionData?.options?.map((option, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg text-[#00000080] ${
                selectedAnswer === option && loader
                  ?correct?
                     "bg-green-500 text-white":"bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSubmit(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p className="mt-4 text-lg text-black">{feedback}</p>}
       {loader&& <div className="bg-[#0000001A] text-black rounded-2xl p-3 text-left mt-3">
            <div>Fun Fact:</div>
            <div className="pl-3">
            {fact}
            </div>
        </div>}
        
      </div>}
        </>
    );
};

export default QuizCard;