import { QuestionRepository } from "../repositories/QuestionRepository.js";
import { QuizRepository } from "../repositories/QuizRepository.js";

export class QuestionService {
  private questionRepo =
    new QuestionRepository();

  private quizRepo =
    new QuizRepository();

  // CREATE
  async createQuestion(
    quizId: number,
    question_text: string,
    option_a: string,
    option_b: string,
    option_c: string,
    option_d: string,
    correct_answer: string
  ) {
    const quiz =
      await this.quizRepo.findById(quizId);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return this.questionRepo.createQuestion({
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      quiz,
    });
  }

  // GET ALL
  async getQuestions() {
    return this.questionRepo.findAll();
  }

  // GET ONE
  async getQuestionById(id: number) {
    const question =
      await this.questionRepo.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    return question;
  }

  // UPDATE
  async updateQuestion(
    id: number,
    question_text: string,
    option_a: string,
    option_b: string,
    option_c: string,
    option_d: string,
    correct_answer: string
  ) {
    const question =
      await this.questionRepo.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    return this.questionRepo.updateQuestion(
      id,
      {
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
      }
    );
  }

  // DELETE
  async deleteQuestion(id: number) {
    const question =
      await this.questionRepo.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    await this.questionRepo.deleteQuestion(id);

    return {
      message:
        "Question deleted successfully",
    };
  }
}