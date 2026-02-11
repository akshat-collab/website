/**
 * Sample passages for typing test. Words ≈ chars/5.
 */
export const TYPING_PASSAGES = {
  short: [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    "Technology is best when it brings people together. Innovation distinguishes between an innovator and a follower.",
    "Code is like humor. When you have to explain it, it's bad. Simplicity is the soul of efficiency.",
    "Typing speed matters in every job. Practice daily and your fingers will learn the keys. Accuracy first, then speed.",
    "Variables hold data. Functions process it. Logic connects them. Master these three.",
    "Read the docs. Write tests. Refactor often. Your future self will thank you.",
    "Every expert was once a beginner. The gap between them is practice and patience.",
    "Type fast, think slow. Rushing code leads to bugs. Take time to design first.",
    "Comments explain why, not what. Good code is self-documenting when possible.",
    "Git before you quit. Commit often. Push when it works. Branch for experiments.",
  ],
  medium: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    "Programming isn't about what you know; it's about what you can figure out. The best error message is the one that never shows up. First, solve the problem. Then, write the code. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Learning to code is useful no matter what your career ambitions are. Coding makes you a better problem solver and a more logical thinker. The computer will do what you tell it to do, but you have to be clear and precise. Start with small projects and build up from there.",
    "Debugging is twice as hard as writing the code in the first place. If you write the code as cleverly as possible, you are by definition not smart enough to debug it. Write clear code and comment the tricky parts. Future you will thank present you.",
    "Frontend and backend work together like a team. The frontend sends requests; the backend returns data. APIs connect them. Learn both to build full-stack apps. REST and GraphQL are two popular ways to design APIs.",
    "Memory is limited. Your algorithm's speed matters when data grows. Big O notation helps you compare. O(n) is linear; O(n squared) is slow for large inputs. Choose the right data structure for the job.",
    "User experience starts with loading fast. Optimize images, lazy load, and minimize requests. A slow site loses users. Measure performance with tools. Every millisecond counts on mobile.",
    "Security is not optional. Hash passwords, validate input, and use HTTPS. Never trust user data. SQL injection and XSS are real threats. Learn them to avoid them.",
    "Tests catch bugs before users do. Unit tests for logic, integration tests for flows. Run them in CI. Green builds give confidence. Refactor without fear when tests pass.",
    "Design patterns solve common problems. Singleton, factory, observer. Learn them but don't overuse. Sometimes a simple function is enough. Patterns are tools, not rules.",
    "Async code keeps the UI responsive. Promises and async await make it readable. Handle errors with try catch. Loading states keep users informed. Never block the main thread.",
    "Version control tracks every change. Branches let you experiment safely. Merge when ready. Code review catches mistakes. Good commit messages help future debugging.",
  ],
  long: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. Stay hungry. Stay foolish.",
    "Programming isn't about what you know; it's about what you can figure out. The best error message is the one that never shows up. First, solve the problem. Then, write the code. Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Code is read much more often than it is written. So make it readable. Write code that you would be proud to show to others. Clean code always looks like it was written by someone who cares.",
    "Learning to code is useful no matter what your career ambitions are. Coding makes you a better problem solver and a more logical thinker. The computer will do what you tell it to do, but you have to be clear and precise. Start with small projects and build up from there. Practice every day even if it's just for a few minutes. Read other people's code and learn from it. Don't be afraid to make mistakes; that's how you learn. The best time to start was yesterday. The next best time is now.",
    "Algorithms are the heart of computer science. A good algorithm can turn an impossible problem into one that runs in milliseconds. Study data structures: arrays, hash maps, trees, and graphs. Practice on paper before you code. Time complexity and space complexity matter in interviews and in production. Master the basics and the rest will follow.",
    "Full stack development means you build both the interface users see and the server that powers it. Frontend frameworks like React or Vue handle the UI. Backend frameworks like Express or Django handle the logic and database. Connect them with APIs. Deploy to the cloud. Monitor for errors. This skill set is in high demand across every industry.",
    "Code reviews improve quality and spread knowledge. When someone reads your code, they might spot bugs or suggest better approaches. When you review others, you learn their patterns. Leave constructive feedback. Ask questions. The goal is better code, not criticism. A culture of reviews makes everyone a better programmer.",
    "Performance optimization is an art. First measure, then optimize. Use profiling tools to find bottlenecks. Caching can help but adds complexity. Database queries often need indexes. Lazy loading reduces initial load time. Remember that premature optimization is the root of all evil. Get it working first, then make it fast.",
    "Error handling separates robust code from fragile code. Validate inputs at the boundaries. Return meaningful error messages. Log errors for debugging. Don't swallow exceptions silently. In production, show users friendly messages while logging details for support. Graceful degradation keeps the app usable when something fails.",
    "Abstraction hides complexity. A function does one thing well. A module groups related code. A library provides reusable solutions. Build layers of abstraction so each part stays manageable. But don't abstract too early. Let the code tell you when duplication needs a shared layer. Good abstraction makes change easier.",
    "The web is built on HTML, CSS, and JavaScript. HTML gives structure, CSS gives style, JavaScript gives behavior. Learn the fundamentals before diving into frameworks. Responsive design works on every screen size. Accessibility means everyone can use your site. Semantics matter for both users and search engines.",
  ],
} as const;

export type PassageLength = keyof typeof TYPING_PASSAGES;

export function getRandomPassage(length: PassageLength): string {
  const list = TYPING_PASSAGES[length];
  return list[Math.floor(Math.random() * list.length)];
}
