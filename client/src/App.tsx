import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Course from "@/pages/Course";
import Module from "@/pages/Module";
import Dashboard from "@/pages/Dashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import EditCourse from "@/pages/EditCourse";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/course/:id" component={Course} />
          <Route path="/module/:id" component={Module} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/teacher" component={TeacherDashboard} />
          <Route path="/course/:id/edit" component={EditCourse} />
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;