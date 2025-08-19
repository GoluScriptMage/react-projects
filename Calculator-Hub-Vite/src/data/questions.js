import questionsData from './questions_missing_flavors.json'

/**
 * Utility for handling name and gender personalization in calculator questions
 */

// Gender options for love calculator
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  NON_BINARY: 'non-binary',
  ANYONE: 'anyone'
}

// Pronoun mappings for different genders
export const PRONOUNS = {
  [GENDER_OPTIONS.MALE]: {
    subjective: 'he',      // He is nice
    objective: 'him',      // I like him
    possessive: 'his',     // His car
    reflexive: 'himself'   // He did it himself
  },
  [GENDER_OPTIONS.FEMALE]: {
    subjective: 'she',
    objective: 'her', 
    possessive: 'her',
    reflexive: 'herself'
  },
  [GENDER_OPTIONS.NON_BINARY]: {
    subjective: 'they',
    objective: 'them',
    possessive: 'their',
    reflexive: 'themselves'
  },
  [GENDER_OPTIONS.ANYONE]: {
    subjective: 'they',
    objective: 'them',
    possessive: 'their',
    reflexive: 'themselves'
  }
}

/**
 * Replace placeholders in question text with personalized content
 * @param {string} text - Question text with placeholders
 * @param {string} userName - User's name
 * @param {string} targetGender - Gender preference for love calculator
 * @returns {string} Personalized question text
 */
export const personalizeText = (text, userName = 'friend', targetGender = GENDER_OPTIONS.ANYONE) => {
  if (!text) return '';
  
  const pronouns = PRONOUNS[targetGender] || PRONOUNS[GENDER_OPTIONS.ANYONE]
  
  return text
    .replace(/{name}/g, userName)
    .replace(/{targetPronoun}/g, pronouns.subjective)
    .replace(/{targetObjective}/g, pronouns.objective)
    .replace(/{targetPossessive}/g, pronouns.possessive)
    .replace(/{targetReflexive}/g, pronouns.reflexive)
}

/**
 * Get questions for a specific calculator type with personalization
 * @param {string} calculatorType - Type of calculator (love, friendship, career, personality)
 * @param {string} userName - User's name
 * @param {string} targetGender - Gender preference (for love calculator only)
 * @returns {Array} Array of personalized questions
 */
export const getQuestions = (calculatorType, userName = 'friend', targetGender = GENDER_OPTIONS.ANYONE) => {
  const questions = questionsData[calculatorType] || []
  
  return questions.map(question => ({
    ...question,
    question: personalizeText(question.question, userName, targetGender),
    englishHint: personalizeText(question.englishHint, userName, targetGender)
  }))
}

/**
 * Get a random question from any calculator (for preview/demo)
 * @returns {Object} Random question
 */
export const getRandomQuestion = (userName = 'friend') => {
  const calculatorTypes = Object.keys(questionsData)
  const randomType = calculatorTypes[Math.floor(Math.random() * calculatorTypes.length)]
  
  const questions = questionsData[randomType] || []
  if (questions.length === 0) return null
  
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  
  return {
    ...randomQuestion,
    calculatorType: randomType,
    question: personalizeText(randomQuestion.question, userName),
    englishHint: personalizeText(randomQuestion.englishHint, userName)
  }
}

/**
 * Analyze question answer score tags for personality trait insights
 * @param {Array} answers - User's answers with score tags
 * @param {Array} questions - The original questions with score tags
 * @returns {Object} Analysis of personality traits
 */
export const analyzeScoreTags = (answers, questions) => {
  // Map answers to questions to get score tags
  const answeredQuestions = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    return {
      ...answer,
      scoreTag: question?.scoreTag || 'General'
    }
  })

  // Group by score tags
  const tagGroups = {}
  answeredQuestions.forEach(answer => {
    if (!tagGroups[answer.scoreTag]) {
      tagGroups[answer.scoreTag] = []
    }
    tagGroups[answer.scoreTag].push(answer.points)
  })

  // Calculate average score for each tag
  const tagScores = {}
  Object.keys(tagGroups).forEach(tag => {
    const scores = tagGroups[tag]
    tagScores[tag] = scores.reduce((sum, score) => sum + score, 0) / scores.length
  })

  // Return the tag scores
  return tagScores
}

// Export all question-related utilities
export default {
  getQuestions,
  getRandomQuestion,
  personalizeText,
  analyzeScoreTags,
  GENDER_OPTIONS,
  PRONOUNS
}
