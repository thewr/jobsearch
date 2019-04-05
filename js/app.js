// creates a <table> element and a <tbody> element
const itemList = document.querySelector('#item-list');
let tblBody = document.createElement("tbody");    
// get the reference for the body
var body = document.getElementsByTagName("body")[0];

// create form element
const form = document.querySelector('#add-item-form');

function todaysDate()
{    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}



// create element & render cafe
function renderCafe(doc){
    
    // creates a table row
    let row = document.createElement("tr");
    itemList.setAttribute('data-id', doc.id);
    let date = document.createElement('td');
    let name = document.createElement('td'); 
    let title = document.createElement('td');
    let location = document.createElement('td');
    let info = document.createElement('td');
  
  
    date.textContent = doc.data().date;
    name.textContent = doc.data().name;
    title.textContent = doc.data().title;
    location.textContent = doc.data().location;
    info.textContent = doc.data().info;
    
    // append row
    row.appendChild(date);
    row.appendChild(name);
    row.appendChild(title);
    row.appendChild(location);
    row.appendChild(info);
  
    // add the row to the end of the table body  
    tblBody.appendChild(row);
    
    // put the <tbody> in the <table>
    itemList.appendChild(tblBody);
  // appends <table> into <body>
 //   body.appendChild(itemList);
  // sets the border attribute of tbl to 2;
   //itemList.setAttribute("border", "2");
}

// getting data
db.collection('items').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('items').add({
        date: todaysDate(),
        name: form.name.value,
        title: form.title.value,
        location: form.location.value,
        info: form.info.value
    });
      form.name.value = '';
      form.title.value = '';
      form.location.value = '';
      form.info.value = '';
});


$(function(){
  $(".content").hide();
  $("#menutag").html("Menu");
  $("#new_item").click(function(){
    $('.leftmenu').css("width","350px").css("width","+=10%")
    $("#options").hide();
     $(".content").hide().fadeIn(500); 
   $( ".feedback" ).toggleClass('blur-me');
    
  });
    
  $('#item_submit').click(function(){
    $(".content").show().fadeOut(1000);
   // $("add_item_button").show();
  });
  
$('#item-list').on('click','tr',function() {
      $(this).toggleClass('selected');
       var tableData = $(this).children("td").map(function() {
              return $(this).text();}).get();
	
       var td=tableData[0]+' '+' '+tableData[1];
       alert(td);
});
    


  
});
