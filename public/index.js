// set submit as disabled at the beginning.
document.getElementById('submit').disabled=true;

//setValues
firebase.database().ref('/values').once('value',function(data){
document.getElementById('organic_price').innerText=`Rs:${data.val().organic}/Kg`;
document.getElementById('desi_price').innerText=`Rs:${data.val().desi}/Kg`;
document.getElementById('ghee_price').innerText=`Rs:${data.val().ghee}/Kg`;
document.getElementById('desi_aata').innerText=`Rs:${data.val().aata}/Pack(5kg)`;
console.log(data.val().organic)
})

// validation checking before submit enabled
function checkValidation()
{

 var  Name=document.getElementById('name').value;
 var  phone=document.getElementById('phone').value;
 var  address=document.getElementById('address').value;
 var   kgs=document.getElementById('kgs').value;
 var   type=document.getElementById('type').value;
 
 if(kgs !="" && type != "")
 {
    total(kgs,type);
    if(Name != "" && phone != "" && address != "")
    {
        document.getElementById('submit').disabled=false;
    }
 }

}

// total count:
function total(kgs,type){
firebase.database().ref('/values').once('value',function(data){
var item;
if(type=='Organic Chicken')
        {    item=data.val().organic }
else if(type=='Desi Chicken')
        {  item=data.val().desi    }
else if(type=='desi aata')
        {  item=data.val().aata }
else
        {   item=data.val().ghee   }
    document.getElementById('total').value=kgs*item;

})
}

//submit function
function myFunction(){
    var description=document.getElementById('description').value;
    var kgs=document.getElementById('kgs').value;
    var address=document.getElementById('address').value;
    var type=document.getElementById('type').value;
    var phone=document.getElementById('phone').value;
    var name=document.getElementById('name').value;
    var total=document.getElementById('total').value;

//set date value 
var currentdate = new Date();
var datetime =currentdate.getDate() + "/" + currentdate.getMonth()+1 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
console.log(datetime)

//creation of object.
const obj={
    address: address,
    name : name,
    type:type,
    phone:phone,
    kgs:kgs,
    description:description,
    date:datetime,
    total:total
        }
        console.log(obj)
    var confirmation=confirm(`Your order details:\nName : ${obj.name}\nPhone : ${obj.phone}\nAddress : ${obj.address}\nType : ${obj.type}\nKgs : ${obj.kgs}\nDescription : ${obj.description}\nTotal : ${obj.total}\n
    "To confirm order click 'Ok'."`);
//ORDER confiramtion.
    if(confirmation)
    {
        firebase.database().ref('/public').push(obj);
        firebase.database().ref(`/yourOrders/${obj.phone}`).push(obj);
        alert("your order Have been Recieved \nThank You.")
    }   
    else alert("You have cancelled you order.") 
}


// end of function  of submission.
function typeSelection(type){
    document.getElementById("type").value=type;
    document.getElementById('name').focus();
    var   kgs=document.getElementById('kgs').value;
    if(kgs !="" && type != "")
    {
       total(kgs,type);
    }
}
