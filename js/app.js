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
    let fname = document.createElement('td'); 
    let lname = document.createElement('td');
    let email = document.createElement('td');
    let dob = document.createElement('td');
    let info = document.createElement('td');
  
  
    date.textContent = doc.data().date;
    fname.textContent = doc.data().fname;
    lname.textContent = doc.data().lname;
    email.textContent = doc.data().email;
    dob.textContent = doc.data().dob;
    info.textContent = doc.data().info;
    
    // append row
    row.appendChild(date);
    row.appendChild(fname);
    row.appendChild(lname);
    row.appendChild(email);
    row.appendChild(dob);
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

// clear form
function clearForm(){
	form.fname.value = '';
	form.lname.value = '';
      	form.email.value = '';
      	form.dob.value = '';
      	form.info.value = '';
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('items').add({
        date: todaysDate(),
        fname: form.fname.value,
        lname: form.lname.value,
        email: form.email.value,
	dob: form.dob.value,
        info: form.info.value
    });
	clearForm();
});


$(function(){
	$(".content").hide();
	$('#close_app').hide();
	$("#edit_item").hide();
	$("#menutag").html("Menu");


	$("edit_submit").hide();
	// Animate slide for create new form	
	function display_add(){
		 $( ".feedback" ).toggleClass('blur-me');
		 $("#options").hide();	  
	    	 $('.leftmenu').animate({width: '350px'});
	         $(".content").hide().fadeIn(500);
		 $("#menutag").html("Add Entry");
		 $('#close_app').show();
	}
 
// Add new document button show
	$("#new_item").click(function(){
		clearForm();
		//$("#item_submit").attr('value', 'Submit').attr('type','submit');
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
    $(".content").hide();
	  $('.leftmenu').animate({width: '78px'});
	  $("#menutag").html("Menu");
	  	$("#options").hide().fadeIn(2000);
	$( ".feedback" ).toggleClass('blur-me');
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
		//$("#item_submit").attr('value', 'Apply').attr('type','apply');
		$("#edit_item").show();	
		var tableData = $(this).children("td").map(function(){return $(this).text();}).get();
		var id = $(this).attr('data-id');
		
		// put data on form
		form.fname.value = tableData[1];
		form.lname.value = tableData[2];
      		form.email.value = tableData[3];
      		form.dob.value = tableData[4];
      		form.info.value = tableData[5];
		

		form.addEventListener('submit', (e) => {
    			e.preventDefault();
    			db.collection('items').doc(id).update({
				date: todaysDate(),
        			fname: form.fname.value,
        			lname: form.lname.value,
        			email: form.email.value,
				dob: form.dob.value,
        			info: form.info.value
			});
				clearForm();
				
			});
		}
	else
	{
			$("#edit_item").hide();
			clearForm();
	}
	
     
});

  
});
