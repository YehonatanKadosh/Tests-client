import getQuestionsStats from "./questionsStats";

describe("getQuestionsStats Function", () => {
  describe("valid arguments", () => {
    const questionsFromQuiz = [{ answers: [{}] }];
    const records = [];
    const questions = getQuestionsStats(questionsFromQuiz, records);

    it("returns a list", () => {
      expect(Array.isArray(questions)).toEqual(true);
    });
    it("questions should have new prop { answered }", () => {
      expect(questions[0].answered).not.toBe(undefined);
    });
    it("questions should have new prop { answeredCorrectly }", () => {
      expect(questions[0].answeredCorrectly).not.toBe(undefined);
    });
    it("answers should have new prop { answeredPrecentage }", () => {
      expect(questions[0].answers[0].answeredPrecentage).not.toBe(undefined);
    });
  });
  describe("No questions from quiz", () => {
    const questionsFromQuiz = [];
    const records = [];
    const questions = getQuestionsStats(questionsFromQuiz, records);

    it("returns a list", () => {
      expect(Array.isArray(questions)).toEqual(true);
    });
    it("that is empty", () => {
      expect(questions.length).toEqual(0);
    });
  });
});
