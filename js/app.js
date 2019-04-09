// creates a <table> element and a <tbody> element
const itemList = document.querySelector('#item-list');
let tblBody = document.createElement("tbody");
// get the reference for the body
var body = document.getElementsByTagName("body")[0];

// create form element
const form = document.querySelector('#add-item-form');
let execute = document.querySelector('#options');


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
/*
    // creates a table li
    let row = document.createElement("tr");
    row.setAttribute('data-id', doc.id);
    let date = document.createElement('td');
    let fname = document.createElement('td');
    let lname = document.createElement('td');
    let email = document.createElement('td');
    let dob = document.createElement('td');
    let info = document.createElement('td');
*/
  // create list document object
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.

  let date = document.createElement('span');
  //let fname = document.createElement('span');
  //let lname = document.createElement('span');
  let name = document.createElement('span');
  let email = document.createElement('span');
  let dob = document.createElement('span');
  let info = document.createElement('span');

  date.textContent = doc.data().date;
  //fname.textContent = doc.data().fname;
  //lname.textContent = doc.data().lname;
  name.textContent = "Name:  "+doc.data().lname + ", " + doc.data().fname;
  email.textContent = "E-mail:  "+doc.data().email;
  dob.textContent = "Date-of-Birth:  "+doc.data().dob;
  info.textContent = doc.data().info;
 
  // append row
  li.appendChild(date);
  //li.appendChild(fname);
  //li.appendChild(lname);
  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(dob);
  li.appendChild(info);

    // add the li to the end of the table body
    // tblBody.appendChild(li);

    // put the <tbody> in the <table>
    itemList.appendChild(li);
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
	$("#del_item").hide();
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

function hover(a){
  if(a=='on')
  {
    $('li').hover(function(){
      $(this).css("background-color", "yellow");
      }, function(){
      $(this).css("background-color", "");
    });
  }
  else {
    $('li').hover(function(){
      $(this).css("background-color", "");
      }, function(){
      $(this).css("background-color", "");
    });
  }
}

$('#item-list').on('click','li',function() {
	$(this).toggleClass('selected').siblings().removeClass('selected');
	//$(this).toggleClass('active').siblings().removeClass('active');

	if($(this).hasClass('selected'))
	{
    hover('off');
		//show available options
		$("#edit_item").show();
		$("#del_item").show();

		var tableData = $(this).children("span").map(function(){return $(this).text();}).get();
		var id = $(this).attr('data-id');
		var docRef = db.collection("items").doc(id);

		docRef.get().then(function(doc) {
		    if (doc.exists) {
			console.log("Document data:", doc.data());
		    } else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});

		// put data on form
		form.fname.value = db.collection('items').get().snapshot.doc(id).doc.data().fname;
		form.lname.value = tableData[2];
      		form.email.value = tableData[3];
      		form.dob.value = tableData[4];
      		form.info.value = tableData[5];

		//$('#edit_item').click(function(){
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

   		$('#del_item').on('click',function(){
        alert("Deleteing!!!");
        db.collection('items').doc(id).delete();
      });

		}
  	else
  	{
        hover('on');
  			$("#edit_item").hide();
  			$("#del_item").hide();
  			clearForm();
  	}
  });

});
