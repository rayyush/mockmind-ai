"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState("");
  const [webcamEnable, setWebcamEnable] = useState(false);

  useEffect(() => {
    console.log(params);
    getInterviewDetails();
  }, []);

  // Fetch interview details based on interviewId
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Let's get started!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
        <div>
          {webcamEnable ? (
            <Webcam
              onUserMedia={() => setWebcamEnable(true)}
              onUserMediaError={() => setWebcamEnable(false)}
              mirrored={true}
              style={{
                height: 500,
                width: 450,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-10 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebcamEnable(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="mt-5">Start Interview</Button>
          </Link>
        </div>
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Position: </strong>
              {interviewData?.jobPosition || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech stack: </strong>
              {interviewData?.jobDesc || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExp || "Loading..."}
            </h2>
          </div>
          <div className="p-5 my-5 border rounded-lg border-yellow-200 bg-yellow-100">
            <h2 className="flex gap-2 items-center my-2 text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-700">
              {process.env.NEXT_PUBLIC_INFO}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
