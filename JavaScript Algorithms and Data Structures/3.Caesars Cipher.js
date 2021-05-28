function rot13(str) {
  let og="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rot="NOPQRSTUVWXYZABCDEFGHIJKLM";
  let st="";
  for(let i=0;i<str.length;i++){
    if(str[i]>='A'&&str[i]<='Z'){
      //console.log(str[i]);
      for(let j=0;j<26;j++){
        if(rot[j]===str[i]){
          st+=og[j];
          break;
        }
      }
    }
    else{
      st+=str[i];
    }
  }
  console.log(st);
  return st;
}

rot13("SERR PBQR PNZC");
