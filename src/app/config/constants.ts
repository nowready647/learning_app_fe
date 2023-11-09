export class Constants {
    // API
    public readonly API_USER_BASE_URL = 'http://localhost:3000/user/'

    public readonly API_USER_FIND = this.API_USER_BASE_URL + 'find/'

    public readonly API_VERIFY_CREDENTIALS = this.API_USER_BASE_URL + 'logIn/';

    public readonly API_USER_REGISTER = this.API_USER_BASE_URL + 'register/';

    public readonly API_LECTION_BASE_URL = 'http://localhost:3000/lection/';

    public readonly API_LECTION_FIND = this.API_LECTION_BASE_URL + 'find/';

    public readonly API_QUIZ_BASE_URL = 'http://localhost:3000/quiz/';

    public readonly API_QUIZ_ADD = this.API_QUIZ_BASE_URL + 'add/'

    public readonly API_QUIZ_FIND = this.API_QUIZ_BASE_URL + 'find/'

    public readonly API_QUIZ_DELETE = this.API_QUIZ_BASE_URL + 'delete/'
}