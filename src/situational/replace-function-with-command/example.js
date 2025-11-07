// Example 1: Undoable Calculation
// Expected output: execute() returns updated value, undo() restores previous value

const state = { value: 10 }

function example1Before() {
  const result = calculate(5)
  return result
}

function example1After() {
  const command = new CalculateCommand(5)
  const result = command.execute()
  command.undo()
  return result
}

function calculate(value) {
  const previous = state.value
  state.value = state.value + value
  return state.value
}

class CalculateCommand {
  constructor(value) {
    this.value = value
    this.previousValue = null
  }

  execute() {
    this.previousValue = state.value
    state.value = state.value + this.value
    return state.value
  }

  undo() {
    state.value = this.previousValue
  }
}

// Example 2: Command Queue with Deferred Execution
// Expected output: Commands stored in queue and executed later in order

const commandQueue = []

function example2Before() {
  processPayment(100, 'USD')
  processPayment(200, 'EUR')
  return 'Payments processed immediately'
}

function example2After() {
  commandQueue.push(new PaymentCommand(100, 'USD'))
  commandQueue.push(new PaymentCommand(200, 'EUR'))
  commandQueue.forEach(cmd => cmd.execute())
  return 'Payments queued then processed'
}

function processPayment(amount, currency) {
  console.log(`Processing ${amount} ${currency}`)
  return { amount, currency, status: 'completed' }
}

class PaymentCommand {
  constructor(amount, currency) {
    this.amount = amount
    this.currency = currency
  }

  execute() {
    console.log(`Processing ${this.amount} ${this.currency}`)
    return { amount: this.amount, currency: this.currency, status: 'completed' }
  }

  validate() {
    return this.amount > 0 && this.currency.length === 3
  }
}

// Example 3: Complex Parameterization with Builder Pattern
// Expected output: Command builds up configuration before execution

function example3Before() {
  return sendEmail('user@example.com', 'Hello', 'Welcome!', ['file.pdf'], true)
}

function example3After() {
  const command = new SendEmailCommand()
  command.to('user@example.com')
  command.subject('Hello')
  command.body('Welcome!')
  command.attach('file.pdf')
  command.priority(true)
  return command.execute()
}

function sendEmail(to, subject, body, attachments, highPriority) {
  return {
    to,
    subject,
    body,
    attachments,
    highPriority,
    sent: true
  }
}

class SendEmailCommand {
  constructor() {
    this.toAddress = null
    this.emailSubject = null
    this.emailBody = null
    this.attachments = []
    this.highPriority = false
  }

  to(address) {
    this.toAddress = address
    return this
  }

  subject(text) {
    this.emailSubject = text
    return this
  }

  body(text) {
    this.emailBody = text
    return this
  }

  attach(file) {
    this.attachments.push(file)
    return this
  }

  priority(high) {
    this.highPriority = high
    return this
  }

  execute() {
    return {
      to: this.toAddress,
      subject: this.emailSubject,
      body: this.emailBody,
      attachments: this.attachments,
      highPriority: this.highPriority,
      sent: true
    }
  }
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
