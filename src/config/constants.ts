import storage from "redux-persist/lib/storage";

// export const AuthBaseUrl = 'http://localhost:3002/api/users/user'
// export const AuthBaseAdminUrl = 'http://localhost:3002/api/users/admin'
// export const AuthCompanyBaseUrl = 'http://localhost:3003/api/users/company'
// export const ChatSecUrl = 'http://localhost:3005/api/chat'
export const AuthBaseUrl = 'https:careerflow.shop/api/users/user'
export const AuthBaseAdminUrl = 'https:careerflow.shop/api/users/admin'
export const AuthCompanyBaseUrl = 'https:careerflow.shop/api/users/company'
export const ChatSecUrl = 'https:careerflow.shop/api/chat'



export const persistConfig = {
    key:"root",
    version:1,
    storage
}