"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/start");
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-blue-800">{interview?.jobPosition}</h2>
      <h2 className="font-bold text-gray-500">
        {interview?.jobExp} years of experience
      </h2>
      <h2 className="text-sm text-gray-500">
        Created On: {interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          onClick={onFeedback}
          size="sm"
          variant="outline"
          className="hover:bg-blue-800 hover:text-white bg-white text-blue-800 border-blue-800 w-full"
        >
          Feedback
        </Button>
        <Button
          onClick={onStart}
          size="sm"
          className="bg-blue-800 text-white hover:bg-white hover:text-blue-800 border-blue-800 w-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
