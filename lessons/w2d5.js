/* Week 2, Day 5. Lesson content only: no layout or logic here.
   Source: DEC15 Teacher's Book sessions 16A, 17A, 18A, 19A. Timings are the redesign's, not the book's. */
DEC.lessons.w2d5 = {
  id: 'w2d5', week: 2, day: 5,
  title: 'Judging sources, setting goals, planning Essay 1',
  theme: 'Food waste and food insecurity',
  intro: 'Today you decide when AI helps your learning, turn feedback into goals, learn to question what you read, and leave with a plan for Monday\'s essay.',
  outcomes: [
    'Decide when using AI is acceptable in an academic task, and explain why.',
    'Turn feedback on your Research Summary Discussion into 3 to 5 clear goals.',
    'Tell facts from opinions, and spot assumptions and bias in a text.',
    'Take notes from three sources and plan an argument essay that answers the question.'
  ],
  officialOutcomes: {
    '16A AST: AI': ['Evaluate when the use of AI is appropriate or inappropriate in academic tasks.'],
    '17A AST: Feedback literacy: Taking action': ['revise homework on Self-Regulation and Monitoring.', 'understand teacher feedback on the Research Summary Discussion task', 'reflect on your overall performance in a group task and devise a group strategy for improvement'],
    '18A AST: Criticality: Engaging with sources': ['Distinguish between facts and opinions in academic texts.', 'Recognise assumptions and biases in arguments.', 'Evaluate the limitations of academic texts.'],
    '19A Academic writing skills workshop setup': ['understand what a writing question is asking you to do', 'select relevant information and take notes from sources in response to a writing question', 'take a position and plan a response to a writing question']
  },
  blocks: [
    { id: 'A', title: 'AI: use it or not?', summary: 'University rules, then a quick decision test.' },
    { id: 'B', title: 'Feedback into action', summary: 'From your discussion feedback to new goals.' },
    { id: 'C', title: 'Thinking critically about sources', summary: 'Facts, opinions, evidence, assumptions, bias.' },
    { id: 'D', title: 'Essay 1: from sources to a plan', summary: 'Question, notes, position, outline.' }
  ],

  stages: [
  /* ================= BLOCK A ================= */
  { id: 'a1', block: 'A', minutes: 8, title: 'What do the AI rules say?', labels: ['core'], mode: 'Alone, then pairs',
    goal: 'Check what you remember from yesterday\'s homework on the University of Sydney AI rules.',
    activities: [
      { type: 'scenarios', title: 'Six situations', who: 'Alone (5 min), then compare with a partner',
        howto: 'Choose the best answer. If you are wrong, read the reason and try again.',
        teacher: 'This replaces the 10 multiple-choice and True/False questions in the Teacher\'s Book. The answers are the same as the book\'s key. Ask pairs to explain question 6 in their own words.',
        items: [
          { q: 'Your unit coordinator has not mentioned AI for an assignment. What should you do?', options: ['Use AI freely without citation', 'Avoid using AI for the assessment', 'Use AI but don\'t tell anyone', 'Submit AI-generated work with a disclaimer'], answer: 1, explain: 'No instructions means no permission. Using AI is not allowed unless the unit coordinator says so.' },
          { q: 'Who tells students whether AI use is permitted in an assessment?', options: ['The Vice Chancellor', 'The librarian', 'The unit coordinator', 'The IT department'], answer: 2, explain: 'The unit coordinator decides for each unit and assessment.' },
          { q: 'Your unit coordinator allows generative AI. What is required?', options: ['Acknowledge and reference all AI use', 'Use AI without acknowledgment', 'Only use AI for grammar checks', 'Submit AI work without editing'], answer: 0, explain: 'Even when AI is allowed, every use must be acknowledged and referenced.' },
          { q: 'Which of these is an academic integrity breach?', options: ['Using AI for initial brainstorming', 'Citing AI in your bibliography', 'Submitting AI-generated content without citation', 'Using AI tools for practice'], answer: 2, explain: 'Submitting AI content without citing it is a breach.' },
          { q: 'A student uses AI to complete a task and does not acknowledge it. This may be considered...', options: ['Research assistance', 'Contract cheating', 'Peer collaboration', 'A valid learning strategy'], answer: 1, explain: 'The university policy says this may count as contract cheating.' },
          { q: 'Mei\'s coordinator allows AI. She acknowledges it correctly, but AI wrote most of her essay. Is this acceptable?', options: ['Yes. Acknowledging AI makes it acceptable.', 'No. Work primarily produced by AI must not be submitted, even if acknowledged.', 'Yes, if it helped her finish faster.'], answer: 1, explain: 'Students must not submit work primarily produced by AI, even when it is properly acknowledged. Saving time is never a reason.' }
        ] }
    ] },

  { id: 'a2', block: 'A', minutes: 6, title: 'Cogniti and Copilot: what did you find?', labels: ['core'], mode: 'Groups',
    goal: 'Share what you learned from trying two AI tools in yesterday\'s homework.',
    activities: [
      { type: 'discuss', title: 'Group talk', who: 'Groups of 3',
        questions: ['What did you ask the Cogniti agent to do? Was it easy to use?', 'Did you notice any limitations?', 'You compared answers from Vanilla (Cogniti) and Copilot. How were they similar? How were they different?', 'Which one do you prefer, and why?'],
        frames: ['I asked it to...', 'One limitation I noticed was...', 'Both answers..., but...', 'I prefer... because...', 'Did you find the same thing?'] }
    ] },

  { id: 'a3', block: 'A', minutes: 7, title: 'AI or not? Your first decision', labels: ['core'], mode: 'Pairs',
    goal: 'Make a quick first decision. There is no checking yet: you will test your answers in the next stage.',
    activities: [
      { type: 'prose', title: 'Before you start', html: '<p>Other than yesterday\'s homework, have you used AI this week? Tell your partner what for.</p>' },
      { id: 'sort1', type: 'sort', noCheck: true, title: 'Could AI be used for this task?', who: 'Pairs: agree before you click',
        bins: [{ id: 'Y', label: 'AI could be used' }, { id: 'N', label: 'AI is unnecessary' }],
        items: [
          { text: 'Participating in a peer-review activity during class.', answer: 'N' },
          { text: 'Generating a list of academic vocabulary with definitions for your field of study.', answer: 'Y' },
          { text: 'Revising grammar and punctuation in an essay draft.', answer: 'Y' },
          { text: 'Preparing an introduction for an essay.', answer: 'N' },
          { text: 'Generating possible research questions for a presentation.', answer: 'Y' },
          { text: 'Preparing a short speech for an academic seminar.', answer: 'N' },
          { text: 'Responding to an essay question during an in-class test.', answer: 'N' },
          { text: 'Summarizing a lengthy academic journal article.', answer: 'Y' },
          { text: 'Engaging in a group discussion during a tutorial.', answer: 'N' },
          { text: 'Generating examples of paraphrased sentences for practice.', answer: 'Y' },
          { text: 'Writing an email to a lecturer asking for clarification about an assignment.', answer: 'N' },
          { text: 'Brainstorming counterarguments for a discussion or essay.', answer: 'Y' }
        ] }
    ] },

  { id: 'a4', block: 'A', minutes: 9, title: 'Three questions before you use AI', labels: ['core'], mode: 'Pairs, then class',
    goal: 'Use a simple 3-step test to check your first decisions.',
    activities: [
      { type: 'html', title: 'The 3-step test', html:
        '<svg viewBox="0 0 760 210" role="img" aria-labelledby="ai3t ai3d" style="width:100%;height:auto">' +
        '<title id="ai3t">Three questions to ask before using AI</title><desc id="ai3d">Question 1: Does the task need my own input, creativity or reflection? Question 2: Will AI help me learn, or take the learning away? Question 3: Is this an in-class task or assessment where AI is not allowed? If yes to 1 or 3, or AI takes the learning away, do it yourself.</desc>' +
        '<g font-family="Atkinson Hyperlegible, Arial" font-size="15" fill="#424242">' +
        '<rect x="0" y="10" width="230" height="130" rx="6" fill="#FCEDE2"/><text x="16" y="40" font-weight="700" fill="#B8361C">1. Me?</text><text x="16" y="66">Does it need my own</text><text x="16" y="86">opinion, creativity</text><text x="16" y="106">or reflection?</text>' +
        '<rect x="265" y="10" width="230" height="130" rx="6" fill="#FCEDE2"/><text x="281" y="40" font-weight="700" fill="#B8361C">2. Learning?</text><text x="281" y="66">Will AI help me learn,</text><text x="281" y="86">or take the practice</text><text x="281" y="106">away from me?</text>' +
        '<rect x="530" y="10" width="230" height="130" rx="6" fill="#FCEDE2"/><text x="546" y="40" font-weight="700" fill="#B8361C">3. Allowed?</text><text x="546" y="66">Is it an in-class task</text><text x="546" y="86">or assessment where</text><text x="546" y="106">AI is not allowed?</text>' +
        '<path d="M232 75h28M497 75h28" stroke="#E64626" stroke-width="3"/><path d="M252 68l10 7-10 7M517 68l10 7-10 7" fill="#E64626"/>' +
        '<text x="0" y="178" font-weight="700" fill="#000">If any answer points to you, do it yourself.</text><text x="0" y="200">Example: paraphrase on your own first, then you may compare with AI to learn.</text>' +
        '</g></svg>' },
      { id: 'sort2', type: 'sort', compareWith: 'a3:sort1', title: 'Check your decisions', who: 'Pairs',
        howto: 'Your first answers are copied here. Change any you now disagree with ("changed" appears), then check.',
        teacher: 'Answers follow the Teacher\'s Book "Suggested answers". Invite disagreement: several items (e.g. summarizing an article) depend on the purpose of the task.',
        bins: [{ id: 'Y', label: 'AI could be used' }, { id: 'N', label: 'AI is unnecessary' }],
        items: [
          { text: 'Participating in a peer-review activity during class.', answer: 'N', why: 'Feedback to a classmate should come from your own evaluation.' },
          { text: 'Generating a list of academic vocabulary with definitions for your field of study.', answer: 'Y', why: 'AI can quickly compile specialized word lists.' },
          { text: 'Revising grammar and punctuation in an essay draft.', answer: 'Y', why: 'AI can suggest corrections and improve clarity.' },
          { text: 'Preparing an introduction for an essay.', answer: 'N', why: 'An introduction should show your own understanding of the topic.' },
          { text: 'Generating possible research questions for a presentation.', answer: 'Y', why: 'AI can offer different research angles.' },
          { text: 'Preparing a short speech for an academic seminar.', answer: 'N', why: 'Public speaking skills need your own effort.' },
          { text: 'Responding to an essay question during an in-class test.', answer: 'N', why: 'In-class assessments test your independent thinking and writing.' },
          { text: 'Summarizing a lengthy academic journal article.', answer: 'Y', why: 'AI can reduce reading time with a summary (but check it against the article).' },
          { text: 'Engaging in a group discussion during a tutorial.', answer: 'N', why: 'Participation depends on your own ideas and communication.' },
          { text: 'Generating examples of paraphrased sentences for practice.', answer: 'Y', why: 'Useful for practice, after you try first.' },
          { text: 'Writing an email to a lecturer asking for clarification about an assignment.', answer: 'N', why: 'Direct communication needs a personal tone and clear purpose.' },
          { text: 'Brainstorming counterarguments for a discussion or essay.', answer: 'Y', why: 'AI can suggest opposing views to strengthen an argument.' }
        ] },
      { type: 'discuss', title: 'Class check', who: 'Whole class',
        questions: ['Which decision did you change? Which of the 3 questions changed your mind?', 'This afternoon you will plan an essay. Should you use AI for that? Why not?'],
        frames: ['We changed... because...', 'Question... made us think...', 'If AI plans the essay, I won\'t...'] }
    ] },

  /* ================= BLOCK B ================= */
  { id: 'b1', block: 'B', minutes: 5, title: 'Read your discussion feedback', labels: ['core'], mode: 'Alone',
    goal: 'Understand the teacher feedback on yesterday\'s Research Summary Discussion.',
    activities: [
      { type: 'steps', title: 'Open your feedback', who: 'Alone',
        teacher: 'Before class, send each group its "Teacher Feedback" document (Canvas message). Visit each group during b2 and b3 to answer questions about the feedback.',
        steps: ['Open the <strong>Teacher Feedback</strong> document your teacher sent you<span class="canvas-link" data-canvas="rsdFeedback"></span>.', 'Read it once for the main message. Read it again and underline one strength and one thing to improve.', 'Save it in your <strong>DEC15 Research Summary Discussion</strong> folder, next to your self-reflection form.'] },
      { type: 'form', title: 'Notes for your teacher', sections: [{ fields: [
        { id: 'strength', label: 'One strength in my feedback', short: true },
        { id: 'improve', label: 'One thing to improve', short: true },
        { id: 'question', label: 'A question I want to ask my teacher (optional)', short: true }] }] }
    ] },

  { id: 'b2', block: 'B', minutes: 8, title: 'Self-regulation: what worked for you?', labels: ['core'], mode: 'Discussion groups',
    goal: 'Recall the tools and ideas from the self-regulation homework and decide how useful they were.',
    activities: [
      { type: 'discuss', title: 'Recall and discuss', who: 'Sit with your discussion group from yesterday (not your research group)',
        teacher: 'Use this time to visit groups and answer feedback questions.',
        questions: ['What useful tools were introduced in the homework? How do you use them, and why are they useful?', 'How does self-regulation help academic success beyond writing tasks?', 'How do strong self-regulation skills help in group projects or presentations?'],
        frames: ['One tool I tried was... It helps you...', 'For example, when I..., I...', 'In a group, it means everyone...'],
        models: ['<strong>Pomodoro timer</strong> (e.g. Pomofocus): list your tasks, work for 25 minutes, then take a 5-minute break.', '<strong>Goblin.tools</strong>: type in a big task and it breaks it into smaller steps.', 'Self-regulation helps you track progress, change strategies when needed and finish work on time. It also makes you a more independent learner.', 'In groups, everyone takes responsibility for their part and manages time to meet group deadlines.'] },
      { type: 'html', title: 'The four skills you are aiming for', html:
        '<ol class="qlist"><li><strong>Before the task:</strong> Can analyse the task requirements, set detailed goals, anticipating potential obstacles and planning ways to overcome them.</li><li><strong>During the task:</strong> Can apply specific strategies to manage and monitor their time and effort effectively during the learning process.</li><li><strong>After the task and ongoing:</strong> Can evaluate their learning outcomes against their set goals, analysing their performance and planning for future learning tasks.</li><li><strong>After the task and ongoing:</strong> Can keep a record of spoken and written \u2018recurrent mistakes\u2019 to facilitate conscious self-monitoring.</li></ol><p class="howto">Which one are you most confident with? Which one is hardest? Tell your group in one sentence each.</p>' }
    ] },

  { id: 'b3', block: 'B', minutes: 20, title: 'Poster: how to reach one skill', labels: ['core'], mode: 'Groups, off screen',
    goal: 'Make a practical poster for other students, then learn from other groups\' posters.',
    activities: [
      { type: 'steps', offscreen: true, title: 'Make the poster (12 min)', who: 'Discussion groups',
        teacher: 'Assign each group one of the four skills (doubling up is fine). Hand out butcher\'s paper or A3 and colored pens. Optional: vote on the best poster and ask students why.',
        steps: ['Your teacher gives your group one of the four skills from the last stage.', 'Plan quickly below, then make a poster on paper with <strong>practical suggestions</strong>: what to do, which tools help, and how to deal with common problems.', 'Keep it visual: a title, 3 to 5 tips, one drawing or diagram.'] },
      { type: 'form', title: 'Quick plan', sections: [{ fields: [
        { id: 'skill', label: 'Our skill (1, 2, 3 or 4)', short: true },
        { id: 'tips', label: 'Strategies that worked for us', rows: 3 },
        { id: 'tools', label: 'Tools that help (from the homework or your own)', rows: 2 },
        { id: 'problems', label: 'A common problem and how to solve it', rows: 2 }] }] },
      { type: 'discuss', offscreen: true, title: 'Gallery walk (8 min)', who: 'Whole class, standing',
        questions: ['Walk around and read every poster.', 'Write one question or one "I\'ll try this" note for each poster.', 'Back in your seat: which tip will you actually use next week?'],
        frames: ['Why did you choose...?', 'How exactly do you...?', 'I\'ll try... because...'] }
    ] },

  { id: 'b4', block: 'B', minutes: 12, title: 'New goals for Weeks 3 and 4', labels: ['core', 'exam'], mode: 'Research groups, then alone',
    goal: 'Use your peer and teacher feedback to set 3 to 5 specific goals for the second Research Summary Discussion.',
    activities: [
      { type: 'discuss', title: 'Look back as a group', who: 'Your original research group',
        teacher: 'If students wrote "Needs work" for anything in their Action Plan, they must add at least one point for it. Encourage constructive criticism between group members.',
        questions: ['Would you like to change anything in your self-reflection form? Is anything missing from "Comments"?', 'Did the problems you predicted happen? Did your strategies work?', 'Did you make progress on the skills in your "Goal Setting" section?', 'Overall, how do you feel about your participation?'],
        frames: ['We predicted..., and it happened / didn\'t happen.', 'Our strategy of... worked because...', 'Next time, we should...'] },
      { type: 'prose', title: 'What makes a good goal?', html:
        '<p><strong>Too vague:</strong> "Improve my speaking."</p><p><strong>Clear and checkable:</strong> "In the Week 4 discussion, I will build on at least two classmates\' points, using phrases like <em>Building on what Ana said...</em>"</p>' },
      { type: 'form', title: 'Updated goals for Weeks 3 and 4', print: true, sections: [
        { title: 'What the feedback told me', fields: [
          { id: 'peer', label: 'Peer feedback (from yesterday)', rows: 3 },
          { id: 'teacher', label: 'Teacher feedback', rows: 3 }] },
        { title: 'My new goals (3 to 5)', fields: [
          { id: 'g1', label: 'Goal 1', short: true }, { id: 'g2', label: 'Goal 2', short: true }, { id: 'g3', label: 'Goal 3', short: true },
          { id: 'g4', label: 'Goal 4 (optional)', short: true }, { id: 'g5', label: 'Goal 5 (optional)', short: true }] }] },
      { type: 'checklist', title: 'Check your goals', items: ['Each goal says <strong>what</strong> I will do, not just what I want to improve.', 'Each goal is linked to my peer or teacher feedback.', 'I could check later whether I did it.', 'At least one goal is about how I prepare, not only how I speak.'] }
    ] },

  /* ================= BLOCK C ================= */
  { id: 'c1', block: 'C', minutes: 7, title: 'Remember the CRAAP test?', labels: ['core'], mode: 'Pairs',
    goal: 'Recall the five checks for judging whether a source is reliable.',
    activities: [
      { type: 'match', title: 'Match each question to the letter', who: 'Pairs',
        options: ['Currency', 'Relevance', 'Authority', 'Accuracy', 'Purpose'],
        items: [
          { text: 'When was it published or last updated? Is it too old for this topic?', answer: 'Currency' },
          { text: 'Does it actually help answer my question?', answer: 'Relevance' },
          { text: 'Who wrote it? Are they qualified, or a trusted organization?', answer: 'Authority' },
          { text: 'Is it supported by evidence? Can I check the information?', answer: 'Accuracy' },
          { text: 'Why was it written: to inform, persuade, sell, or give an opinion?', answer: 'Purpose' }
        ], after: 'CRAAP = Currency, Relevance, Authority, Accuracy, Purpose.' },
      { type: 'discuss', title: 'Why does it matter?', who: 'Pairs',
        questions: ['Why is the CRAAP test important when you choose research sources?', 'How can you check if the person or group who wrote a source is trustworthy?'],
        models: ['It checks if a source is reliable and useful. Not all sources are accurate or unbiased, especially online.', 'Look at the author\'s qualifications, job, or where they work or study. For a group, check if it is a well-known university, research centre or trusted organization.'] },
      { type: 'prose', title: 'Today\'s next step', html: '<p>CRAAP helps you decide <em>which</em> sources to use. Today you go further: inside a source, which statements are facts, which are opinions, what is assumed, and what is left out? This is how you find a source\'s <strong>limitations</strong>, and it stops you building an argument on weak evidence.</p>' }
    ] },

  { id: 'c2', block: 'C', minutes: 10, title: 'Fact or opinion?', labels: ['core'], mode: 'Pairs',
    goal: 'Separate statements that can be checked from statements that show beliefs.',
    activities: [
      { type: 'prose', title: 'The difference', html: '<p>A <strong>fact</strong> can be <strong>verified</strong> as true or false with evidence. It stays the same whatever people believe.</p><p>An <strong>opinion</strong> shows <strong>personal beliefs, interpretations or emotions</strong>. It can vary from person to person.</p><p class="howto">Opinion signals: <em>should, must, too, will solve, best, worst, careless</em>.</p>' },
      { type: 'sort', title: 'Sort the statements', who: 'Pairs: say why before you click',
        bins: [{ id: 'F', label: 'Fact' }, { id: 'O', label: 'Opinion' }],
        items: [
          { text: 'Approximately one-third of all food produced globally is wasted each year.', answer: 'F', why: 'A measurable amount that can be checked.' },
          { text: 'Insects and alternative proteins are being explored as sustainable solutions to reduce food waste.', answer: 'F', why: 'We can check that this research is happening.' },
          { text: 'Technology, such as smart fridges and AI-driven food tracking, will solve the food waste problem.', answer: 'O', why: '"Will solve" is a prediction and a belief, not something we can verify now.' },
          { text: 'Some countries, like France, have laws requiring supermarkets to donate unsold food to charities instead of throwing it away.', answer: 'F', why: 'Laws can be checked.' },
          { text: 'People are too careless about throwing away food, and stricter policies should be implemented.', answer: 'O', why: '"Too careless" and "should" show judgment.' },
          { text: 'In the U.S., about 30 percent (66.5 million tons) of edible food is wasted each year after it leaves the farm. <span class="note-saved">(Royer, 2024)</span>', answer: 'F', why: 'A figure with a source (Buzby et al., 2014).' },
          { text: 'Addressing this problem could greatly improve health, the economy, and social conditions in the U.S. <span class="note-saved">(Royer, 2024)</span>', answer: 'O', why: 'The writer\'s claim. Notice "could": it is hedged, but still an opinion that needs support.' }
        ] }
    ] },

  { id: 'c3', block: 'C', minutes: 12, title: 'Strong or weak evidence?', labels: ['core', 'exam'], mode: 'Groups',
    goal: 'Recognize evidence that is specific and sourced, and improve weak claims.',
    activities: [
      { type: 'prose', title: 'What makes evidence strong?', html: '<p><strong>Reliable evidence</strong> is based on verifiable data, research or expert opinion from credible sources. It is relevant and free from bias.</p><p><strong>Weak evidence</strong> comes from unverified sources or personal stories, or has no citation. <strong>Biased evidence</strong> chooses data selectively or uses persuasive language instead of facts.</p>' },
      { type: 'sort', title: 'Which statements are stronger?', who: 'Groups',
        bins: [{ id: 'S', label: 'Stronger' }, { id: 'W', label: 'Weaker' }],
        items: [
          { text: 'Research by the Food Waste Reduction Alliance (FWRA, 2023) indicates that supermarkets in the U.S. discard millions of tons of food each year, accounting for a substantial portion of retail food waste.', answer: 'S', why: 'Named source and year.' },
          { text: 'It is suggested that supermarkets waste a large amount of food annually, making them a major contributor to food waste.', answer: 'W', why: '"It is suggested" by whom? No source, no figure.' },
          { text: 'Countries that have implemented awareness campaigns have reported some success in reducing food waste.', answer: 'W', why: 'Which countries? How much success? No source.' },
          { text: 'A study published in Food Tech Journal (2022) found that restaurants using AI-powered monitoring systems reduced food waste by up to 40% over six months.', answer: 'S', why: 'A specific study, a figure and a time period.' },
          { text: 'Many restaurants have started using new technologies to track waste, and some have reported improvements.', answer: 'W', why: '"Many" and "some" are vague, and there is no source.' }
        ] },
      { type: 'writeReveal', title: 'Make a weak statement stronger', who: 'Alone, then compare',
        items: [{ prompt: 'Rewrite: "Many restaurants have started using new technologies to track waste, and some have reported improvements."', model: 'Find relevant evidence and name it: <em>A study published in Food Tech Journal (2022) found that restaurants using AI-powered monitoring systems reduced food waste by up to 40% over six months.</em> Then the reader can check the claim.' }] }
    ] },

  { id: 'c4', block: 'C', minutes: 12, title: 'What is the writer assuming?', labels: ['core'], mode: 'Groups',
    goal: 'Find the hidden idea an argument depends on, and explain why it might be wrong.',
    activities: [
      { type: 'prose', title: 'Assumptions', html: '<p>An <strong>assumption</strong> is an unstated idea that an argument relies on. Assumptions often go unquestioned, and that can make the reasoning weak.</p><div class="frames"><span class="frame">This assumes that...</span><span class="frame">This may not be true because...</span><span class="frame">Other factors such as... also...</span></div>' },
      { type: 'writeReveal', title: 'Find the assumption and the flaw', who: 'Each group takes two statements, then shares with the class', minChars: 10,
        teacher: 'Model the first one aloud. Assign statements 2 to 5 to groups so every statement is covered, then groups report back.',
        items: [
          { prompt: '"If supermarkets sell food at a discount before expiration, customers will always buy it instead of wasting it."', model: '<strong>Assumption:</strong> Price is the only factor in customers\' decisions. <strong>Flaw:</strong> Some customers may still avoid near-expiry food because of freshness concerns or poor meal planning.' },
          { prompt: '"If the government mandates food waste reduction strategies in schools, children will develop lifelong habits of responsible consumption."', model: '<strong>Assumption:</strong> Education alone is enough to change long-term behavior. <strong>Flaw:</strong> Parental influence, cultural norms and socioeconomic status also shape habits.' },
          { prompt: '"Supermarkets contribute to food waste because they provide too many choices for consumers."', model: '<strong>Assumption:</strong> Fewer product choices would directly lead to less waste. <strong>Flaw:</strong> Waste also comes from consumer habits, storage problems and supply chain inefficiencies.' },
          { prompt: '"Composting leftover food is an environmentally friendly way to manage waste."', model: '<strong>Assumption:</strong> Composting always benefits the environment more than other strategies. <strong>Flaw:</strong> Preventing waste in the first place has a greater impact, and transporting and processing compost has its own environmental costs.' },
          { prompt: '"Businesses that charge customers for food waste will significantly reduce waste levels."', model: '<strong>Assumption:</strong> Financial penalties alone will change behavior. <strong>Limitation:</strong> Convenience, lack of awareness and limited alternatives may still lead to waste. Some people may pay rather than change.' }
        ] }
    ] },

  { id: 'c5', block: 'C', minutes: 8, title: 'Tone: neutral or pushing you?', labels: ['core', 'exam'], mode: 'Pairs',
    goal: 'Notice how word choice makes a sentence neutral, persuasive or biased.',
    activities: [
      { type: 'match', title: 'Match each sentence to its tone', who: 'Pairs',
        options: ['Neutral', 'Persuasive', 'Critical / blaming', 'Optimistic / encouraging'],
        items: [
          { text: '<em>Supermarkets are more interested in profits than sustainability, rejecting perfectly edible produce just because it doesn\'t look perfect.</em>', answer: 'Critical / blaming' },
          { text: '<em>We must take urgent steps to reduce food waste before it causes irreversible damage to our environment.</em>', answer: 'Persuasive' },
          { text: '<em>Approximately one-third of all food produced globally is wasted each year, contributing significantly to environmental problems.</em>', answer: 'Neutral' },
          { text: '<em>Many innovative solutions, like food-sharing apps and zero-waste grocery stores, are already helping people waste less food.</em>', answer: 'Optimistic / encouraging' }
        ] },
      { type: 'discuss', title: 'Which words create the tone?', who: 'Pairs',
        questions: ['Find the words in each sentence that create its tone.', 'For your essay, which tone should you use most of the time? Why?'],
        models: ['Critical: <em>more interested in profits, just because, perfectly edible</em>.', 'Persuasive: <em>We must, urgent, irreversible damage</em>.', 'Neutral: <em>Approximately</em>, a figure, no emotional words.', 'Optimistic: <em>innovative, already helping</em>.', 'Academic essays use a mostly neutral tone. A neutral tone makes you sound more credible; an emotional tone can signal bias.'] }
    ] },

  { id: 'c6', block: 'C', minutes: 12, title: 'Whose voice is missing?', labels: ['core'], mode: 'Pairs',
    goal: 'Analyze bias in a short paragraph about government food waste policy.',
    activities: [
      { type: 'prose', title: 'Bias', html: '<p><strong>Bias</strong> happens when a writer favors one perspective, for example by leaving out facts, using emotional language or choosing only some evidence.</p>' },
      { type: 'writeReveal', title: 'Analyze the paragraph', who: 'Pairs', minChars: 5, modelLabel: 'Suggested answer',
        items: [
          { source: 'The government is taking significant steps to address the growing problem of food waste through new policies and initiatives. Regulations requiring supermarkets and restaurants to donate surplus food instead of discarding it will help reduce unnecessary waste and support struggling families. Tax incentives for businesses that participate in food redistribution programs further encourage responsible practices. While some critics argue that these policies place an unfair burden on businesses, it is the government\u2019s responsibility to ensure a sustainable and equitable food system. By enforcing stricter regulations and increasing public awareness, food waste can be drastically reduced, benefiting both the economy and the environment.', prompt: 'Whose perspective dominates the text?', model: 'The government, policymakers and regulators.', rows: 2 },
          { prompt: 'What perspectives are missing?', model: 'The food industry and businesses, low-income consumers, environmental groups.', rows: 2 },
          { prompt: 'Is there emotional or persuasive language? Give examples.', model: '\u2018significant steps\u2019, \u2018unnecessary waste\u2019, \u2018ensure a sustainable and equitable food system\u2019, \u2018drastically reduced\u2019.', rows: 2 },
          { prompt: 'Who benefits from the argument?', model: 'For example, the government, food banks and social programs.', rows: 2 },
          { prompt: 'Does the author present opposing views fairly?', model: 'Not really. Critics are mentioned in one clause, but the text does not explain how businesses might struggle to comply.', rows: 2 }
        ] }
    ] },

  { id: 'c7', block: 'C', minutes: 14, title: 'Evaluate this week\'s readings', labels: ['core', 'exam'], mode: 'Jigsaw: alone, threes, pairs',
    goal: 'Apply everything from this block to a real source you will use in your essay.',
    activities: [
      { type: 'steps', title: 'How this works', who: 'Teacher assigns half the class to each text',
        teacher: 'Assign half the class Tchonkouang et al. (2023) and half Royer (2024). Students work alone (6 min), then in threes with the same text (4 min), then pair with someone who read the other text (4 min). The Teacher\'s Book sets this for homework; here it is done in class because it feeds directly into this afternoon\'s notes.',
        steps: ['Open your assigned text. Work alone and complete the frame below.', 'Compare with two classmates who read the <strong>same</strong> text. Add anything you missed.', 'Pair with someone who read the <strong>other</strong> text. Which text is more persuasive? Why?'] },
      { type: 'texts', title: 'Texts', texts: ['tchonkouang2023', 'royer2024'] },
      { type: 'form', title: 'Evaluation frame', sections: [{ fields: [
        { id: 'text', label: 'My text', short: true, placeholder: 'Tchonkouang et al. (2023) or Royer (2024)' },
        { id: 'facts', label: '2 facts', hint: 'What makes them reliable? Are they sourced or just stated? Note the paragraph letter.', rows: 3 },
        { id: 'opinions', label: '2 opinions', hint: 'Are they presented as facts? How do they influence the reader?', rows: 3 },
        { id: 'evidence', label: 'Evidence', hint: 'Is it from credible sources?', rows: 2 },
        { id: 'assume', label: 'Assumptions', hint: 'What is taken for granted? How does this shape the argument?', rows: 2 },
        { id: 'bias', label: 'Bias', hint: 'What perspectives are included or excluded? Who benefits?', rows: 2 },
        { id: 'tone', label: 'Strong tone', hint: 'Which words persuade or influence the reader?', rows: 2 }] }] },
      { type: 'discuss', title: 'Compare across texts', who: 'Pairs (different texts)',
        questions: ['Which reading is more persuasive? Why?', 'Which one gives you more useful evidence for this afternoon\'s essay question?'],
        frames: ['Tchonkouang et al. (2023) relies on..., whereas Royer (2024)...', 'One limitation of... is that it does not...', 'I would use... as evidence for... because...'] }
    ] },

  /* ================= BREAK ================= */
  { id: 'break', block: 'D', minutes: 10, title: 'Break', labels: [], mode: '', goal: 'Ten minutes away from the screen.', activities: [] },

  /* ================= BLOCK D ================= */
  { id: 'd1', block: 'D', minutes: 10, title: 'What is the question asking?', labels: ['exam'], mode: 'Pairs',
    goal: 'Understand exactly what Essay 1 asks you to do before you take any notes.',
    activities: [
      { type: 'html', title: 'Essay 1', html: '<div class="source-q" style="font-size:1.25em"><strong>How critical is addressing food waste as a strategy to combat global food insecurity?</strong><br><span class="note-saved">Argument essay, 450 to 600 words. You will write it in class on Monday (Week 3).</span></div>' },
      { type: 'wordpick', title: 'Tap the content words', who: 'Pairs',
        howto: 'Content words tell you the topic. Tap them, then check.',
        teacher: 'From the Teacher\'s Book: content words = food waste / food insecurity; limiting words = critical / food waste (this one cause is the focus). Students only need the input from this week. They do not need the other causes from Week 1.',
        text: 'How critical is addressing food waste as a strategy to combat global food insecurity?',
        targets: ['food', 'waste', 'insecurity'], explain: 'Yes: <strong>food waste</strong> and <strong>food insecurity</strong>.' },
      { type: 'writeReveal', title: 'Limits and task', who: 'Pairs', minChars: 8, modelLabel: 'Answer',
        items: [
          { prompt: 'Which words limit or focus your answer?', model: '<strong>How critical</strong>: you must judge how important it is. <strong>Food waste</strong>: focus on this one cause only, not all the causes from Week 1.', rows: 2 },
          { prompt: 'What is the question asking you to do?', model: 'Examine how important reducing food waste is for improving food availability and food security, and take a position.', rows: 2 },
          { prompt: 'Which rhetorical functions do you need?', model: '<strong>Explain</strong> the causal relationships between food waste and food insecurity, and <strong>evaluate</strong> how important reducing food waste is for improving food security.', rows: 2 }
        ] }
    ] },

  { id: 'd2', block: 'D', minutes: 15, title: 'Language for this essay: cause, effect and paraphrase', labels: ['core', 'exam'], mode: 'Alone, then pairs',
    goal: 'Practise the two language skills the rubric checks most in this essay: linking causes to effects, and using sources in your own words.',
    activities: [
      { type: 'gapfill', title: 'Choose the cause-effect language', who: 'Alone',
        howto: 'Every sentence uses information from this week\'s sources.',
        items: [
          { before: 'Food loss on farms often happens', options: ['because', 'as a result', 'therefore'], answer: 'because', after: 'produce does not look perfect (Tchonkouang et al., 2023).', explain: '"Because" + a clause gives the cause.' },
          { before: 'Food waste', options: ['is responsible for', 'results from', 'is caused by'], answer: 'is responsible for', after: 'roughly 8% of global emissions (Our Changing Climate, 2020).', explain: 'The waste is the cause; the emissions are the effect.' },
          { before: 'Grocery stores overbuy food to look abundant.', options: ['As a result,', 'Because', 'Due to'], answer: 'As a result,', after: 'produce often goes to waste (Our Changing Climate, 2020).', explain: '"As a result," starts a new sentence that gives the effect.' },
          { before: 'Households throw away edible food', options: ['due to', 'so that', 'leads to'], answer: 'due to', after: 'unclear expiration dates (Our Changing Climate, 2020).', explain: '"Due to" + a noun phrase gives the cause.' },
          { before: 'Food waste in landfills produces methane, which', options: ['contributes to', 'is caused by', 'results from'], answer: 'contributes to', after: 'climate change (Royer, 2024).', explain: 'Methane is one of several causes of climate change, so "contributes to" is more accurate than "causes".' },
          { before: 'Reducing food waste could', options: ['lead to', 'result from', 'be due to'], answer: 'lead to', after: 'less hunger and a smaller environmental impact (Tchonkouang et al., 2023).', explain: '"Lead to" + the effect. "Could" hedges the claim.' }
        ] },
      { type: 'prose', title: 'Why paraphrasing matters so much', html: '<p>In the rubric, if 50% or more of your essay is copied from the sources, <strong>Use of Sources cannot score above 50</strong>, and Connection of Ideas, Vocabulary and Grammar cannot score above 60. Paraphrase in your notes now, and you won\'t copy on Monday.</p><p class="howto">Method: read, cover the source, write the idea from memory, check the meaning, add the citation.</p>' },
      { type: 'paraphrase', title: 'Paraphrase two key ideas', who: 'Alone, then swap with a partner',
        items: [
          { source: 'By improving food rescue and redistribution programs, we could reduce food insecurity and also promote public health by making sure nutritious food reaches those who need it instead of being thrown away.', cite: 'Royer, 2024, para. E', model: 'Royer (2024) argues that stronger food rescue and redistribution schemes could lower food insecurity and improve public health, as nutritious food would go to people in need rather than to landfill.' },
          { source: 'If all the food currently getting thrown in the landfill every year was instead diverted into meals for those in need, we\u2019d be able to feed as many as 1.8 billion people.', cite: 'Our Changing Climate, 2020, section B', model: 'According to Our Changing Climate (2020), the food discarded each year could feed up to 1.8 billion people if it were redirected to those who need it.' }
        ] }
    ] },

  { id: 'd3', block: 'D', minutes: 20, title: 'Listen again: notes for the essay', labels: ['core', 'exam'], mode: 'Alone, by hand',
    goal: 'Take handwritten notes from the listening that answer Essay 1, as you will in the assessment.',
    activities: [
      { type: 'discuss', title: 'Before you listen (3 min)', who: 'Pairs',
        questions: ['You heard this video on Monday. What do you remember about why food is wasted?', 'Which parts will help you answer "How critical is addressing food waste..."?'],
        frames: ['I remember that...', 'The part about... will be useful because...'] },
      { type: 'steps', offscreen: true, title: 'Take notes on paper', who: 'Alone',
        teacher: 'Play the recording to the whole class. Students take notes by hand on paper, as in the assessment. Ask students to close AI tools and other tabs. The transcript stays locked until notes are finished.',
        steps: ['Use paper and pen. Divide the page into three parts: <strong>Production and market</strong>, <strong>Consumption</strong>, <strong>Environment</strong>.', 'Write key words, numbers and abbreviations only. Use arrows (\u2192) for cause and effect.', 'Only note what helps answer the essay question.'] },
      { type: 'video', title: 'Our Changing Climate (2020)', media: 'occ2020' },
      { type: 'checklist', title: 'Check your notes', howto: 'Tick the ideas you captured. Add any you missed in a different color.',
        items: ['Almost one-third of food produced globally is never eaten (UN FAO); 40% in the U.S.', 'Wasted food could feed up to 1.8 billion people.', 'Food waste causes about 8% of global emissions (energy used + methane in landfills).', 'Imperfect-looking produce is left to rot or sent to landfill.', 'Market prices: 33.7% of produce unharvested in a California study when picking costs more than selling.', 'Grocery stores overbuy to create an "illusion of abundance", so produce is wasted.', '69% of U.S. food waste happens after the point of sale (households, restaurants, food service).', 'Bulk buying, promotions and bigger fridges and plates encourage overbuying.', 'No federal rules on expiration dates, so edible food is thrown away.'] },
      { type: 'html', title: 'Transcript', html: '<p>When your notes are finished, open the transcript to check one section you were unsure about.</p><div class="row" style="margin-top:0"><button class="btn quiet" type="button" data-unlock="occ2020">I have finished my notes: open the transcript</button></div>' }
    ] },

  { id: 'd4', block: 'D', minutes: 15, title: 'Build the group note table', labels: ['exam'], mode: 'Groups of 2 or 3',
    goal: 'Combine notes from all three sources under shared themes, in your own words.',
    activities: [
      { type: 'steps', title: 'How to fill the table', who: 'Groups of 2 or 3: one person types, everyone decides',
        teacher: 'Discourage AI here so students do the thinking. You may model one cell first (grouping similar ideas). Show the sample table only after groups have built their own.',
        steps: ['Add your listening notes to the <strong>Our Changing Climate (2020)</strong> column.', 'Open the two readings and add only information that is <strong>relevant to the question</strong>.', 'Paraphrase as you write, and keep the author and year with every idea.', 'Put a \u2605 next to ideas that appear in <strong>two or more sources</strong>. These are your strongest points.'] },
      { type: 'texts', title: 'Sources', texts: ['tchonkouang2023', 'royer2024', 'occ2020'] },
      { type: 'notetable', title: 'Note-taking table: How critical is addressing food waste as a strategy to combat global food insecurity?',
        columns: ['Tchonkouang et al. (2023)', 'Royer (2024)', 'Our Changing Climate (2020)'],
        themes: ['Production and market (food loss)', 'Consumption (food waste)', 'Environment', 'Hunger and food security'],
        sampleHtml:
        '<table class="note sample"><thead><tr><th>Tchonkouang et al. (2023)</th><th>Royer (2024)</th><th>Our Changing Climate (2020)</th></tr></thead><tbody><tr>' +
        '<td><strong>Production (Food loss)</strong><br>Doesn\u2019t look perfect (Castagna, 2021) - difficult to sell (Santeramo, 2021)<br>Inadequate practices and limited tech. -&gt; large losses during initial production and post-harvest phases (Block et al., 2016)<br>Economic impact for producers: when food quality diminishes so it is discounted or discarded, farmers\u2019 economic stability and profits are undermined.<br><strong>Consumption (Food waste)</strong><br>Overbuying, not eating food before it spoils or misunderstanding food labels (Davenport et al., 2019) and expiration dates (Pandey, 2021)<br>Social cause of waste - in developed countries - consumer-level (domestic) (Tan et al., 2022). Consumer behaviour, values and attitudes significantly influence waste.<br>Australia - Reynolds et al. (2015) - if waste cut by one third, approx 1.8 trillion calories, sufficient to feed 921,000 people for a year<br>UNEP Food Waste Index Report (2021) over 931 million tonnes of food wasted/year globally.<br>UN 2023 report: in 2020 a healthy diet unaffordable for 3 billion; approx. 811 million suffer hunger.<br><strong>Environment</strong><br>Food production is resource-intensive (water, energy, land) - these are also wasted (Rezaei &amp; Liu, 2017).<br>Reducing waste -&gt; less hunger. Focus on prevention of food loss and efficient usage -&gt; closer to zero hunger.</td>' +
        '<td><strong>Consumption</strong><br>Buzby et al. (2014) approx. 30% (66.5 million tons) of edible food in the U.S. wasted annually after leaving farms.<br>Food rescue and redistribution could reduce food insecurity &amp; improve public health.<br><strong>Environment</strong><br>Food wasted by each person in the U.S. annually = 315 pounds of greenhouse gases (King &amp; Hough, 2010)<br>US - 15% of city waste is food (EPA, 2017) -&gt; methane as food rots -&gt; climate change<br>Combating food insecurity means improving economic conditions and tackling inefficiencies in production, distribution and consumption.</td>' +
        '<td>UN FAO - nearly one-third of food never eaten; U.S. 40%.<br>Redirecting landfill food could feed up to 1.8 billion people.<br><strong>Environment</strong><br>Food waste = 8% of GHG emissions; energy for production, transport, processing; methane in landfill.<br><strong>Production/Market</strong><br>Imperfect produce left to rot or discarded. Market prices: if costs &gt; selling price, not harvested (California: 33.7% unharvested). Grocery stores overbuy for an illusion of abundance.<br><strong>Consumption</strong><br>Domestic and food service waste = 69% of U.S. food waste. Bulk-buying promotions, store marketing, larger appliances. No clear rules on expiration dates -&gt; edible food discarded.</td>' +
        '</tr></tbody></table>' }
    ] },

  { id: 'd5', block: 'D', minutes: 7, title: 'Take a position', labels: ['exam'], mode: 'Groups',
    goal: 'An argument essay needs a clear position. Decide yours and find two reasons.',
    activities: [
      { type: 'continuum', title: 'How critical do YOU think it is?', who: 'Decide alone, then explain to your group',
        left: 'Most critical', right: 'Least critical',
        options: ['Addressing food waste is a critical part of the strategy to tackle food insecurity.', 'Addressing food waste is only part of the strategy to tackle food insecurity.', 'Addressing food waste is not a critical part of the strategy to tackle food insecurity.'],
        reasons: ['Reason 1 (which notes in your table support it?)', 'Reason 2 (which notes in your table support it?)'] },
      { type: 'prose', title: 'Be selective', html: '<p>You do <strong>not</strong> need all the information from your notes. Choose the ideas that best support your two reasons, and use all three sources somewhere in the essay.</p>',
        teacher: 'Optional: bring the class together to agree on two strong reasons. In the sample essay the writer thinks addressing food waste is very important, because (1) it helps manage the climate crisis, also a key cause of food insecurity, and (2) better management of resources helps alleviate hunger.' }
    ] },

  { id: 'd6', block: 'D', minutes: 13, title: 'Plan Essay 1', labels: ['exam'], mode: 'Alone or with your group',
    goal: 'Finish an outline you will bring to class on Monday.',
    activities: [
      { type: 'form', title: 'Essay outline', print: true,
        teacher: 'Remind students: most of Monday is spent writing the essay in class, so they must not start writing or use AI to generate a response over the weekend. On Monday they will also study introductions and conclusions.',
        sections: [
          { title: 'Introduction', fields: [
            { id: 'topic', label: 'Topic / problem', short: true }, { id: 'issue', label: 'Issue', short: true },
            { id: 'thesis', label: 'Thesis statement', hint: 'Your position: answer "how critical" directly.', rows: 2 },
            { id: 'p1', label: 'Preview 1', short: true }, { id: 'p2', label: 'Preview 2', short: true }] },
          { title: 'Body paragraph 1', fields: [
            { id: 'b1main', label: 'Main idea', short: true },
            { id: 'b1ev', label: 'Explanation / evidence / examples (with sources)', rows: 4 },
            { id: 'b1end', label: 'Concluding statement', short: true }] },
          { title: 'Body paragraph 2', fields: [
            { id: 'b2main', label: 'Main idea', short: true },
            { id: 'b2ev', label: 'Explanation / evidence / examples (with sources)', rows: 4 },
            { id: 'b2end', label: 'Concluding statement', short: true }] },
          { title: 'Conclusion', fields: [
            { id: 'restate', label: 'Restatement of thesis', short: true }, { id: 'summary', label: 'Summary of main points', short: true },
            { id: 'impl', label: 'Implication / recommendation', short: true }] }] },
      { type: 'checklist', title: 'Before you leave', items: ['My thesis answers <strong>how critical</strong>, not just "food waste is a problem".', 'Each body paragraph has one clear main idea that supports my thesis.', 'My plan uses ideas from <strong>all three</strong> sources.', 'My notes are paraphrased, and every idea has an author and year.', 'I will bring this plan on Monday, and I will not write the essay or use AI before then.'] },
      { type: 'html', title: 'Teacher sample outline', html: '<div class="teacher-only"><details class="why"><summary>Show sample outline (after students finish)</summary><div class="lead" style="font-size:.92em">' +
        '<p><strong>Introduction.</strong> Topic/Problem: pressure on the food system, growing population. Issue: food insecurity (FAO reports (2020) 30% of global pop. food insecure). Thesis: food waste is central to the problem; mitigating waste could profoundly contribute to... Preview: (1) management of climate crisis, also a key cause of food insecurity; (2) better management of resources, helps alleviate hunger.</p>' +
        '<p><strong>Body 1: Reduce impact on the environment.</strong> Food loss at production stage because of (R1 &amp; L1): aesthetics of produce (wholesalers\u2019 appearance requirements, farmers discard imperfect produce); market prices (more costly to harvest, pack and ship than sell). Considerable carbon footprint from energy for production, transport and processing (R1 &amp; L1). Discarded produce goes to landfill, rots and releases methane (L1), climate change (R2), extreme weather, lower yields. Evidence: waste responsible for 8% of global emissions (L1). Concluding statement: less food loss reduces demand for production, curtails emissions and creates a more resource-efficient food system.</p>' +
        '<p><strong>Body 2: Better management/reallocation of resources to address hunger.</strong> Food waste at consumption stage: overbuying, throwing away food before it spoils, misunderstanding labels (R1 &amp; L1). Evidence: UN FAO approx. 30% of all food produced is not consumed (L1); Reynolds et al. (2015): waste cut by a third could feed 921,000 people for a year (R1). Redistribution programs: surplus food to food banks. Concluding statement: redistribution increases food availability, so its importance cannot be overlooked.</p>' +
        '<p><strong>Conclusion.</strong> Restatement: a pivotal and actionable area for improving food security. Summary: saving food from landfill could feed billions and significantly reduce emissions. Implication: a more equitable and efficient food system.</p></div></details></div>' }
    ] },

  { id: 'exit', block: 'D', minutes: 5, title: 'Exit ticket', labels: ['core'], mode: 'Alone',
    goal: 'Check what you can do now.',
    activities: [
      { type: 'checklist', title: 'I can...', items: ['explain when AI is and isn\'t appropriate for a task.', 'write a specific goal based on feedback.', 'tell a fact from an opinion and name an assumption in a text.', 'take relevant notes from three sources and plan an argument essay.'] },
      { type: 'form', title: 'One more thing', sections: [{ fields: [{ id: 'q', label: 'One thing I\'m still unsure about', short: true }] }] }
    ] }
  ],

  /* ---------- optional home practice ---------- */
  extras: [
    { id: 'x1', title: 'Watch the full original video', category: 'Extra listening', minutes: 15,
      target: 'Listening stamina, and a preview of Week 3 (solutions).',
      activities: [
        { type: 'video', title: 'Our Changing Climate (2020), full YouTube version', media: 'occ2020' },
        { type: 'prose', title: 'Task', html: '<p>The class transcript is an adapted version. The full video continues after the causes and explains <strong>how we can fix food waste</strong>. Watch the second part and note <strong>three solutions</strong>. You will need ideas like these in Week 3.</p>' },
        { type: 'form', title: 'Your notes', sections: [{ fields: [{ id: 's1', label: 'Solution 1', short: true }, { id: 's2', label: 'Solution 2', short: true }, { id: 's3', label: 'Solution 3', short: true }] }] }
      ] },
    { id: 'x2', title: 'Collocations from this week\'s sources', category: 'Vocabulary builder', minutes: 8,
      target: 'Accurate collocations (rubric: Vocabulary Accuracy).',
      activities: [
        { type: 'match', title: 'Complete each phrase', options: ['insecurity', 'emissions', 'chain', 'sale', 'dates', 'hunger', 'resources'],
          items: [
            { text: 'global food ...', answer: 'insecurity' }, { text: 'greenhouse gas ...', answer: 'emissions' }, { text: 'the food supply ...', answer: 'chain' },
            { text: 'after the point of ...', answer: 'sale' }, { text: 'misunderstanding expiration ...', answer: 'dates' }, { text: 'the goal of zero ...', answer: 'hunger' }, { text: 'the wastage of natural ...', answer: 'resources' }] }
      ] },
    { id: 'x3', title: 'More paraphrasing practice', category: 'Writing practice', minutes: 10,
      target: 'Paraphrasing without copying (rubric lifting caps).',
      activities: [
        { type: 'paraphrase', title: 'Paraphrase', items: [
          { source: 'Reynolds et al. (2015) stated that reducing this waste by one third could save up to 1.8 trillion calories which is enough to feed 921,000 people for one year.', cite: 'Tchonkouang et al., 2023, para. D', model: 'Cutting Australia\u2019s food waste by a third could provide enough calories to feed 921,000 people for a year (Reynolds et al., 2015, as cited in Tchonkouang et al., 2023).' },
          { source: 'Food production uses many resources; thus, food waste also results in the wastage of water, land, energy, and other natural resources (Rezaei & Liu, 2017).', cite: 'Tchonkouang et al., 2023, para. F', model: 'Because producing food requires water, land and energy, these resources are also lost whenever food is thrown away (Rezaei & Liu, 2017, as cited in Tchonkouang et al., 2023).' }] }
      ] }
  ]
};
