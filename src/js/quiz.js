import Answers from "./answers.js";
import FormController from "./formcontroller.js";
import Data from "./data.js";
import Template from "./template.js";
import Navigation from "./navigation.js";
export default class Quiz {
  constructor() {
    this.isCalculateResult = true;
    this.template = new Template();
    this.formController = new FormController();
  }
  async init(data) {
    let res = await Data.init(data);
    if(res) Navigation.init(res.length);
    this.template.getAnswerPage(Data.getCurrentStepData());
    document
      .querySelector(".form__button_next")
      .addEventListener("click", () => this.getNextPage());
    document
      .querySelector(".form__button_prev")
      .addEventListener("click", () => this.getPrevPage());
    window.addEventListener("userDataSend", (e) =>
      this.template.showSuccessPage(e.detail)
    );
  }

  getNextPage() {
    if (this.formController.isValidStep()) {
      //или || Answers.history[Answers.index + 1]
      let nextStep = this.formController.getNextStepIndex();
      Answers.addAnswer(
        Navigation.currentStep,
        this.formController.getAnswer()
      );
      if (nextStep && nextStep < Navigation.stepCount) {
        Navigation.currentStep = nextStep;
        this.template.updatePage(Data.getCurrentStepData());
      } else this.getFinalPage();
    } else this.formController.showError();
  }

  getPrevPage() {
    Answers.historyBack();
    let prevStepIndex = Answers.history[Answers.currentQuestionIndex].question;
    let prevStepData = Data.getStepData(prevStepIndex);
    this.template.updatePage(prevStepData);
  }

  getFinalPage() {
    let answers = Answers.history;
    if (this.isCalculateResult) Data.getTotalSum(answers);
    this.template.getFinalPage(Data.totalSum);
    let quizResult = Data.prepareQuizResult(answers);
    document.forms.feedback.addEventListener("submit", (e) =>
      this.formController.submitFeedbackHandler(e, quizResult)
    );
  }
}
