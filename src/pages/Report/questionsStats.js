const getQuestionsStats = (questionsFromQuiz, records) => {
  if (!questionsFromQuiz.length) return [];
  const Questions = questionsFromQuiz.map((question) => {
    return {
      ...question,
      answered: 0,
      answeredCorrectly: 0,
      answers: question.answers.map((answer) => {
        return { ...answer, answeredPrecentage: 0 };
      }),
    };
  });

  // lets go record by record
  for (let recordI = 0; recordI < records.length; recordI++) {
    const recordedQuestions = records[recordI].answers;

    // lets go question by question
    for (
      let quiestionI = 0;
      quiestionI < recordedQuestions.length;
      quiestionI++
    ) {
      const recordedQuestion = recordedQuestions[quiestionI];
      const savedQuestion = Questions.find(
        (question) => question._id === recordedQuestion.question
      );

      // lets check answer by answer
      let answeredCorrectly = true;
      const Answers = savedQuestion.answers;
      const recordAnswers = recordedQuestion.answers;
      for (let answerI = 0; answerI < recordAnswers.length; answerI++) {
        const recordedAnswerId = recordAnswers[answerI];
        const answer = Answers.find(
          (answer) => answer._id === recordedAnswerId
        );
        answer.answeredPrecentage += 100 / records.length;
        if (!answer.isRight) answeredCorrectly = false;
      }

      if (recordedQuestion.answers.length) savedQuestion.answered += 1;
      if (answeredCorrectly)
        savedQuestion.answeredCorrectly += 100 / records.length;
    }
  }
  return Questions;
};

export default getQuestionsStats;
