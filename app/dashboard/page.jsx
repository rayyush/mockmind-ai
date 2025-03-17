import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const DashboardPage = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl text-blue-800">Dashboard</h2>
      <h2 className="text-gray-500">Create and start your AI Mock Interview</h2>

      <div className="grid gird-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
};

export default DashboardPage;
