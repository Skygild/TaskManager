// if (connection) {
//     const { taskTitle, taskDesc, createdAt, deadline, createdBy, completed } = req.body;
//     connection.query("INSERT INTO task (taskTitle, taskDesc, createdAt, deadline, createdBy, completed) VALUES (?, ?, ?, ?, ?, ?)", [taskTitle, taskDesc, createdAt, deadline, createdBy, completed], (err, result) => {
//       if (err) {
//         console.log(`Query Error: ${err}`);
//       }
//       if (result) {
//         console.log(result);
//       }
//     });
//   }

export class Task {
  private taskTitle;
  private taskDesc;
  private createdAt;
  private deadline;
  private createdBy;
  private completed;

  constructor() {}
}
