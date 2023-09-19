module.exports = {
    STATUS: {
        RESPONSE_0K_CODE: 200,
        VALIDATION_ERROR: 404,
        SERVER_ERROR: 500,
        AUTH_ERROR: 401,
    },
    API_MESSAGE: {
        RETRIVE_SUCCESS: "Successfully Retrived.",
        CREATE_SUCCESS: "Successfully Created.",
        UPDATE_SUCCESS: "Successfully Updated.",
        DELETE_SUCCESS: "Successfully Deleted.",
        LOGIN_SUCCESS: "Successfully Loggedin.",
        VALIDATION_ERROR: "Validation Error.",
        LOGIN_ERROR: "User/Password not matched.",
        ERROR: "Error.",
    },
    CONSOLE_MESSAGE: {
        MONGOOES_CONNECTION_SUCCESS: "MongoDB connected.",
        MONGOOES_CONNECTION_ERROR: "MongoDB error.",
    },
    CONFIG: {
        ALLOW_CONTROL_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
        ALLOW_CONTROL_ALLOW_METHODS: "Access-Control-Allow-Methods",
        ALLOW_CONTROL_ALLOW_HEADERS: "Access-Control-Allow-Headers"
    },
    MONGODB_MODEL: {
        USERS: 'users',
        PROJECTS: 'projects',
        COSTS: 'costs'
    },
    MONGODB_VALIDATION: {
        PORJECT: {
            TITLE_REQUIRED: "Project title required",
            BUDGET_REQUIRED: "Project title required",
            USER_REQUIRED: "Project title required",
        },
        COST: {
            TITLE_REQUIRED: "Cost title required",
            PROJECT_REQUIRED: "Cost project required",
            AMOUNT_REQUIRED: "Cost amount required",
        },
        USER: {
            NAME_REQUIRED: "User name required",
            EMAIL_REQUIRED: "User email required",
            PASSWORD_REQUIRED: "User password required",
        }
    }
}