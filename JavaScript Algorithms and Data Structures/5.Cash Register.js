function checkCashRegister(price, cash, cid) {
  let price1=price*100;;
  let cash1=cash*100;
  let cid1=[];
  let tot=0;
  for(let i=0;i<9;i++){
      cid1.push(Math.ceil(cid[i][1]*100));
  }
  let coins=[1,5,10,25,100,500,1000,2000,10000];
  let cnt=[];
  cnt.push(cid1[0]/1);
  cnt.push(cid1[1]/5);
  cnt.push(cid1[2]/10);
  cnt.push(cid1[3]/25);
  cnt.push(cid1[4]/100);
  cnt.push(cid1[5]/500);
  cnt.push(cid1[6]/1000);
  cnt.push(cid1[7]/2000);
  cnt.push(cid1[8]/10000);
  for(let i=0;i<9;i++){
    cnt[i]=Math.ceil(cnt[i]);
    tot+=cid1[i];
  }
  //console.log(cid1);
  //console.log(cnt);
  let ferot=cash1-price1;
  let ck=0;
  if(tot===ferot){
    ck=1;
  }
  let ans=[];
  for(let i=8;i>=0;i--){
    if(ferot>=coins[i]){
      let x=0;
      while(1){
        if(ferot<coins[i]||cnt[i]==0){
          break;
        }
        ferot-=coins[i];
        x+=coins[i];
        cnt[i]--;
      }
      let ar=[];
      ar.push(cid[i][0]);
      ar.push(x/100);
     // console.log(ar)
      ans.push(ar);
    }
  }
  for(let i=0;i<ans.length;i++){
    console.log(ans[i]);
  }
  let output = { status: null, change: [] };
  if(ferot>0){
    return {"status":"INSUFFICIENT_FUNDS","change":[]};
  }
  else if(ck===1){
    return {"status":"CLOSED","change":cid};
  }
  else{
    output.status = 'OPEN';
    output.change = ans;
    return output;
  }


}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
