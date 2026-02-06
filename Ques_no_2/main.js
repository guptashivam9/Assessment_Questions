function minSubString(s,t){
    if(s.length < t.length){
        return "";
    }

    let table = new Map();
    for(let ch of t){
        table.set(ch,(table.get(ch) ?? 0) + 1);
    }

    let i = 0 , j = 0 , req = t.length , minLength = Infinity , start = 0;
    for( ; j < s.length; j++){
        let rchar = s[j];
        if(table.has(rchar)){
            if(table.get(rchar)>0){
                req--; 
            }
           
            table.set(rchar,table.get(rchar)-1)
        }
        while(req === 0){
            if(j-i+1 < minLength){
                minLength = j-i+1;
                start = i;
            }
            let lchar = s[i];
            if(table.has(lchar)){
                table.set(lchar,(table.get(lchar))+1);
                if(table.get(lchar)>0){
                    req++;
                }
            }
            i++;
        }
    }
    return minLength === Infinity ? "" : s.substring(start, start + minLength);

}

let result = minSubString("ADOBECODEBANC","ABC");
document.getElementById("subString").innerHTML = result;