import storage from "redux-persist/lib/storage";

export const AuthBaseUrl = 'http://localhost:3002/api/users/user'
export const AuthBaseAdminUrl = 'http://localhost:3002/api/users/admin'
export const AuthCompanyBaseUrl = 'http://localhost:3003/api/users/company'



export const persistConfig = {
    key:"root",
    version:1,
    storage
}