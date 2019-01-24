module.exports = {
  formatModel: (data, type) => {
    switch(type) {
      case 'dailyTrivia':
        trivia = {
          questionChoiceId: data.id,
          questionId: data.questionId,
          questionChoices: [
            data.incorrectChoiceOne,
            data.incorrectChoiceTwo,
            data.incorrectChoiceThree,
            data.correctChoice
          ],
          question: data.question.question
          // correctChoice: data.correctChoice
        }
        return trivia;
        break
      default:
        return data
    }
  }

}