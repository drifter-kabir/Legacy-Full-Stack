function convertToRoman(num) {
   var mp = [['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
   let str="";
   for(let i=0;i<mp.length;i++){
     while(num>=mp[i][1]){
       console.log(mp[i][0]);
       str+=mp[i][0];
       num-=mp[i][1];
     }
   }
  return str;
}

convertToRoman(36);
