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

//intern questions
const internQuestions = [
  {
    // ask intern's name
    type: "input",
    name: "name",
    message: "What is the Intern's full name?",
    validate: validateInput,
  },
  {
    // ask for intern's ID
    type: "input",
    name: "id",
    message: "What is the Intern's ID number?",
    validate: function (value) {
      if (!/^[0-9]+$/.test(value)) {
        return "ID must be a number value greater than zero.";
      } else {
        return true;
      }
    },
  },
  {
    // ask intern's email address
    type: "input",
    name: "email",
    message: "What is this Intern's email address?",
    validate: function (value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Not a valid email address. Please enter valid email address.";
      }
    },
  },
  {
    // ask intern's school
    type: "input",
    name: "school",
    message: "What is the name of the Intern's school?",
  },
];

//ask if the user want to add another person

// question about the new team member's role.
const addMoreTeamMembers = [
  {
    type: "confirm",
    name: "newTeamMembers",
    message: "Do you want to add another team member?",
    default: false,
  },
];

// add in question for the role of the new team member
const teamMemberRole = [
  {
    type: "list",
    name: "role",
    message: "What is the role of the new team member you are adding?",
    choices: ["Engineer", "Intern"],
    validate: validateInput,
  },
];

//place to store for the data
var employeeData = [];

//function to trigger adding more team members

function addMember() {
  /*if/else with inquirer prompts for adding new team members*/
  inquirer.prompt(addMoreTeamMembers).then((answer) => {
    if (answer.newTeamMembers) {
      //inquirer prompt for the role of the newest team member
      inquirer.prompt(teamMemberRole).then((roleSelection) => {
        //inquirer prompt for the engineering role
        if (roleSelection.role === "Engineer") {
          inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
            //use the engineer constructor for a new instance of Engineer
            let newEngineer = new Engineer(
              engineerAnswers.name,
              engineerAnswers.id,
              engineerAnswers.email,
              engineerAnswers.github
            );
            //need to send the data to the employee data array
            employeeData.push(newEngineer);
            //call the addMember function
            addMember();
          });
        } else {
          //do the same thing for the intern role
          inquirer.prompt(internQuestions).then((internAnswers) => {
            //use the intern constructor for a new instance of Intern
            let newIntern = new Intern(
              internAnswers.name,
              internAnswers.id,
              internAnswers.email,
              internAnswers.school
            );
            //need to send the data to the employee data array
            employeeData.push(newIntern);
            //call the addMember function
            addMember();
          });
        }
      });
    } else {
      //use the render function and push the employee data
      let htmlOutput = render(employeeData);
      //us the fs.writeFile
      fs.writeFile(outputPath, htmlOutput, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
}
console.log(
  "Hello! \nTo Generate a Team, \n Please answer the following questions. \n Your team will be set up in the output folder team.html file."
);
inquirer.prompt(managerQuestion).then((managerAnswers) => {
  //use the manager constructor for a new instance of Manager
  let newManager = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officeNumber
  );
  //push this to employeeData too
  employeeData.push(newManager);
  addMember();
});
