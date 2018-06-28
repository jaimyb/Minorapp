import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusFilter'
})

export class StatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        console.log(args);
        if(!value)return null;
        if(!args)return value;
        if(args == ""){
            return value;
        }

        return value.filter(function(item){
            console.log( item);
            return item.StatusId == args;
        });
    }
}