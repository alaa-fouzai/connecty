// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    ServerURL: 'http://localhost:3000',
    RegisterURL: 'http://localhost:3000/api/users/register',
    GetUserURL: 'http://localhost:3000/api/users/user',
    LoginURL: 'http://localhost:3000/api/users/login',
    AdminConfiguration: 'http://localhost:3000/api/config/',
    GetChatBots: 'http://localhost:3000/api/ChatBots/',
    NewProperty: 'http://localhost:3000/api/property/AddNew',
    getAllProperty: 'http://localhost:3000/api/property/GetAll',
    changePropertyState: 'http://localhost:3000/api/property/ChangeState',
    changeChatState: 'http://localhost:3000/api/chat/ChangeState',
    CreateNewChat: 'http://localhost:3000/api/chat/AddNew',
    GetChat: 'http://localhost:3000/api/chat/getChat',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
