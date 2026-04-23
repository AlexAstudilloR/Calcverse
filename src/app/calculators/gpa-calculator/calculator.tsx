"use client";

import { useState } from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

export function GpaCalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Math", grade: "A", credits: "3" },
    { id: 2, name: "Science", grade: "B+", credits: "4" },
    { id: 3, name: "History", grade: "A-", credits: "3" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", grade: "A", credits: "3" }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: string, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade.toUpperCase()] ?? 0;
      
      if (credits > 0) {
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const gpa = calculateGpa();

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">GPA Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Easily compute your college or high school GPA.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Grades</CardTitle>
              <CardDescription>Enter your courses, grades, and credits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground mb-2">
                <div className="col-span-5 hidden sm:block">Course Name</div>
                <div className="col-span-3 sm:col-span-3">Grade</div>
                <div className="col-span-3 sm:col-span-3">Credits</div>
                <div className="col-span-1"></div>
              </div>
              
              {courses.map(course => (
                <div key={course.id} className="grid grid-cols-8 sm:grid-cols-12 gap-2 items-center">
                  <div className="col-span-8 sm:col-span-5 mb-2 sm:mb-0">
                    <Input 
                      placeholder="e.g. Math 101" 
                      maxLength={30}
                      value={course.name} 
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    >
                      {Object.keys(gradePoints).map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <Input 
                      type="number" 
                      min="0"
                      max="20"
                      value={course.credits} 
                      onChange={(e) => e.target.value.length <= 2 && updateCourse(course.id, "credits", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 border-dashed" onClick={addCourse}>
                <Plus className="h-4 w-4 mr-2" /> Add Course
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="bg-primary text-primary-foreground border-primary sticky top-24">
            <CardHeader>
              <CardTitle className="text-primary-foreground">Results</CardTitle>
              <CardDescription className="text-primary-foreground/80">Your cumulative GPA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-1">
                <p className="text-sm text-primary-foreground/80">Cumulative GPA</p>
                <p className="text-6xl font-bold">{gpa}</p>
              </div>
              <div className="pt-6">
                <GraduationCap className="h-16 w-16 mx-auto opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
