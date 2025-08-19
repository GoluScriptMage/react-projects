/**
 * Enhanced scoring utility that works with the missing flavors question format
 */

/**
 * Calculate the overall score based on question answers
 * @param {Array} answers - Array of user answers
 * @returns {number} - Percentage score (0-100)
 */
export function calculateScore(answers) {
  if (!answers || answers.length === 0) return 0;
  
  // Calculate total points from answers
  const totalPoints = answers.reduce((sum, answer) => sum + (answer.points || 0), 0);
  
  // Calculate maximum possible points (assuming max is 5 points per question)
  const maxPossiblePoints = answers.length * 5;
  
  // Calculate percentage score and round to nearest integer
  return Math.round((totalPoints / maxPossiblePoints) * 100);
}

/**
 * Get result message based on score and calculator type
 * @param {number} score - Percentage score (0-100)
 * @param {string} calculatorType - Type of calculator (love, friendship, career, personality)
 * @returns {string} - Result message
 */
export function getResultMessage(score, calculatorType = 'love') {
  // Message thresholds for different calculator types
  const messages = {
    love: [
      { threshold: 20, message: "There's very little compatibility here. You might want to look elsewhere." },
      { threshold: 40, message: "There's some potential, but you'll need to work through significant differences." },
      { threshold: 60, message: "You have decent compatibility! With effort, this could be a fulfilling relationship." },
      { threshold: 80, message: "Great compatibility! You're likely to have a harmonious relationship." },
      { threshold: 101, message: "Wow! This is a match made in heaven. You're highly compatible!" }
    ],
    friendship: [
      { threshold: 20, message: "This friendship might be challenging. You have very different approaches to relationships." },
      { threshold: 40, message: "You could be casual acquaintances, but might struggle to build a deep connection." },
      { threshold: 60, message: "You have the foundation for a good friendship. With some effort, you can build something meaningful." },
      { threshold: 80, message: "You're naturally compatible as friends! You'll likely have an easy and supportive relationship." },
      { threshold: 101, message: "Best friend material! You have an exceptional friendship compatibility." }
    ],
    career: [
      { threshold: 20, message: "This career path might not align well with your personality. Consider exploring other options." },
      { threshold: 40, message: "You may face some challenges in this field, but could succeed with extra effort and adaptability." },
      { threshold: 60, message: "You have decent compatibility with this career path. You'll have both strengths and growth areas." },
      { threshold: 80, message: "Great career fit! Your natural tendencies align well with this path." },
      { threshold: 101, message: "Perfect match! You're exceptionally well-suited for this career path." }
    ],
    personality: [
      { threshold: 20, message: "You tend to be reserved and practical, preferring stability and routine." },
      { threshold: 40, message: "You balance logical thinking with occasional spontaneity, but generally prefer structure." },
      { threshold: 60, message: "You have a balanced personality with both analytical and creative tendencies." },
      { threshold: 80, message: "You're outgoing and adaptable, with strong creative and social tendencies." },
      { threshold: 101, message: "You're highly expressive, adventurous, and comfortable with uncertainty and change." }
    ]
  };
  
  // Get messages for the specified calculator type or default to love
  const typeMessages = messages[calculatorType] || messages.love;
  
  // Find the appropriate message based on score threshold
  for (const { threshold, message } of typeMessages) {
    if (score < threshold) {
      return message;
    }
  }
  
  // Fallback message
  return "Something went wrong with your score calculation.";
}

/**
 * Get enhanced result message with personality insights
 * @param {number} score - Overall percentage score
 * @param {Object} personalityTraits - Analysis of personality traits from score tags
 * @param {string} calculatorType - Type of calculator
 * @returns {string} - Enhanced result message with personality insights
 */
export function getEnhancedResultMessage(score, personalityTraits, calculatorType) {
  // Get the base result message
  const baseMessage = getResultMessage(score, calculatorType);
  
  // If no personality traits, return base message
  if (!personalityTraits || Object.keys(personalityTraits).length === 0) {
    return baseMessage;
  }
  
  // Sort traits by score (highest first)
  const sortedTraits = Object.entries(personalityTraits)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
  
  // Get top 3 traits (or fewer if less than 3 exist)
  const topTraits = sortedTraits.slice(0, 3);
  
  // Create personality insights text
  let insightsText = "\n\nPersonality Insights:\n";
  
  topTraits.forEach(([trait, score]) => {
    // Skip traits named "General"
    if (trait === "General") return;
    
    // Add trait description based on score level
    let traitDescription = "";
    if (score > 4) {
      traitDescription = `High ${trait} (${score.toFixed(1)}/5): You strongly exhibit this trait.`;
    } else if (score > 3) {
      traitDescription = `Moderate ${trait} (${score.toFixed(1)}/5): You show a balanced level of this trait.`;
    } else {
      traitDescription = `Low ${trait} (${score.toFixed(1)}/5): You show less of this trait in your responses.`;
    }
    
    insightsText += `• ${traitDescription}\n`;
  });
  
  // Combine base message with insights
  return baseMessage + insightsText;
}

/**
 * Calculate compatibility score and return with appropriate message
 * @param {Array} answers - Array of user answers
 * @param {string} calculatorType - Type of calculator
 * @returns {Object} - Score object with numeric score and message
 */
export function calculateCompatibility(answers, calculatorType) {
  // Calculate score as percentage
  const score = calculateScore(answers);
  
  // Get appropriate message
  const message = getResultMessage(score, calculatorType);
  
  return {
    score,
    message
  };
}

// Export all scoring utilities
export default {
  calculateScore,
  getResultMessage,
  getEnhancedResultMessage,
  calculateCompatibility
};
