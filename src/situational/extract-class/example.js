// Example 1: Person and Telephone Number
// Expected output: Person object with telephone number functionality extracted into TelephoneNumber class

function example1Before() {
  class Person {
    constructor(name, officeAreaCode, officeNumber) {
      this._name = name;
      this._officeAreaCode = officeAreaCode;
      this._officeNumber = officeNumber;
    }

    get name() { return this._name; }
    get telephoneNumber() { return `(${this._officeAreaCode}) ${this._officeNumber}`; }
    get officeAreaCode() { return this._officeAreaCode; }
    get officeNumber() { return this._officeNumber; }
  }

  const person = new Person('John Doe', '555', '1234');
  return {
    name: person.name,
    telephoneNumber: person.telephoneNumber,
    officeAreaCode: person.officeAreaCode,
    officeNumber: person.officeNumber
  };
}

function example1After() {
  class TelephoneNumber {
    constructor(areaCode, number) {
      this._areaCode = areaCode;
      this._number = number;
    }

    get areaCode() { return this._areaCode; }
    get number() { return this._number; }
    toString() { return `(${this._areaCode}) ${this._number}`; }
  }

  class Person {
    constructor(name, officeAreaCode, officeNumber) {
      this._name = name;
      this._telephoneNumber = new TelephoneNumber(officeAreaCode, officeNumber);
    }

    get name() { return this._name; }
    get telephoneNumber() { return this._telephoneNumber.toString(); }
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    get officeNumber() { return this._telephoneNumber.number; }
  }

  const person = new Person('John Doe', '555', '1234');
  return {
    name: person.name,
    telephoneNumber: person.telephoneNumber,
    officeAreaCode: person.officeAreaCode,
    officeNumber: person.officeNumber
  };
}

// Example 2: Employee and Contact Information
// Expected output: Employee object with contact information extracted into ContactInfo class

function example2Before() {
  class Employee {
    constructor(name, email, phone, address) {
      this._name = name;
      this._email = email;
      this._phone = phone;
      this._address = address;
    }

    get name() { return this._name; }
    get email() { return this._email; }
    get phone() { return this._phone; }
    get address() { return this._address; }

    sendNotification(message) {
      return `Sending to ${this._email} and ${this._phone}: ${message}`;
    }
  }

  const employee = new Employee('Jane Smith', 'jane@example.com', '555-0100', '123 Main St');
  return {
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    notification: employee.sendNotification('Meeting at 3pm')
  };
}

function example2After() {
  class ContactInfo {
    constructor(email, phone, address) {
      this._email = email;
      this._phone = phone;
      this._address = address;
    }

    get email() { return this._email; }
    get phone() { return this._phone; }
    get address() { return this._address; }

    sendNotification(message) {
      return `Sending to ${this._email} and ${this._phone}: ${message}`;
    }
  }

  class Employee {
    constructor(name, email, phone, address) {
      this._name = name;
      this._contactInfo = new ContactInfo(email, phone, address);
    }

    get name() { return this._name; }
    get email() { return this._contactInfo.email; }
    get phone() { return this._contactInfo.phone; }
    get address() { return this._contactInfo.address; }

    sendNotification(message) {
      return this._contactInfo.sendNotification(message);
    }
  }

  const employee = new Employee('Jane Smith', 'jane@example.com', '555-0100', '123 Main St');
  return {
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    notification: employee.sendNotification('Meeting at 3pm')
  };
}

// Example 3: Project and Timeline
// Expected output: Project object with timeline information extracted into Timeline class

function example3Before() {
  class Project {
    constructor(name, startDate, endDate, milestones) {
      this._name = name;
      this._startDate = startDate;
      this._endDate = endDate;
      this._milestones = milestones;
    }

    get name() { return this._name; }
    get startDate() { return this._startDate; }
    get endDate() { return this._endDate; }
    get milestones() { return this._milestones; }

    get duration() {
      return this._endDate - this._startDate;
    }

    isOverdue(currentDate) {
      return currentDate > this._endDate;
    }
  }

  const project = new Project('Project Alpha', new Date('2024-01-01'), new Date('2024-06-01'), ['Design', 'Dev', 'QA']);
  const currentDate = new Date('2024-07-01');
  return {
    name: project.name,
    startDate: project.startDate,
    endDate: project.endDate,
    milestones: project.milestones,
    duration: project.duration,
    isOverdue: project.isOverdue(currentDate)
  };
}

function example3After() {
  class Timeline {
    constructor(startDate, endDate, milestones) {
      this._startDate = startDate;
      this._endDate = endDate;
      this._milestones = milestones;
    }

    get startDate() { return this._startDate; }
    get endDate() { return this._endDate; }
    get milestones() { return this._milestones; }

    get duration() {
      return this._endDate - this._startDate;
    }

    isOverdue(currentDate) {
      return currentDate > this._endDate;
    }
  }

  class Project {
    constructor(name, startDate, endDate, milestones) {
      this._name = name;
      this._timeline = new Timeline(startDate, endDate, milestones);
    }

    get name() { return this._name; }
    get startDate() { return this._timeline.startDate; }
    get endDate() { return this._timeline.endDate; }
    get milestones() { return this._timeline.milestones; }
    get duration() { return this._timeline.duration; }

    isOverdue(currentDate) {
      return this._timeline.isOverdue(currentDate);
    }
  }

  const project = new Project('Project Alpha', new Date('2024-01-01'), new Date('2024-06-01'), ['Design', 'Dev', 'QA']);
  const currentDate = new Date('2024-07-01');
  return {
    name: project.name,
    startDate: project.startDate,
    endDate: project.endDate,
    milestones: project.milestones,
    duration: project.duration,
    isOverdue: project.isOverdue(currentDate)
  };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
