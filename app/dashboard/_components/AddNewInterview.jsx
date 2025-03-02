"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AddNewInterview() {
  const [openDialog, setOpenDialoge] = useState(false);
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialoge(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <div>
                <h2>
                  Add details about your job role/position, job description and
                  years of experience
                </h2>
                <div>
                  <label>Job role/position</label>
                  <Input placeholder="Eg. Full Stack Developer" />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button variant="ghost" onClick={() => setOpenDialoge(false)}>
                  Cancel
                </Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
