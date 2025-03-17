"use client";

import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

function startInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result.length === 0) {
      console.error("No interview data found");
      return;
    }

    const jsonMockResponse = JSON.parse(result[0]?.jsonMockResp || "{}");
    console.log(jsonMockResponse);

    const questions =
      jsonMockResponse.interviewQuestions ||
      jsonMockResponse.interview_questions ||
      [];

    setMockInterviewQuestion(questions);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-10">
        {/*Questions*/}
        {mockInterviewQuestion.length > 0 && (
          <QuestionsSection
            activeQuestionIndex={activeQuestionIndex}
            mockInterviewQuestion={mockInterviewQuestion}
          />
        )}

        {/*audio/video settings*/}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Prev Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default startInterview;
