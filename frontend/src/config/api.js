export const BACKEND_API = {
    BASE_URL: "http://localhost:8081",
    ACTIONS: {
        LOGIN: "/user/login",
        SIGN_UP: "/user/registry",
        VALIDATE_TOKEN: "/user/validateToken",
        CREATE_PROJECT: "/project/create",
        PROJECT_GET_ALL: "/project/jointIn",
        WORKFLOW_CHART: "/chart/workflow",
        CREATE_WORKFLOW: "/project/workflow/create",
        ADD_WORKFLOW_ITEM: "/project/workflow/add-item",
        ADD_WORKFLOW_LINK : "/project/workflow/add-link"
    }
}