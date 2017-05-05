/**
 * Created by Administrator on 2017/4/6 0006.
 */

import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name:'ObjtoArray'})
export class ObjToArrayPipe implements PipeTransform{

        transform(value){
                return value;
        }
}