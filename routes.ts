/**
 * An array of routes that are accessible to the public
 * These routes do nt require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",]
    /**
     * An array of routes that are used for authentication
     * These routes will redirect logged in users to /settings
     * @type {string[]}
     */
    
    export const authRoutes = [
        "/auth/login",
        "/auth/register",
    ]
    
    
    /**
     * The prefix for API authentication routes
     * Routes that start with this prefix are used for API
     * @type {string}
     */
    
    export const apiAuthPrefix = "/api/auth"
    
    
    /**
     * The deault redirect path after loggin in
     * Routes that start with this prefix are used for API
     * @type {string}
     */
    
    export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
    export const ADMIN_LOGIN_REDIRECT = "/dashboardAdmin"
    export const ADMIN_IMAGERY_LOGIN_REDIRECT = "/dashboardAdmin_Imagery"
    export const ADMIN_LAB_ANALYSE_LOGIN_REDIRECT = "/dasbboardAdmin_Analyse"
    export const ADMIN_DOCTOR_LOGIN_REDIRECT = "/dashboard_doctor"