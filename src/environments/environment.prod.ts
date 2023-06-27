export const environment = {
    production: true,
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
    GetSingleChat: 'http://localhost:3000/api/chat/getSingleChat',
    GetConversations: 'http://localhost:3000/api/conversation/GetConversations',
    CloseConversations: 'http://localhost:3000/api/conversation/CloseConversations',
    OpenConversations: 'http://localhost:3000/api/conversation/OpenConversations',
    GetConversationsById: 'http://localhost:3000/api/conversation/GetConversationsById',
    SendAdminMessage: 'http://localhost:3000/api/conversation/AdminMessage',


    connectToSocket:"http://localhost:4000",
    instantMassaging:""
};
