import { Button } from "../../../../../../components/ui/button";
import { Lightbulb, Volume1 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  console.log("Received questions:", mockInterviewQuestion);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-full gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <Button
                className={`p-2 bg-secondary text-black rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index && "bg-black text-white"
                }
              }`}
              >
                Question #{index + 1}
              </Button>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg ">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume1
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
