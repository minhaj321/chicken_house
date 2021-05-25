function checkOrders(){
 var phone=document.getElementById('number').value;
 if(phone==""){
     alert('first enter number')
     console.log('if')
 }
 else{
    console.log('eles')
 firebase.database().ref(`/yourOrders/${phone}`).on('child_added',function(data){
    if(data.val()==""){
        alert('no')
    }

    address=data.val().address;
     type=data.val().type;
     kgs=data.val().kgs;
     description=data.val().description;
     Name=data.val().name;
     phone=data.val().phone;
     date=data.val().date;
     var list=`<ul><br/>
     <h3>Order</h3>
     <li>Name    : ${Name}</li>
     <li>Address : ${address}</li>
     <li>Phone   : ${phone}</li>
     <li>Type    :${type}</li>
     <li>kGS     :${kgs}</li>
     <li>Date    :${date}</li>
     <li>Description :${description}</li>
     </ul><br/>`;
     var getPrevData=document.getElementById('orders_div').innerHTML;
     document.getElementById('orders_div').innerHTML=`${list} ${getPrevData}`;
 
 })
}
}