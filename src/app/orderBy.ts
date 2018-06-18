import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderBy{

 transform(array, orderBy: string, asc = true){
 
     if (!orderBy || orderBy.trim() == ""){
       return array;
     } 
     


     //ascending
     if (asc){
       return Array.from(array).sort((item1: any, item2: any) => {
           let splitArray: Array<string> = orderBy.split(".");
            if(splitArray.length == 1 ){
                return this.orderByComparator(item1[splitArray[0]], item2[splitArray[0]]);
           }
           if(splitArray.length = 2){
            console.log(splitArray[0]);
            console.log(splitArray[1]);
            console.log(item1);
            return this.orderByComparator(item1[splitArray[0]][splitArray[1]], item2[splitArray[0]][splitArray[1]]);
           }      
       });
     }
     else{
       //not asc
       return Array.from(array).sort((item1: any, item2: any) => { 
        let splitArray: Array<string> = orderBy.split(".");
        if(splitArray.length == 1 ){
            console.log(splitArray[0]);
            return this.orderByComparator(item1[splitArray[0]], item2[splitArray[0]]);
       }
       if(splitArray.length = 2){
        console.log(splitArray[0]);
        console.log(splitArray[1]);
        console.log(item1);
        return this.orderByComparator(item1[splitArray[0]][splitArray[1]], item2[splitArray[0]][splitArray[1]]);
       }
       });
     }
 
 }
 
 orderByComparator(a:any, b:any):number{
 
     if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
       //Isn't a number so lowercase the string to properly compare
       if(a.toLowerCase() < b.toLowerCase()) return -1;
       if(a.toLowerCase() > b.toLowerCase()) return 1;
     }
     else{
       //Parse strings as numbers to compare properly
       if(parseFloat(a) < parseFloat(b)) return -1;
       if(parseFloat(a) > parseFloat(b)) return 1;
      }
 
     return 0; //equal each other
 }
}