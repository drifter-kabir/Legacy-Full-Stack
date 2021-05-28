function telephoneCheck(str) {
  let ck =1;
  for(let i=0;i<str.length;i++){
    if(str[i]!='-'&&str[i]!='('&&str[i]!=')'&&str[i]<'0'&&str[i]>'9'&&str[i]!=' '){
      ck=0;
    }
    if(str[i]=='?'){
      ck=0;
    }
  }
  if(ck==0||str[0]=='-'){
    return false;
  }
  let openBrackets = /\(/g;
  let closeBrackets = /\)/g;
  let open = str.match(openBrackets);
  let closed = str.match(closeBrackets);
  if (open){
    if (closed){
      if (open.length != closed.length){
        return false;
      }
    }
    else{
      return false;
    }
  }
  else if (closed){
    return false;
  }

  let ar=str.match(/\d/g);
  if(ar.length<10||ar.length>11){
    return false;
  }
  else if(ar.length==11&&ar[0]!='1'){
    return false;
  }
  else if(ar.length==10&&ar[0]!='5'){
    return false;
  }
  else{
    return true;
  }
}

telephoneCheck("555-555-5555");
