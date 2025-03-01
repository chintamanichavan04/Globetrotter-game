import { useRouter } from "next/router";
import { useState} from "react";

const Game = () => {
  const [userName, setUserName] = useState("")
  const router = useRouter();

  const handlePlay = () =>{
    sessionStorage.setItem("username", userName);
    router.push(`/guess-city-quiz`)
  }


  return (
    <div className="h-full w-full bg-[url(/images/background.jpeg)] flex flex-col items-center justify-center">
      <div className="bg-[#FFFFFF] md:w-[70%] w-[100%] h-fit rounded-2xl p-5 overflow-hidden">
        <div className="text-center text-black font-900 text-2xl" style={{fontWeight:"800"}}>
          The Globetrotter Challenge – The Ultimate Travel Guessing Game!
        </div>
        <div className="flex items-center h-[100%] mb-2">
        <div className="w-[50%] border-r-2 border-r-blue-300 pr-2  h-[80%]">
          <img
              src="/images/city.webp"
              className="w-[100%] relative object-cover"
              style={{height:"100%", objectFit:"cover"}}
            />
        </div>
        <div className="flex flex-col items-center justify-center text-center w-[50%] h-[90%]">
          <div className="h-[120px] overflow-hidden">
            <img
              src="/images/login.png"
              className="w-100%  relative object-cover" 
              style={{height:"100%"}}
            />
          </div>
          <div className="w-[90%]">
            <div className="text-black text-left">Username:</div>
            <input
              type="text"
              id="fname"
              name="fname"
              className="border border-black w-full rounded-sm text-black p-2"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div className="bg-green-600 p-2 rounded-lg w-[100px] mt-3" onClick={handlePlay}>
            Play
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Game;