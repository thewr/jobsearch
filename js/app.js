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

var id;  //global
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

// apply edit
form.addEventListener('apply', (e) => {
    e.preventDefault();
    db.collection('items').doc(id).update({
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
 // var id = ' ';
  $(".content").hide();
   $('#close_app').hide();
$("#edit_item").hide();
  $("#menutag").html("Menu");


	 $("edit_submit").hide();
// Animate slide for create new form	
function display_add(){
	 $( ".feedback" ).toggleClass('blur-me');
 $("#options").hide();	  
    $('.leftmenu').animate({    
	    width: '350px'});//css("width","350px").css("width","+=10%")
     $(".content").hide().fadeIn(500); 

	  $("#menutag").html("Add Entry");
	  $('#close_app').show();
}
 
// Add new document button show
	$("#new_item").click(function(){
		display_add();
	});
	
// Animate slide for edit form
function display_edit(){
  $("#options").hide();	
	 $('.leftmenu').animate({width: '350px'});
 $(".content").hide().fadeIn(500);     
   $( ".feedback" ).toggleClass('blur-me');
	  $("#menutag").html("Edit Entry");
	  $('#close_app').show();
}
	
//Edit new document button show	
  $("#edit_item").click(function(){
	  display_edit();   
  });

	
    
  $('#item_submit').click(function(){
    $(".content").show().fadeOut(1000);
	  $("#menutag").html("Menu");
	     $('#close_app').hide();
  });	
	
	
  $('#close_app').click(function(){
    $(".content").hide();
	$('.leftmenu').animate({width: '78px'});
	  $("#menutag").html("Menu");
	$("#options").hide().fadeIn(2000);
	$( ".feedback" ).toggleClass('blur-me');
	     $('#close_app').hide();
  });
  
$('#item-list').on('click','tr',function() {
	
      $(this).toggleClass('selected');
	if($(this).hasClass('selected'))
	{
		$("#edit_item").show();
	else
	{
		$("#edit_item").hide();
	}

       var tableData = $(this).children("td").map(function() {
              return $(this).text();}).get();
     id = $(this).attr('data-id');

     $("#item_submit").attr('value', 'Apply').attr('type','apply');


      form.name.value = tableData[1];
      form.title.value = tableData[2];
      form.location.value = tableData[3];
      form.info.value = tableData[4];

	var scope = $(this);
	$('#close_app').click(function (e){
		console.log(id);
	      scope.toggleClass('selected');
	})
	/*
    db.collection('items').doc(id).update({
        name: form.name.value,
        title: form.title.value,
        location: form.location.value,
        info: form.info.value
    });
	*/		 

       //alert(id);
});
    


  
});
