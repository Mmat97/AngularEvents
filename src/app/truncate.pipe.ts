import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TrPipe implements PipeTransform {


  transform(word: string, max:number, cmWords:boolean) {
    if(word.length<=35){
      return `${word}`;  
    }else{
      if (cmWords) {
        max = word.substr(0, max).lastIndexOf(' ');
      }
      return `${word.substr(0, max)}`;
    }
  }

}
