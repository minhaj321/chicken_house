console.log("goole")
firebase.database().ref('/public').on('child_added',function(data){
    address=data.val().address;
    type=data.val().type;
    kgs=data.val().kgs;
    description=data.val().description;
    Name=data.val().name;
    phone=data.val().phone;
    date=data.val().date;
    var list=`<ul>
    <li>Name    : ${Name}</li>
    <li>Address : ${address}</li>
    <li>Phone   : ${phone}</li>
    <li>Type    :${type}</li>
    <li>kGS     :${kgs}</li>
    <li>Date    :${date}</li>
    <li>Description :${description}</li>
    </ul>`;
    var getPrevData=document.getElementById('details').innerHTML;
    document.getElementById('details').innerHTML=`${list} ${getPrevData}`;
})

function setValues(){
    var desi=document.getElementById('desi').value;
    var ghee=document.getElementById('ghee').value;
    var organic=document.getElementById('organic').value;
    var obj={
        desi:desi,
        ghee:ghee,
        organic:organic
    }
    firebase.database().ref('/values').set(obj);
}
