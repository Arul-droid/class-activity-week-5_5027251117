# Chat Log

## To-do list debugging

### User
Why does the to-do list not work?

### Assistant
The main problem was a variable-name mismatch in `script.js`: the task array was declared as `task`, but the rest of the code used `tasks`. This caused a `ReferenceError` when rendering tasks.

Other issues identified:

- The filter buttons did not have the IDs expected by the JavaScript.
- Task changes were not saved to local storage.
- The course and date inputs were not used when creating tasks.
- Task titles were inserted as HTML rather than rendered as plain text.

### User
Are there any more bugs?

### Assistant
Yes. The filter buttons in `todolist.html` had class and value attributes, but the JavaScript looked them up by ID. The failed lookups returned `null`, causing an error that prevented later code from running. The other identified issues were missing local-storage saves and unused course/date inputs.

## Fixes

### User
Try fixing it.

### Assistant
Updated `todolist.html` and `script.js` to:

- Connect the filter buttons to the JavaScript.
- Include course and due date when creating tasks and display them.
- Save task changes to local storage and load them on startup.
- Render task titles as text, not HTML.
- Remove the empty placeholder list item.
- Handle malformed saved task data and local-storage errors.

Verified in the browser that creating, filtering, completing, deleting, and saving tasks worked. JavaScript syntax and editor diagnostics passed.

## Exporting this chat

### User
How do I export the chat log?

### Assistant
The earlier instruction to find **Export Chat** in the Chat view menu was incorrect. The menu shown did not have that option. A manual workaround is to move the chat into the editor area and copy the conversation into a text or Markdown file, or copy individual responses using their copy buttons.

### User
Can you make a Markdown?

### Assistant
Created this Markdown chat log.
