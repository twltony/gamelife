import { Task } from './task.model';

/**
 * Slide实体对象
 * 
 * 序列化参考http://choly.ca/post/typescript-json/
 * 
 * 使用方法：
 * JSON.stringify(SlideModel)
 * JSON.parse(JSONString)
 * 
 */

export class SlideModel {
    constructor(
        public id: string,
        public title: string,
        public tasks: Task[]
    ) {
    }


    getId(): string {
        return this.id;
    }

    /**
     * @description 自动被JSON.stringify运行
     * @author 汤伟亮
     * @returns {SlideJSON}
     * @memberof SlideModel
     */
    toJSON(): SlideJSON {
        // 从当前对象‘this’复制所有字段到一个空对象并返回
        return Object.assign({}, this, {
            // 需要转换为JSON String的字段
            //   task: JSON.stringify(this.tasks)
        });
    }

    /**
     * @description 用于转换序列化对象
     * @author 汤伟亮
     * @static
     * @param {(SlideJSON|string)} json
     * @returns {SlideModel}
     * @memberof SlideModel
     */
    static fromJSON(json: SlideJSON | string): SlideModel {
        if (typeof json === 'string') {
            // 如果是String类型，首先转换
            return JSON.parse(json, SlideModel.reviver);
        } else {
            // 创建实例
            let slide = Object.create(SlideModel.prototype);
            return Object.assign(slide, json, {
                // 需要将String转换为Object的数据
                tasks: Task.fromJSON(json.tasks)
            });
        }
    }

    /**
     * @description 用于以第二个参数传递到JSON.parse 并自动调用SlideModel.fromJSON
     * @author 汤伟亮
     * @static
     * @param {string} key
     * @param {*} value
     * @returns {*}
     * @memberof SlideModel
     */
    static reviver(key: string, value: any): any {
        return key === "" ? SlideModel.fromJSON(value) : value;
    }
}

interface SlideJSON {
    id: string,
    title: string,
    tasks: Task[]
}