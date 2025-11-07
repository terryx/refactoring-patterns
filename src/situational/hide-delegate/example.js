// Example 1: Person, Department, and Manager
// Expected output: Access manager directly from person instead of through department

function example1Before() {
  class Department {
    constructor(manager) {
      this._manager = manager;
    }

    get manager() { return this._manager; }
  }

  class Person {
    constructor(name, department) {
      this._name = name;
      this._department = department;
    }

    get name() { return this._name; }
    get department() { return this._department; }
  }

  const department = new Department('Alice Johnson');
  const person = new Person('Bob Smith', department);

  // Client must access manager through department
  const manager = person.department.manager;

  return { name: person.name, manager };
}

function example1After() {
  class Department {
    constructor(manager) {
      this._manager = manager;
    }

    get manager() { return this._manager; }
  }

  class Person {
    constructor(name, department) {
      this._name = name;
      this._department = department;
    }

    get name() { return this._name; }
    get manager() { return this._department.manager; }
  }

  const department = new Department('Alice Johnson');
  const person = new Person('Bob Smith', department);

  // Client accesses manager directly from person
  const manager = person.manager;

  return { name: person.name, manager };
}

// Example 2: Project, Team, and Team Lead
// Expected output: Access team lead directly from project instead of through team

function example2Before() {
  class Team {
    constructor(lead, size) {
      this._lead = lead;
      this._size = size;
    }

    get lead() { return this._lead; }
    get size() { return this._size; }
  }

  class Project {
    constructor(name, team) {
      this._name = name;
      this._team = team;
    }

    get name() { return this._name; }
    get team() { return this._team; }
  }

  const team = new Team('Carol Davis', 5);
  const project = new Project('Website Redesign', team);

  // Client must access lead and size through team
  const lead = project.team.lead;
  const teamSize = project.team.size;

  return { projectName: project.name, lead, teamSize };
}

function example2After() {
  class Team {
    constructor(lead, size) {
      this._lead = lead;
      this._size = size;
    }

    get lead() { return this._lead; }
    get size() { return this._size; }
  }

  class Project {
    constructor(name, team) {
      this._name = name;
      this._team = team;
    }

    get name() { return this._name; }
    get teamLead() { return this._team.lead; }
    get teamSize() { return this._team.size; }
  }

  const team = new Team('Carol Davis', 5);
  const project = new Project('Website Redesign', team);

  // Client accesses lead and size directly from project
  const lead = project.teamLead;
  const teamSize = project.teamSize;

  return { projectName: project.name, lead, teamSize };
}

// Example 3: Employee and Supervisor
// Expected output: Access supervisor info directly from employee

function example3Before() {
  class Supervisor {
    constructor(name, email) {
      this._name = name;
      this._email = email;
    }

    get name() { return this._name; }
    get email() { return this._email; }
  }

  class Employee {
    constructor(name, supervisor) {
      this._name = name;
      this._supervisor = supervisor;
    }

    get name() { return this._name; }
    get supervisor() { return this._supervisor; }
  }

  const supervisor = new Supervisor('Diana Martinez', 'diana@example.com');
  const employee = new Employee('Eve Wilson', supervisor);

  // Client must access supervisor info through supervisor object
  const supervisorName = employee.supervisor.name;
  const supervisorEmail = employee.supervisor.email;

  return { employeeName: employee.name, supervisorName, supervisorEmail };
}

function example3After() {
  class Supervisor {
    constructor(name, email) {
      this._name = name;
      this._email = email;
    }

    get name() { return this._name; }
    get email() { return this._email; }
  }

  class Employee {
    constructor(name, supervisor) {
      this._name = name;
      this._supervisor = supervisor;
    }

    get name() { return this._name; }
    get supervisorName() { return this._supervisor.name; }
    get supervisorEmail() { return this._supervisor.email; }
  }

  const supervisor = new Supervisor('Diana Martinez', 'diana@example.com');
  const employee = new Employee('Eve Wilson', supervisor);

  // Client accesses supervisor info directly from employee
  const supervisorName = employee.supervisorName;
  const supervisorEmail = employee.supervisorEmail;

  return { employeeName: employee.name, supervisorName, supervisorEmail };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
