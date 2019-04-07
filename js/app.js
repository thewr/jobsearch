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
    row.setAttribute('data-id', doc.id);
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
   $('#close_app').hide();
  $("#menutag").html("Menu");

// Add new document button show
  $("#new_item").click(function(){
    $('.leftmenu').animate({    
	    width: '350px'});//css("width","350px").css("width","+=10%")
    $("#options").hide();
     $(".content").hide().fadeIn(500); 
   $( ".feedback" ).toggleClass('blur-me');
	  $("#menutag").html("Add Entry");
	  $('#close_app').show();
  });
	
// Edit new document button show
function display_edit(){
	 $('.leftmenu').animate({    
	    width: '350px'});//css("width","350px").css("width","+=10%")
    $("#options").hide();
     $(".content").hide().fadeIn(500); 
   $( ".feedback" ).toggleClass('blur-me');
	  $("#menutag").html("Edit Entry");
	  $('#close_app').show();
}
	
  $("#edit_item").click(function(){
	  display_edit();   
  });

	
    
  $('#item_submit').click(function(){
    $(".content").show().fadeOut(1000);
	  $("#menutag").html("Menu");
   // $("add_item_button").show();
	     $('#close_app').hide();
  });
	
	
  $('#close_app').click(function(){
    $(".content").hide();
	$('.leftmenu').animate({    
	    width: '78px'});//css("width","350px").css("width","+=10%")
	  $("#menutag").html("Menu");
	$("#options").hide().fadeIn(2000);
	$( ".feedback" ).toggleClass('blur-me');
	     $('#close_app').hide();
  });

  
$('#item-list').on('click','tr',function() {
      $(this).toggleClass('selected');
       var tableData = $(this).children("td").map(function() {
              return $(this).text();}).get();
	var id = $(this).attr('data-id');
	display_edit();  


      form.name.value = tableData[1];
      form.title.value = tableData[2];
      form.location.value = tableData[3];
      form.info.value = tableData[4];
	/*
*/	
    db.collection('items').doc(id).update({
        name: form.name.value,
        title: form.title.value,
        location: form.location.value,
        info: form.info.value
    });
		
	//db.collection('items').update({name: 'IBM'});
 

       //alert(id);
});
    


  
});
