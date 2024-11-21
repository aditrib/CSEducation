export const lesson1 = {
    introduction: `Welcome to Poetic Probabilities! In this fascinating lesson, we'll explore the intersection 
                  of traditional poetry and modern artificial intelligence. We'll dive deep into the world of two 
                  remarkable poets - Langston Hughes and Sylvia Plath - whose distinct voices have shaped literary history. 
                  Hughes, a prominent figure of the Harlem Renaissance, used vibrant, rhythmic language to express 
                  the African American experience, while Plath, known for her intense confessional poetry, used vivid imagery 
                  to convey personal struggles and societal observations. Through this lesson, we’ll not only learn about their 
                  unique styles but also discover how AI can analyze, interpret, and even emulate the nuanced, emotional 
                  elements of their work. Let’s embark on this journey to uncover the artistic possibilities and ethical 
                  considerations of AI in the realm of poetry!`,
    sections: [
      {
        title: 'Meet Our Poets',
        content: `Let's begin by getting to know our two featured poets:

        Langston Hughes was an influential and leading figure in the Harlem Renaissance, a cultural and artistic movement
        in the 1920s that celebrated African American cultural expression in literature, music, and the arts. His poetry is
        celebrated for its vibrant, jazz-inspired rhythms and vivid depictions of Black life in America. Hughes used language 
        that was simple and accessible yet deeply expressive, reflecting the everyday struggles and joys of African Americans.
        Hughes was not afraid to address issues of racial inequality and social justice in his work, making his poetry both a 
        celebration and a critique of society. His poems like "The Negro Speaks of Rivers" and "Harlem" (often referred to as 
        "A Dream Deferred") carry powerful messages of resilience, identity, and hope. Through metaphor and symbolism, Hughes 
        depicted the African American experience with pride, and he believed that Black art should be reflective of the struggles
        and triumphs within Black communities. Jazz music significantly influenced Hughes' poetic style. Known as 
        "jazz poetry," his writing embraced the syncopation, improvisation, and rhythmic energy of jazz music, mirroring the 
        richness of African American oral traditions. In his work, Hughes created a distinct voice that sought to honor the 
        lives of the working-class Black community, whose stories were often overlooked. His characters, drawn from real life,
        spoke with authenticity about dreams, hardships, and hope. Hughes' writing not only enriched American literature but
        also encouraged younger generations to express their identity and experiences without fear. His influence extended
        beyond poetry into other art forms and left an indelible impact on American culture, where he is remembered as a poet
        who captured the essence of his time while challenging America to become a more inclusive and just society.

        Sylvia Plath was a pioneering and influential figure in confessional poetry, a genre characterized by its intense and
        personal exploration of the self. Her writing, filled with raw emotion and introspection, often delved into themes of
        identity, mental health, nature, and the complex relationships between individuals and society. Her voice remains distinct
        for its striking imagery, honesty, and the haunting beauty of her language. Plath's work reflects her own struggles with mental
        health, particularly in her poems in Ariel, a collection published posthumously that solidified her status as a defining voice
        of her generation. Poems like "Lady Lazarus" and "Daddy" reveal Plath's ability to transform her personal experiences of despair,
        anger, and resilience into universal expressions of the human condition. In these works, she used bold metaphors and stark, 
        sometimes violent imagery to communicate complex emotions, giving readers insight into the depths of her psyche. 
        Nature also appears frequently in Plath's poetry, often symbolizing the internal landscapes of her mind. Her work is filled
        with references to the moon, stars, and the changing seasons, which serve as metaphors for life cycles, renewal, and decay.
        These natural elements bring a surreal quality to her poetry, which simultaneously draws readers closer to her perspective 
        while creating an almost mythic dimension to her personal experiences. Plath's legacy extends beyond her poetic achievements;
        she opened doors for writers, especially women, to discuss topics that were once considered taboo. She broke new ground in
        exploring subjects like mental illness, marriage, and the role of women in society with an honesty and intensity that many
        readers found revolutionary. Her poetry is celebrated not only for its technical brilliance and daring imagery but also for
        its unflinching exploration of pain, identity, and the search for meaning.
        
        `,
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
        type: 'multiple-choice',
        id: 'pp_q7',
        question: 'What was a central theme in Langston Hughes\'s poetry?',
        options: [
          'Mysticism',
          'Industrial Progress',
          'Racial Identity and Pride',
          'Romanticism'
        ],
        correctAnswer: 2
      },
      {
        type: 'multiple-choice',
        id: 'pp_q8',
        question: 'Which technique did Sylvia Plath often use to convey intense emotion in her poetry?',
        options: [
          'Scientific language',
          'Abstract symbolism',
          'Vivid, personal imagery',
          'Jazz rhythm'
        ],
        correctAnswer: 2
      },
      {
        type: 'multiple-choice',
        id: 'pp_q9',
        question: 'Which of the following is a common feature of Hughes\'s poetry style?',
        options: [
          'Confessional tone',
          'Jazz-inspired rhythm',
          'Classical structure',
          'Complex philosophical themes'
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
