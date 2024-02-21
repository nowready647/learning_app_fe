export class Constants {
    // API

    // BASE URL
    public readonly API_USER_BASE_URL = 'http://localhost:3000/user/'
    public readonly API_QUIZ_BASE_URL = 'http://localhost:3000/quiz/';
    public readonly API_LECTION_BASE_URL = 'http://localhost:3000/lection/';
    public readonly API_CHOICE_BASE_URL = 'http://localhost:3000/choice/';
    public readonly API_QUESTION_BASE_URL = 'http://localhost:3000/question/';
    public readonly API_MESSAGE_BASE_URL = 'http://localhost:3000/message/';


    // USER
    public readonly API_USER_FIND = this.API_USER_BASE_URL + 'find/'
    public readonly API_VERIFY_CREDENTIALS = this.API_USER_BASE_URL + 'logIn/';
    public readonly API_USER_REGISTER = this.API_USER_BASE_URL + 'register/';
    public readonly API_USER_GET_TOP_SOLVERS = this.API_USER_BASE_URL + 'get-top-solvers/';

    // LECTION
    public readonly API_LECTION_FIND = this.API_LECTION_BASE_URL + 'find/';

    // QUIZ
    public readonly API_QUIZ_ADD = this.API_QUIZ_BASE_URL + 'add/'
    public readonly API_QUIZ_FIND = this.API_QUIZ_BASE_URL + 'find/'
    public readonly API_QUIZ_DELETE = this.API_QUIZ_BASE_URL + 'delete/'
    public readonly API_QUIZ_EDIT = this.API_QUIZ_BASE_URL + 'edit/'
    public readonly API_QUIZ_SOLVE = this.API_QUIZ_BASE_URL + 'solve/'
    public readonly API_QUIZ_GET_POPULAR = this.API_QUIZ_BASE_URL + 'get-popular/'

    //CHOICE
    public readonly API_CHOICE_DELETE = this.API_CHOICE_BASE_URL + 'delete/'

    //QUESTION
    public readonly API_QUESTION_DELETE = this.API_QUESTION_BASE_URL + 'delete/'

    //MESSAGE
    public readonly API_MESSAGE_ADD = this.API_MESSAGE_BASE_URL + 'add/';
    public readonly API_MESSAGE_FIND = this.API_MESSAGE_BASE_URL + 'find/';
    public readonly API_MESSAGE_SOLVE = this.API_MESSAGE_BASE_URL + 'solve/';
}