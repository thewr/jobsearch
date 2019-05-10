
// creates a <ol> list element and functions
var itemList = document.querySelector('#item-list');
itemList.addEventListener('click', myFunc, false);//itemList.addEventListener('click', myFunc, false);
itemList.count = 0;

// create form element
var form = document.querySelector('#item-form');

// define buttons
refresh_button.addEventListener('click',refreshFunc,false);
save_button.addEventListener('click',saveFunc,false);

function refreshFunc(evt)
{
	var count = itemList.count;
	const id = evt.target.parentElement.getAttribute('data-id');

	//alert("Doc ID: " + id);

	while(itemList.firstChild){
		itemList.removeChild(itemList.firstChild);
	}
	//get data
	db.collection('applications')
		.orderBy('date','desc')
		.get().then(snapshot => {
		itemList.count = 0;
	    snapshot.docs.forEach(doc => {
		renderDB(doc);
	    });
	});//end of get data
}


function saveFunc(e){
        e.preventDefault();
	//const ref = db.collection("applications").doc(id);
    
       // getting data
	
    // CODE TO TAKE RENDER TO DB
    var item = itemList.firstChild;
    var n = item.children.length;
    var tableData = [];

    for(var i = 0; i < n; i++){
    	tableData = item.childNodes[i].innerHTML;
	 var x = item.childNodes[i].innerHTML;
	    if(i%2 == 0){
		    tableData.push(x);
		    console.log(tableData);
	    }
    }	
    while(itemList.firstChild){
          var item = itemList.firstChild;
	    db.collection('backup').add({
		date: todaysDate(),
		name: item.childNodes[2].innerHTML,
		wordsA: item.childNodes[4].innerHTML,
		//wordsB: item.childNodes[6].innerHTML,
		//wordsC: item.childNodes[8].innerHTML,
		//wordsD: item.childNodes[10].innerHTML,
		//subject: item.childNodes[12].innerHTML
	    });
	    itemList.removeChild(itemList.firstChild);	    
    }
	// clear form
	clearForm();
	
	// generate new db
	refresh();
}

/*
var div = document.getElementById('divID');
div.innerHTML += 'Extra stuff';
*/
// refresh the console (needs work)
	
function refresh() {
    //setTimeout(function () {
     //   location.reload()
    //}, 100);
	//clear data
	//alert("Clearing");

	
	while(itemList.firstChild){
		//console.log('removing ... ' + itemList.count);
		itemList.count -= 1;
		itemList.removeChild(itemList.firstChild);
	}
	
	//get data
	alert("Displaying");
	db.collection('applications').get().then(snapshot => {
		//itemList.count = 0;
	    snapshot.docs.forEach(doc => {
		renderDB(doc);
	    });
	});//end of get data
}

// for selections
var $div = $("<div id='edit_item'>"+"Edit"+"</div>");  //{id: "foo", "class": "a"});

function todaysDate()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}


function clearForm()
{
      form.name.value = '';
      form.wordsA.value = '';
      form.wordsB.value = '';
      form.wordsC.value = '';
      form.wordsD.value = '';
      form.subject.value = '';
}

function myFunc(evt)
{
	const id = evt.target.parentElement.getAttribute('data-id');
	
	if(evt.target.nodeName == 'SPAN'){// && evt.taget.className = 'selected') {
            console.log(id + " was clicked");	
	    const ref = db.collection("applications").doc(id);
		try {
			var tableData = {};
			ref.get()
			.then(doc => {
				if(!doc.exists) {
					window.alert("no such document");
				} else {
					tableData = {
						//date: doc.data().date,
						name: doc.data().name,
						wordsA: doc.data().wordsA,
						wordsB: doc.data().wordsB,
						wordsC: doc.data().wordsC,
						wordsD: doc.data().wordsD,
						subject: doc.data().subject
					};  //window.alert(tableData.name + " " + tableData.subject);
				}
			})
		} catch (error) {
		res.send(error);
		}

						$('#edit_item').click(function(){
							form.name.value =  tableData.name;
							form.wordsA.value = tableData.wordsA;
							form.wordsB.value = tableData.wordsB;
							form.wordsC.value = tableData.wordsC;
							form.wordsD.value = tableData.wordsD;
							form.subject.value = tableData.subject;

							$('#item_submit').click(function(){ //form.addEventListener('append', (e) => { e.preventDefault();
								db.collection("applications").doc(id).update({
									name: form.name.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									wordsD: form.wordsD.value,
									subject: form.subject.value
								});
								clearForm();
								refresh();
							});
							return;
						});


						$('#delete_item').click(function(){
							ref.delete();
							refresh();
						});//end-of-delete_item event
	} else {
		return;
	}
}

// create element & render cafe
function renderDB(doc){
  // create list document elements
  itemList.count += 1;
  console.log('adding ... ' + itemList.count);
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');  name.style.cssText = "padding: 3px 0px 3px 12px; font-size: 12px; border-bottom: 2px solid black";
  let wordsA = document.createElement('span');  wordsA.style.cssText = "padding: 3px 0px 3px 12px; font-size: 12px;";
  let wordsB = document.createElement('span');  wordsB.style.cssText = "padding: 3px 0px 6px 12px; font-size: 12px;";
  let wordsD = document.createElement('span');  wordsD.style.cssText = "padding: 3px 0px 6px 12px; font-size: 12px;";
  let wordsC = document.createElement('span');  wordsC.style.cssText = "font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');  subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;";

  //let cross = document.createElement('div');
  //cross.textContent = 'x';

  let date = document.createElement('div');
  date.style.cssText = "display: block";

  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "COMPANY/AGENCY";
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";

  let label_address = document.createElement('span');
  label_address.textContent = "LOCATION";
  label_address.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";

  let label_website = document.createElement('span');
  label_website.textContent = "WEBSITE";
  label_website.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";

  let label_jobtitle = document.createElement('span');
  label_jobtitle.textContent = "POSITION";
  label_jobtitle.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";
	
  let label_contact = document.createElement('span');
  label_contact.textContent = "CONTACT";
  label_contact.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";
	
  let label_subject = document.createElement('span');
  label_subject.textContent = "LOG ENTRY";
  label_subject.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold;"; //border: 1px solid black";

  // render document contents
  date.textContent = doc.data().date;
  name.textContent = doc.data().name;
  wordsA.textContent = doc.data().wordsA;
  wordsB.textContent = doc.data().wordsB;
  wordsC.textContent = doc.data().wordsC;
  wordsD.textContent = doc.data().wordsD;
  subject.textContent = doc.data().subject;

  // append list
//  row.appendChild(row_count);
 // li.appendChild(date);
	
  var t = document.createTextNode("text here");
  itemList.appendChild(t);

  li.appendChild(label_name);
  li.appendChild(name);

if(doc.data().wordsA){
  li.appendChild(label_address);
  li.appendChild(wordsA);
}
	
if(doc.data().wordsB){
  li.appendChild(label_website);
  li.appendChild(wordsB);
}
	
if(doc.data().wordsD){
  li.appendChild(label_jobtitle);
  li.appendChild(wordsD);
}
	
if(doc.data().wordsC){
  li.appendChild(label_contact);
  li.appendChild(wordsC);
}	
	
if(doc.data().subject){
  li.appendChild(label_subject);
  li.appendChild(subject);
}

 // li.appendChild(cross);


  // put the <itemList> in the <ol>
  itemList.appendChild(li);

  // deleting data
  /*
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('applications').doc(id).delete();
    });
    */
}

// getting data
db.collection('applications')
	.orderBy('date','desc')
	.get()
	.then(snapshot => 
	      {
		itemList.count = 0;
    		snapshot.docs.forEach(doc => {
        	renderDB(doc);
	});
});



//saving data
var handler = function(e){
	e.preventDefault();
	db.collection('applications').add({
		date: todaysDate(),
        	name: form.name.value,
        	wordsA: form.wordsA.value,
		wordsB: form.wordsB.value,
		wordsC: form.wordsC.value,
		wordsD: form.wordsD.value,
        	subject: form.subject.value
    });
	clearForm();
	refresh();
};

//form.addEventListener('submit', handler);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('applications').add({
	date: todaysDate(),
        name: form.name.value,
        wordsA: form.wordsA.value,
	wordsB: form.wordsB.value,
	wordsC: form.wordsC.value,
	wordsD: form.wordsD.value,
        subject: form.subject.value
    });
	// clear form
	clearForm();
	
	// generate new db
	refresh();
});


form.addEventListener('cancel', (e) => {
    e.preventDefault();
	refresh();
});


$(function(){
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.sidebar').hide();


	// Animate slide for create new form	
	function display_add(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();
	         $('.sidebar').show();
	    	 //$('.sidebar').animate({width: '33%'});
	         $(".max").hide().fadeIn(500);

		//$("#label").html("Add Entry");
	  	 $('#close_app').show();
	}

	// Add new document button show
	$("#new_item").click(function(){
		$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
	});

	// Animate slide for edit form
	function display_edit(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();

	         $('.sidebar').show();
	    	 //$('.sidebar').animate({width: '33%'});
	         $(".max").hide().fadeIn(500);

		//$("#label").html("Add Entry");
	  	 $('#close_app').show();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
	  $("#item_submit").attr('value', 'Append').attr('type','append');
	  display_edit();
  });

  $('#item_submit').click(function(){
    	  $(".content").hide();
	  $('.sidebar').hide();
	  $(".min").show();
	  $( ".docs" ).toggleClass('blur-me');
	//  $('#close_app').hide();
  });
	
$('#item_cancel').click(function(){
 	 $('.sidebar').hide();
         $(".min").show();
	 $( ".docs" ).toggleClass('blur-me');
	 refresh();
});


  	$('#close_app').click(function(){
    		$(".content").hide();
	   	$('.sidebar').animate({width: '54px'});
	 	$( ".docs" ).toggleClass('blur-me');
	     	$('#close_app').hide();
	});

	
	$('#item-list').on('click','li',function() {
	$(this).toggleClass('selected').siblings().removeClass('selected');
		if($(this).hasClass('selected')){
			//$(this).append($div);
			$("#edit_item").show();
			$("#delete_item").show();
			// change selected's background-color
			$(this).css("background-color", "rgb(225, 255, 107)");
		} else {
			$(this).css("background-color", "");
			// $div.remove();
      			$("#edit_item").hide();
			$("#delete_item").hide();

		}
		

	});

});
