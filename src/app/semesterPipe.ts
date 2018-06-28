import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from './subscription';
import { Assignment } from './assignment';

@Pipe({
    name: 'semesterFilter'
})

export class SemesterPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        console.log(args);
        if(!value)return null;
        if(!args)return value;
        if(args == ""){
            return value;
        }

        return value.filter(function(item){
            if(item instanceof Subscription){
                return item.Assignment.Semester == args;
            }
            if(item instanceof Assignment){
                return item.Semester == args;
            }
        });
    }
}