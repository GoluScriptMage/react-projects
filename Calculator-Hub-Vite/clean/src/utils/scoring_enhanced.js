import { getResultMessage as getOriginalResultMessage } from '../scoring';

/**
 * Calculates the score based on the answers
 * @param {Array} answers - Array of answer objects with question id and selected option value
 * @returns {number} Score as a percentage
 */
export const calculateScore = (answers) => {
  if (!answers || answers.length === 0) return 0;
  
  // Calculate total possible score (assuming max value of 4 per question)
  const maxPossibleScore = answers.length * 4;
  
  // Sum up the values of selected options
  const totalScore = answers.reduce((sum, answer) => {
    return sum + (answer.value || 0);
  }, 0);
  
  // Calculate percentage and round to nearest integer
  return Math.round((totalScore / maxPossibleScore) * 100);
};

/**
 * Analyzes the score tags from the answers to determine personality traits
 * @param {Array} answers - Array of answer objects
 * @param {Array} questions - Array of question objects
 * @returns {Object} Object containing tag analysis
 */
export const analyzeScoreTags = (answers, questions) => {
  if (!answers || !questions) return {};
  
  // Create a map of question IDs to questions for easy lookup
  const questionMap = questions.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {});
  
  // Initialize tag counters
  const tagCounts = {};
  const tagScores = {};
  const tagTotals = {};
  
  // Analyze each answer
  answers.forEach(answer => {
    const question = questionMap[answer.questionId];
    if (!question || !question.scoreTag) return;
    
    const { scoreTag } = question;
    
    // Find the selected option
    const selectedOption = question.options.find(option => 
      option.value === answer.value
    );
    
    if (!selectedOption) return;
    
    // Count occurrences of each tag
    tagCounts[scoreTag] = (tagCounts[scoreTag] || 0) + 1;
    
    // Sum up scores for each tag
    tagScores[scoreTag] = (tagScores[scoreTag] || 0) + answer.value;
    
    // Track max possible score for this tag
    tagTotals[scoreTag] = (tagTotals[scoreTag] || 0) + 4; // Assuming max is 4
    
    // Track option-specific tags if present
    if (selectedOption.tag) {
      const optionTag = selectedOption.tag;
      tagCounts[optionTag] = (tagCounts[optionTag] || 0) + 1;
    }
  });
  
  // Calculate percentage scores for each tag
  const tagPercentages = {};
  Object.keys(tagScores).forEach(tag => {
    if (tagTotals[tag] > 0) {
      tagPercentages[tag] = Math.round((tagScores[tag] / tagTotals[tag]) * 100);
    }
  });
  
  // Find dominant traits (highest scoring tags)
  const dominantTraits = Object.keys(tagPercentages)
    .map(tag => ({ trait: tag, score: tagPercentages[tag] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Top 3 traits
  
  return {
    tagCounts,
    tagScores,
    tagPercentages,
    dominantTraits
  };
};

/**
 * Gets the appropriate enhanced result message based on score and dominant traits
 * @param {number} score - The calculated score
 * @param {string} calculatorType - The type of calculator
 * @param {string} userName - User name for personalization
 * @param {Object} personalityTraits - Object from analyzeScoreTags
 * @returns {Object} Result message object
 */
export const getEnhancedResultMessage = (score, calculatorType, userName, personalityTraits = {}) => {
  // First get the original result message
  const originalResult = getOriginalResultMessage(score, calculatorType, userName);
  
  // Get the dominant traits if any
  const { dominantTraits = [] } = personalityTraits;
  const primaryTrait = dominantTraits[0]?.trait;
  
  // If no dominant traits, return the original message
  if (!primaryTrait) return originalResult;
  
  // Enhanced messages based on calculator type and primary trait
  const enhancedMessages = {
    love: {
      "Emotional Numbness": {
        title: "The Thoughtful Observer 🧊",
        category: "Emotional Explorer",
        additionalMessage: "You tend to process emotions carefully before expressing them. This thoughtfulness can be a strength, but remember that vulnerability can also create deeper connections."
      },
      "Romantic Realism": {
        title: "The Practical Romantic 🧠",
        category: "Balanced Thinker",
        additionalMessage: "You have a refreshing ability to see relationships clearly without rose-colored glasses. This helps you build connections based on reality rather than fantasy."
      },
      "Self-Respect": {
        title: "The Dignified Heart 💪",
        category: "Self-Respecting",
        additionalMessage: "You understand that healthy love requires maintaining your boundaries and self-worth. This protects you from one-sided relationships that drain your energy."
      },
      "Emotional Authenticity": {
        title: "The Truth Speaker 🗣️",
        category: "Authentic Connector",
        additionalMessage: "Your commitment to emotional honesty might feel uncomfortable at times, but ultimately creates space for genuine connection rather than comfortable illusions."
      },
      "Attachment Style": {
        title: "The Secure Connector 🔒",
        category: "Attachment Explorer",
        additionalMessage: "You show signs of a secure attachment style, valuing both closeness and independence. This balanced approach helps you form healthy relationships."
      }
    },
    friendship: {
      "Inclusion Needs": {
        title: "The Community Builder 🌟",
        category: "Social Navigator",
        additionalMessage: "You care about belonging, but also know when to create your own social paths. This independence helps you find authentic connections."
      },
      "Reciprocity": {
        title: "The Balanced Giver 🤝",
        category: "Relationship Investor",
        additionalMessage: "You value equal effort in friendships and can recognize when relationships become one-sided. This awareness helps you invest in mutually fulfilling connections."
      },
      "Social Energy": {
        title: "The Mindful Socializer 🧘",
        category: "Energy Conserver",
        additionalMessage: "You understand your social battery limits and are learning to honor them. This self-awareness prevents burnout and allows for more meaningful interactions when you do socialize."
      },
      "Boundary Setting": {
        title: "The Healthy Limiter 🛑",
        category: "Boundary Expert",
        additionalMessage: "You're developing the crucial skill of setting boundaries in friendships. This protects your energy while still allowing for genuine connection."
      },
      "Connection Quality": {
        title: "The Depth Seeker 🌊",
        category: "Quality Connector",
        additionalMessage: "You value meaningful connections over quantity. This focus on depth leads to fewer but more fulfilling friendships."
      }
    },
    career: {
      "Work Approach": {
        title: "The Strategic Minimalist 🧩",
        category: "Efficient Worker",
        additionalMessage: "You seek the smartest path to results rather than the hardest one. This efficiency can be a superpower when channeled effectively."
      },
      "Career Philosophy": {
        title: "The Balanced Achiever 🧘",
        category: "Sustainable Success",
        additionalMessage: "You understand that long-term success requires sustainable practices. This wisdom helps you avoid burnout while still making progress."
      },
      "Work Ethics": {
        title: "The Collaborative Optimizer 🤝",
        category: "Team Enhancer",
        additionalMessage: "You value finding better ways to work and sharing them with others. This collaborative approach elevates everyone around you."
      },
      "Networking Style": {
        title: "The Authentic Connector 🤝",
        category: "Quality Networker",
        additionalMessage: "You prefer deeper connections with fewer people over superficial networking. This approach often leads to more meaningful professional relationships."
      },
      "Work Efficiency": {
        title: "The Results Deliverer 🎯",
        category: "Output Focused",
        additionalMessage: "You focus on outcomes rather than hours worked. This results-oriented approach can be highly valuable in the right environment."
      },
      "Work Purpose": {
        title: "The Pragmatic Pathfinder 🧭",
        category: "Purpose Seeker",
        additionalMessage: "You're finding your own balance between passion and practicality. This nuanced approach helps you create meaning even in imperfect circumstances."
      }
    },
    personality: {
      "Internal Complexity": {
        title: "The Calm Chaos Master 🌪️",
        category: "Internal Navigator",
        additionalMessage: "Behind your calm exterior lies a rich inner world. This depth gives you unique perspectives, though sometimes processing everything internally can be overwhelming."
      },
      "Social Adaptation": {
        title: "The Social Chameleon 🦎",
        category: "Adaptable Identity",
        additionalMessage: "You naturally adapt to different social contexts. This flexibility allows you to connect with diverse people, though sometimes you might question which version is the 'real you'."
      },
      "Contradictory Traits": {
        title: "The Beautiful Paradox 🧩",
        category: "Complexity Embracer",
        additionalMessage: "You contain seemingly contradictory traits that actually complement each other. This complexity makes you adaptable and able to see multiple perspectives."
      },
      "Self-Concept": {
        title: "The Multi-Dimensional Self 🔍",
        category: "Identity Explorer",
        additionalMessage: "You experience different aspects of yourself in different contexts. This rich self-awareness gives you depth, though it can sometimes feel confusing."
      },
      "Emotional Expression": {
        title: "The Thoughtful Processor 🧠",
        category: "Inner Depth",
        additionalMessage: "You tend to process emotions internally before expressing them. This thoughtfulness brings depth to your interactions, though others might sometimes misread your initial reactions."
      },
      "Decision Making": {
        title: "The Balanced Decider 🧠",
        category: "Integrated Thinker",
        additionalMessage: "You combine both logic and intuition when making decisions. This balanced approach helps you make choices that align with both your head and heart."
      }
    }
  };
  
  // Get enhanced message for this calculator type and trait
  const enhancedMessage = enhancedMessages[calculatorType]?.[primaryTrait];
  
  // If no enhanced message found, return original
  if (!enhancedMessage) return originalResult;
  
  // Return combined result with enhanced message
  return {
    ...originalResult,
    title: enhancedMessage.title || originalResult.title,
    category: enhancedMessage.category || originalResult.category,
    enhancedMessage: enhancedMessage.additionalMessage,
    dominantTraits
  };
};

/**
 * Gets the original result message (for backward compatibility)
 * @param {number} score - The calculated score
 * @param {string} calculatorType - The type of calculator
 * @param {string} userName - User name for personalization
 * @returns {Object} Result message object
 */
export const getResultMessage = getOriginalResultMessage;

export default {
  calculateScore,
  getResultMessage,
  getEnhancedResultMessage,
  analyzeScoreTags
};
