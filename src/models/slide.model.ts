import { Task } from './task.model';

export class SlideModel {
   

    constructor(
       public id: string,
       public title:string,
       public tasks: Task[]
    ){

    }


}