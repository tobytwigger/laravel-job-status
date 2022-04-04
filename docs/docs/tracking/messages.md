# Messages

## Passing messages 

You can pass messages from a job to your app. This lets you give your users information about what the job is doing in realtime.

To send a message, you can call `$this->line('3/10 emails sent.');`. This will pass a basic message to your app.

You can also set a type on a message. A type is one of 

- success
- error
- info (default)
- warning
- debug

Call `$this->message('success', 'All emails sent successfully.)` to set a message with a type, There are also aliases of `successMessage`, `warningMessage` etc.

# Reading messages

Once you have a status model, you can call
- `$status->messages()`: Get all messages from the status model
- `$status->mostRecentMessage(includeDebug: true)`: Get the most recent message.
- `$status->messagesOfType('error')`: Get the most recent message.
