function palindrome(str) {
  str=str.replace(/[^0-9a-zA-Z]/g,'');
  console.log(str);
  str=str.toLowerCase();
  console.log(str);
  for(let i=0,j=str.length-1;i<str.length,j>=0;i++,j--){
    if(str[i]!=str[j]){
      return false;
    }
  }
  return true;
}



palindrome("2_A3*3#A2");
