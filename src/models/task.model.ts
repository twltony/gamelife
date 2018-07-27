
export class Task{
    name: string;
    points:number;
    type: string;
    quantity: number;
    
    static fromJSON(json: TaskJSON|any): Task {
        if (typeof json === 'string') {
          return JSON.parse(json, Task.reviver);
        } else {
          let tasks = Object.create(Task.prototype);
          return Object.assign(tasks, json, {

          });
        }
      }
      static reviver(key: string, value: any): any {
        return key === "" ? Task.fromJSON(value) : value;
      }
}

interface TaskJSON {
    name: string;
    points:number;
    type: string;
    quantity: number;
  }
