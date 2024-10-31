import React, { useState } from 'react';
import { Book, ChevronRight, ChevronDown, Lock, CheckCircle } from 'lucide-react';
import './LearningPlatform.css';  // We'll create this CSS file next
import LessonPage from './LessonPage';
import './LessonPage.css';

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

  const lesson1 = {
    introduction: `Welcome to Poetic Probabilities! In this fascinating lesson, we'll explore the intersection 
                  of traditional poetry and modern artificial intelligence. We'll study the distinctive styles 
                  of two remarkable poets - Langston Hughes and Sylvia Plath - while discovering how AI can 
                  understand, analyze, and even emulate their unique voices.`,
    sections: [
      {
        title: 'Meet Our Poets',
        content: `Let's begin by getting to know our two featured poets:

        Langston Hughes (1901-1967) was a leading figure of the Harlem Renaissance, known for his colorful 
        portrayals of Black life and his innovative jazz poetry. His work often addressed racial inequality 
        while celebrating African American culture and identity.

        Sylvia Plath (1932-1963) was a groundbreaking confessional poet known for her intense, personally 
        charged poetry. Her work often explored themes of identity, nature, and mental health, with striking 
        imagery and powerful emotional depth.`,
        images: [
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Langston_Hughes_by_Carl_Van_Vechten_1936.jpg/800px-Langston_Hughes_by_Carl_Van_Vechten_1936.jpg',
            alt: 'Langston Hughes, prominent figure of the Harlem Renaissance',
            caption: 'Langston Hughes at his typewriter, 1939'
          },
          {
            src: '/api/placeholder/400/300',
            alt: 'Sylvia Plath, renowned confessional poet',
            caption: 'Sylvia Plath in England, circa 1960'
          }
        ]
      },
      {
        title: 'AI and Creative Expression',
        content: `Today's technology can analyze patterns in writing styles and create new content that mimics 
                 specific authors. But how well can AI capture the essence of human creativity? We'll explore:
                 
                 • How AI analyzes writing patterns
                 • The role of context and emotion in poetry
                 • The intersection of human creativity and machine learning
                 • Ethical considerations in AI-generated art`,
      },
      {
        title: 'Interactive Style Analysis',
        content: `Let's put your poetry analysis skills to the test! We'll look at various poems - some written 
                 by Hughes and Plath, others generated by AI. Can you spot the differences? What makes each 
                 poet's style unique?`
      }
    ],
    assignments: [
      {
        type: 'multiple-choice',
        id: 'pp_q2',
        question: 'Sylvia Plath is known for which poetic movement?',
        options: [
          'Harlem Renaissance',
          'Confessional Poetry',
          'Imagism',
          'Beat Poetry'
        ],
        correctAnswer: 1
      },
      {
        type: 'multiple-choice',
        id: 'pp_q3',
        question: 'How does AI typically analyze poetry for style mimicry?',
        options: [
          'By counting the number of words',
          'By analyzing patterns in language, rhythm, and themes',
          'By randomly combining words',
          'By copying exact phrases from existing poems'
        ],
        correctAnswer: 1
      },
      {
        type: 'style-analysis',
        id: 'pp_q4',
        question: 'Read the following passage and determine if it was written by a human or AI:',
        content: `"The night wind whispers through broken dreams,
                 Like jazz notes scattered on Harlem streets,
                 While hope dances in the moonlight beams,
                 And freedom's rhythm steadily beats."`,
        options: [
          'Human - Langston Hughes style',
          'AI-generated in Hughes style',
          'Human - different poet',
          'AI-generated generic style'
        ]
      },
      {
        type: 'free-response',
        id: 'pp_q5',
        question: `Consider the role of AI in creative fields. How might AI tools enhance (rather than replace) 
                  human creativity in poetry? Provide specific examples.`
      },
      {
        type: 'discussion',
        id: 'pp_q6',
        question: `For class discussion: What aspects of poetry do you think would be the hardest for AI to 
                  replicate? Consider elements like emotional depth, personal experience, and cultural context.`
      }
    ],
    activities: [
      {
        title: 'Style Detective Game',
        description: `In pairs, you'll receive several poems - some by Hughes, some by Plath, and some AI-generated. 
                     Work together to identify the likely source of each piece and explain your reasoning.`,
        duration: '20 minutes'
      },
      {
        title: 'AI Poetry Workshop',
        description: `Using provided AI tools, experiment with generating poetry in different styles. Compare the 
                     results with original works by Hughes and Plath. What works well? What's missing?`,
        duration: '30 minutes'
      }
    ],
    additionalResources: [
      {
        title: 'The Collected Poems of Langston Hughes',
        type: 'book'
      },
      {
        title: 'Ariel by Sylvia Plath',
        type: 'book'
      },
      {
        title: 'Understanding AI in Creative Fields',
        type: 'online article'
      }
    ]
  }
  
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