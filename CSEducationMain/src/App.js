import React, { useState } from 'react';
import { Book, ChevronRight, ChevronDown, Lock, CheckCircle } from 'lucide-react';
import './LearningPlatform.css';  // We'll create this CSS file next
import LessonPage from './LessonPage';
import './LessonPage.css';
import { lesson1 } from './PoetryModule/PoetryLesson1Data';

const LearningPlatform = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'CS × Poetry',
      description: 'Explore the intersection of coding and creative writing',
      progress: 25,
      lessons: [
        { id: 1, title: 'Introduction to Code Poetry', completed: true },
        { id: 2, title: 'Variables and Verses', completed: false },
        { id: 3, title: 'Loops in Literature', completed: false },
        { id: 4, title: 'Digital Poetry Project', completed: false }
      ]
    },
    {
      id: 2,
      title: 'CS × Biology',
      description: 'Learn how computer science powers modern biology',
      progress: 50,
      lessons: [
        { id: 1, title: 'DNA and Data Structures', completed: true },
        { id: 2, title: 'Protein Analysis with Python', completed: true },
        { id: 3, title: 'Genomic Algorithms', completed: false },
        { id: 4, title: 'Bioinformatics Project', completed: false }
      ]
    },
    {
      id: 3,
      title: 'CS × Music',
      description: 'Create music through code and algorithms',
      progress: 75,
      lessons: [
        { id: 1, title: 'Digital Sound Basics', completed: true },
        { id: 2, title: 'Algorithmic Composition', completed: true },
        { id: 3, title: 'Music Generation with AI', completed: true },
        { id: 4, title: 'Digital Orchestra Project', completed: false }
      ]
    }
  ];

  const CourseGrid = () => (
    <div className="course-grid">
      {courses.map(course => (
        <div 
          key={course.id}
          onClick={() => setSelectedCourse(course)}
          className="course-card"
        >
          <h3>{course.title}</h3>
          <p className="course-description">{course.description}</p>
          <div className="progress-container">
            <div className="progress-header">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  
  
  const lessonContents = {
    // CS × Poetry Lessons
    1: lesson1,
    2: {  // Variables and Verses
      introduction: `Dive into the world of Variables and Verses! Learn how programming variables can become powerful 
                    metaphors in poetry, creating dynamic and interactive literary experiences.`,
      sections: [
        {
          title: 'Variables as Metaphors',
          content: `Just as variables in programming hold changing values, poetic variables can represent evolving 
                   themes, emotions, or images. We'll explore how to use this concept to create dynamic poetry.`
        },
        {
          title: 'Dynamic Poetry',
          content: `Learn to create poems that change and adapt, using variable concepts to represent:
                   • Shifting emotions
                   • Evolving narratives
                   • Interactive elements
                   • Reader-dependent outcomes`
        }
      ],
      assignments: [
        {
          type: 'multiple-choice',
          id: 'vv_q1',
          question: 'How can variables enhance poetry?',
          options: [
            'By making the poem longer',
            'By adding mathematical calculations',
            'By representing changing elements within the poem',
            'By making the poem more complicated'
          ]
        },
        {
          type: 'free-response',
          id: 'vv_q2',
          question: 'Create a poem where a "variable" changes throughout the verses. Explain how this variable represents transformation or growth.'
        }
      ]
    },
  
    // CS × Biology Lessons
    5: {  // DNA and Data Structures
      introduction: `Welcome to DNA and Data Structures! Discover how computer science helps us understand and analyze 
                    the building blocks of life through sophisticated data structures.`,
      sections: [
        {
          title: 'DNA as Data',
          content: `Learn how DNA sequences can be represented as data structures, enabling powerful analysis and 
                   pattern recognition. We'll explore the parallels between biological and computational information storage.`
        },
        {
          title: 'Algorithmic Analysis',
          content: `Discover how algorithms can:
                   • Search for genetic patterns
                   • Compare DNA sequences
                   • Identify mutations
                   • Predict protein structures`
        }
      ],
      assignments: [
        {
          type: 'multiple-choice',
          id: 'dna_q1',
          question: 'Which data structure best represents a DNA sequence?',
          options: [
            'A circular linked list',
            'A string or array',
            'A binary tree',
            'A hash table'
          ]
        },
        {
          type: 'free-response',
          id: 'dna_q2',
          question: 'Explain how a simple algorithm could be used to find patterns in a DNA sequence. What computational concepts would you use?'
        }
      ]
    }
    // Add more lesson content mappings as needed
  };

 
  const Lesson = ({ lesson, index, isLocked }) => {
    const isExpanded = expandedLesson === lesson.id;

    const handleStartLesson = () => {
      console.log("Here!!")
      const lessonContent = lessonContents[lesson.id];
      setActiveLesson({
        ...lesson,
        content:lessonContent
      });
    };

    return (
      <div className={`lesson ${isLocked ? 'locked' : ''}`}>
        <button
          onClick={() => !isLocked && setExpandedLesson(isExpanded ? null : lesson.id)}
          className="lesson-header"
          disabled={isLocked}
        >
          <div className="lesson-title">
            {lesson.completed ? (
              <CheckCircle className="icon completed" />
            ) : isLocked ? (
              <Lock className="icon locked" />
            ) : (
              <div className="icon uncompleted" />
            )}
            <span>{lesson.title}</span>
          </div>
          {!isLocked && (
            isExpanded ? <ChevronDown className="icon" /> : <ChevronRight className="icon" />
          )}
        </button>
        
        {isExpanded && (
          <div className="lesson-content">
            <h4>Lesson Overview</h4>
            <p>Learn about {lesson.title} through interactive exercises and real-world applications.</p>
            <div className="objectives">
              <h5>Learning Objectives</h5>
              <ul>
                <li>Understand key concepts</li>
                <li>Apply knowledge through exercises</li>
                <li>Complete hands-on projects</li>
              </ul>
            </div>
            <button 
              className="start-button"
              onClick={handleStartLesson}  // Add the click handler here
            >
              Start Lesson
            </button>
          </div>
        )}
      </div>
    );
  };

  const CourseDetail = () => (
    <div className="course-detail">
      <button
        onClick={() => setSelectedCourse(null)}
        className="back-button"
      >
        <ChevronRight className="icon rotate" />
        <span>Back to Courses</span>
      </button>

      <div className="course-content">
        <div className="course-header">
          <h2>{selectedCourse.title}</h2>
          <p>{selectedCourse.description}</p>
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span>Course Progress</span>
            <span>{selectedCourse.progress}%</span>
          </div>
          <div className="progress-bar large">
            <div 
              className="progress-fill"
              style={{ width: `${selectedCourse.progress}%` }}
            />
          </div>
        </div>

        <div className="lessons-section">
          <h3>Lessons</h3>
          {selectedCourse.lessons.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              index={index}
              isLocked={index > 0 && !selectedCourse.lessons[index - 1].completed}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <Book className="icon" />
            <span>K-12 Learning Hub</span>
          </div>
        </div>
      </nav>
  
      <main className="main-content">
        {activeLesson ? (  // Check if there's an active lesson
          <LessonPage 
            lesson={activeLesson}
            onBack={() => setActiveLesson(null)}  // Handler to go back
          />
        ) : selectedCourse ? (
          <CourseDetail />
        ) : (
          <div className="home-content">
            <div className="header">
              <h1>Interdisciplinary Courses</h1>
              <p>Explore the exciting intersection of Computer Science with other subjects</p>
            </div>
            <CourseGrid />
          </div>
        )}
      </main>
    </div>
  );
};

export default LearningPlatform;