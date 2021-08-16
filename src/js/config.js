// In this file (module), we will put all the variables that should be constants and should be reused across the project.

// The goal of having this file with all these variables is that it will allow us to easily configure our project by simply changing some of the data included in this configuration file.

// We will NOT want to put ALL the variables here; only those that are needed to define some important data about the application. E.g. the API url that goes into the fetch() function as it will be reused in multiple places across the project. Also, it might change in the future, so it would be useful to include it here.

// Naming Convention: Uppercase denotes a constant that will never change
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 15; // number of search results per page
