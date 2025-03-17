"use client";
import { Button } from "../../../../../../components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "../../../../../../utils/db";
import { userAnswerSchema } from "../../../../../../utils/schema";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (!isRecording && results.length > 0) {
      const finalAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswer(finalAnswer);
    }
  }, [isRecording, results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    } else if (
      !isRecording &&
      userAnswer.length < 10 &&
      userAnswer.length > 0
    ) {
      setLoading(false);
      toast("Error while saving your response, please record again");
      resetRecordingState(); // Reset the state if the answer is invalid
    }
  }, [isRecording, userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      console.log("Stopping Recording...");
      stopSpeechToText();
    } else {
      console.log("Starting Recording...");
      setUserAnswer(""); // Clear previous responses
      setResults([]); // Clear old results
      startSpeechToText();
    }
  };

  const resetRecordingState = () => {
    console.log("Resetting state for next question...");
    setUserAnswer("");
    setResults([]);
  };

  const UpdateUserAnswer = async () => {
    console.log("Submitting answer:", userAnswer);
    setLoading(true);

    if (!userAnswer.trim()) {
      toast("No answer recorded. Please try again.");
      setLoading(false);
      return;
    }

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
    User Answer: ${userAnswer}. 
    Depending on the question and user answer, provide feedback and a rating in JSON format. 
    Only include 'rating' and 'feedback' fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();

      const JsonFeedbackResp = JSON.parse(mockJsonResponse);
      console.log("Feedback Response:", JsonFeedbackResp);

      const resp = await db.insert(userAnswerSchema).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User answer recorded successfully");
        resetRecordingState();
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      toast("Error while saving your response, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center bg-black rounded-lg p-5 mt-20">
        <WebcamIcon width={200} height={200} className="absolute text-white" />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      <Button
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
