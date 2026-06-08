import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { ActivityInput } from './pages/ActivityInput';
import { StudentFeedback } from './pages/StudentFeedback';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ReviewAndAI } from './pages/ReviewAndAI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/new" element={<ActivityInput />} />
        <Route path="/student/view/:id" element={<StudentFeedback />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/review/:id" element={<ReviewAndAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
