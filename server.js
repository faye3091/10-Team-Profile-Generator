const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");

//validataion function
function validateInput(value) {
  if (value != "") {
    return true;
  } else {
    return "Please answer the question with any input";
  }
}

//Manager questions
const managerQuestion = [
  {
    //ask the managers name
    type: "input",
    name: "name",
    message: "What is the full name of the manager of this team?",
    validate: validateInput,
  },
  {
    //ask for manager's ID
    type: "input",
    name: "id",
    message: "What is the Manager's ID number?",
    validate: function (value) {
      //id validation
      if (!/^[0-9]+$/.test(value)) {
        return "ID must be a number value greater than zero.";
      } else {
        return true;
      }
    },
  },
  {
    //ask manager email address
    type: "input",
    name: "email",
    message: "What is the Manager's work email address?",
    validate: function (value) {
      //this is for email validation
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Not a valid email address. Please enter valid email address.";
      }
    },
  },
  {
    //ask the manager's office number
    type: "input",
    name: "officeNumber",
    message: "What is the Manager's office number?",
    validate: function (value) {
      //phone number validation
      if (!/^[0-9]+$/.test(value)) {
        return "ID must be a numerical value greater than zero.";
      } else {
        return true;
      }
    },
  },
];

//engineer questions
const engineerQuestions = [
  {
    //asl for Engineer's name
    type: "input",
    name: "name",
    message: "What is the Engineer's full name?",
    validate: validateInput,
  },
  {
    //ask for Engineer's ID
    type: "input",
    name: "id",
    message: "What is the Engineer's ID number?",
    //ID validation
    validate: function (value) {
      if (!/^[0-9]+$/.test(value)) {
        return "ID must be a number value greater than zero.";
      } else {
        return true;
      }
    },
  },
  {
    //ask for Engineer's email address
    type: "input",
    name: "email",
    message: "What is this Engineer's email address?",
    validate: function (value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Not a valid email address. Please enter valid email address.";
      }
    },
  },
  {
    //ask for GitHub username
    type: "input",
    name: "github",
    message: "What is the Engineer's GitHub username?",
    validate: validateInput,
  },
];
