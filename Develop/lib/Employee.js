//employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  }
  //returns name
  getName() {
    return this.name;
  }
  //returns id
  getId() {
    return this.id;
  }
  //returns email
  getEmail() {
    return this.email;
  }
  //returns role
  getRole() {
    return this.role;
  }
}
module.exports = Employee;
