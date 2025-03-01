import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import { useRouter } from "next/navigation";
import { FiShare2 } from "react-icons/fi";

const Index = () => {
    const [quizIndex, SetQuizIndex] = useState(0);
    const router = useRouter();
    const [totalCorrect, SetTotalCorrect] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [userName, setUserName] = useState("");
    const totalCorrectAnswered = () => {
            SetTotalCorrect(totalCorrect+1);
    };
    useEffect(() => {
        
            const fetchQuestions = async () => {
              try {
                const res = await fetch("/api/destination");
                const data = await res.json();
                setQuestionList(data?.questions || []);
              } catch (error) {
                console.error("Error fetching questions:", error);
              } 
            };
        
            fetchQuestions();

      }, []);
    const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: `Play - The Globetrotter Challenge – The Ultimate Travel Guessing Game!`,
            text: `Can you beat my score ${totalCorrect} out of 10?`,
            url: window.location.href,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
        } else {
          // Fallback for browsers that do not support the Web Share API
          alert('Share feature is not supported in your browser. Please copy the URL manually.');
        }
      };
      useEffect(() => {
        // Ensure window object is available
        if (typeof window !== "undefined") {
          const name = sessionStorage.getItem("username");
          if(name?.length==0){
            router.push("/");
          }
          setUserName(name);
        }
      }, []);
    return(
        <>
        <div className=" bg-[#0D121C] py-4 px-5 text-2xl flex items-center justify-between">
            <div>
        The Globetrotter Challenge
            </div>
            <div className="flex items-center ml-2">
                <div className="hidden md:block">
                {userName}
                </div>
                <img
                    src="/images/user.png"
                    className="h-10 rounded-full ml-4"
                    title={userName}
                />
            </div>
        </div>
       {questionList?.length>0&& <div className="h-full w-full flex flex-col items-center justify-center">{console.log("correct",totalCorrect)}
        <div className="bg-[#FFFFFF] md:w-[70%] w-[100%] h-fit rounded-2xl p-5 overflow-hidden">
            {submit?<div className="flex flex-col items-center justify-center text-black">

                    <div className="text-[34px] font-bold">
                        Your Score:
                    </div>
                    <div className="text-[54px] font-extrabold">
                        {totalCorrect}{`/10`}
                    </div>
                    <div className="flex text-xl items-center bg-green-500 p-3 rounded-2xl mb-3"> 
                        <div>Share your score with your friend.</div>
                    <FiShare2
                    className="text-[#7E7E7E] text-3xl cursor-pointer"
                    onClick={handleShare}
                  />
                    </div>
            </div>:<QuizCard
                questionData = {questionList?.[quizIndex]}
                index = {quizIndex}
                answered = {totalCorrectAnswered}
            />}
            {submit?<div className="text-center">
                <button
        className=" px-4 py-2 bg-blue-500 text-white rounded text-right"
        onClick={()=>{router.refresh()}}
      >
        Play Again
      </button>
            </div>:
            <div className="flex justify-end items-center">
            {(quizIndex+1<questionList?.length)?<button
          className=" px-4 py-2 bg-blue-500 text-white rounded text-right"
          onClick={()=>SetQuizIndex(quizIndex+1)}
        >
          Next Question
        </button>:
        <button
        className=" px-4 py-2 bg-blue-500 text-white rounded text-right"
        onClick={()=>setSubmit(true)}
      >
        Submit
      </button>}
            </div>}
        </div>
      </div>}
        </>
    );
};

export default Index;
