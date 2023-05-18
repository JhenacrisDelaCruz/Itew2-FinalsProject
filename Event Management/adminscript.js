// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// TOTALS IN DASHBOARD

//TOTAL BOOKING
$(document).ready(function(){
  // Retrieve reservations from localStorage
  var reservations = localStorage.getItem('reservations');
  
  if(reservations){
    reservations = JSON.parse(reservations);
    // Update total bookings count
    $('#bgBooking').text(reservations.length);
  }else {
    // If there are no reservations, display 0 as the total
    $('#bgBooking').text('0');
  }

  // Retrieve clients from localStorage
  var clients = localStorage.getItem('client');
  
  if(clients){
    clients = JSON.parse(clients);
    // Update total bookings count
    $('#bgClient').text(clients.length);
  }else{
    // If there are no clients, display 0 as the total
    $('#bgClient').text('0');
  }

  // Retrieve status = accepted in reservation from localStorage
  var reservations = localStorage.getItem('reservations');
  
  if(reservations){
    reservations = JSON.parse(reservations);

    var acceptedCount = 0; // Variable to store the count of accepted bookings

    reservations.forEach(function(reservation){
      // Convert both status values to lowercase for case-insensitive comparison
      if(reservation.status.toLowerCase() === 'accepted'){
        acceptedCount++;
      }
    });

    // Update the total approved bookings count in the bgApproved element
    $('#bgApproved').text(acceptedCount);
  }

  // Retrieve status = reject in reservation from localStorage
  var reservations = localStorage.getItem('reservations');
  
  if(reservations){
    reservations = JSON.parse(reservations);

    var rejectedCount = 0; // Variable to store the count of accepted bookings

    reservations.forEach(function(reservation){
      // Convert both status values to lowercase for case-insensitive comparison
      if (reservation.status.toLowerCase() === 'rejected'){
        rejectedCount++;
      }
    });

    // Update the total approved bookings count in the bgApproved element
    $('#bgReject').text(rejectedCount);
  }

  // Retrieve status = pending in reservation from localStorage
  var reservations = localStorage.getItem('reservations');
  
  if(reservations){
    reservations = JSON.parse(reservations);

    var pendingCount = 0; // Variable to store the count of accepted bookings

    reservations.forEach(function(reservation){
      // Convert both status values to lowercase for case-insensitive comparison
      if(reservation.status.toLowerCase() === 'pending'){
        pendingCount++;
      }
    });

    // Update the total approved bookings count in the bgApproved element
    $('#pendingNum').text(pendingCount);
  }
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// BOOKING SUMMARY
$(document).ready(function(){
  // Retrieve reservations from localStorage
  var reservations = localStorage.getItem('reservations');
  
  if(reservations){
    reservations = JSON.parse(reservations);
    // Display the reservations in the table
    var tableBody = $('.tbody');
    tableBody.empty();

    reservations.forEach(function(reservation, index){
      var row = $('<tr>');
      row.append($('<td>').text(index + 1)); // Transaction ID
      row.append($('<td>').text(reservation.status)); // Status
      row.append($('<td>').text(reservation.name)); // Name
      row.append($('<td>').text(reservation.email)); // Email
      row.append($('<td>').text(reservation.phone)); // Phone
      row.append($('<td>').text(reservation.eventType)); // Event Type
      row.append($('<td>').text(reservation.venue)); // Venue
      row.append($('<td>').text(reservation.theme)); // Theme
      row.append($('<td>').text(reservation.eventDate)); // Event Date
      row.append($('<td>').text(reservation.eventTime + ' ' + reservation.eventTimeAmPm)); // Event Time
      row.append($('<td>').text(reservation.numAttendees)); // No. of Attendees
      row.append($('<td>').text(reservation.services.join(', '))); // Services
      row.append($('<td>').text(reservation.addons.join(', '))); // Add-ons
      row.append($('<td>').text(reservation.additionalMessage)); // Additional Messages

      // Add click event listener to each row
      row.click(function(){
        if($(this).hasClass('editable')){
          // Row is already editable, do nothing
          return;
        }

        // Make the row editable
        $(this).addClass('editable');
        $(this).find('td:not(:first-child)').attr('contenteditable', true);
      });

      tableBody.append(row);
    });
  }

  // Update button click event
  $('#bookingUpdate').click(function(){
    var selectedRow = $('.tbody .editable');
    
    if(selectedRow.length === 0){
      // No row selected, display an alert message
      alert('Please select a row to edit.');
    }else{
      // Row is selected, allow editing
      selectedRow.find('td:not(:first-child)').attr('contenteditable', true);
    }
  });

  // Save button click event
  $('#bookingSave').click(function(){
    var selectedRow = $('.tbody .editable');
    
    if(selectedRow.length === 0){
      // No row selected, display an alert message
      alert('Please select a row to edit before saving.');
    }else{
      // Row is selected, save the changes
      selectedRow.find('td:nth-child(2)').attr('contenteditable', false);
      selectedRow.removeClass('editable');
      // Update the reservations array with the edited data
      var updatedReservations = [];
      $('.tbody tr').each(function(index){
        var reservation = {
          status: $(this).find('td:nth-child(2)').text(),
          name: $(this).find('td:nth-child(3)').text(),
          email: $(this).find('td:nth-child(4)').text(),
          phone: $(this).find('td:nth-child(5)').text(),
          eventType: $(this).find('td:nth-child(6)').text(),
          venue: $(this).find('td:nth-child(7)').text(),
          theme: $(this).find('td:nth-child(8)').text(),
          eventDate: $(this).find('td:nth-child(9)').text(),
          eventTime: $(this).find('td:nth-child(10)').text().split(' ')[0],
          eventTimeAmPm: $(this).find('td:nth-child(11)').text().split(' ')[1],
          numAttendees: $(this).find('td:nth-child(12)').text(),
          services: $(this).find('td:nth-child(13)').text().split(', '),
          addons: $(this).find('td:nth-child(14)').text().split(', '),
          additionalMessage: $(this).find('td:nth-child(15)').text()
        };
        
        updatedReservations.push(reservation);
      });

      // Save the updated reservations array to localStorage
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));

      // Display a success message
      alert('Changes saved successfully.');
    }
  });

  // Cancel button click event
  $('#bookingCancel').click(function(){
    var selectedRow = $('.tbody .editable');
    
    if(selectedRow.length > 0){
      // Row is selected, cancel the editing
      selectedRow.find('td:not(:first-child)').attr('contenteditable', false);
      selectedRow.removeClass('editable');
      // Restore original values from localStorage
      var reservations = JSON.parse(localStorage.getItem('reservations'));
      
      if(reservations && selectedRow.index() < reservations.length){
        var originalData = reservations[selectedRow.index()];
        selectedRow.find('td:nth-child(2)').text(originalData.status);
        selectedRow.find('td:nth-child(3)').text(originalData.name);
        selectedRow.find('td:nth-child(4)').text(originalData.email);
        selectedRow.find('td:nth-child(5)').text(originalData.phone);
        selectedRow.find('td:nth-child(6)').text(originalData.eventType);
        selectedRow.find('td:nth-child(7)').text(originalData.venue);
        selectedRow.find('td:nth-child(8)').text(originalData.theme);
        selectedRow.find('td:nth-child(9)').text(originalData.eventDate);
        selectedRow.find('td:nth-child(10)').text(originalData.eventTime + ' ' + originalData.eventTimeAmPm);
        selectedRow.find('td:nth-child(11)').text(originalData.numAttendees);
        selectedRow.find('td:nth-child(12)').text(originalData.services.join(', '));
        selectedRow.find('td:nth-child(13)').text(originalData.addons.join(', '));
        selectedRow.find('td:nth-child(14)').text(originalData.additionalMessage);
      }
    }
  });

  $("#tfbookSearch").keyup(function (){
    var value = this.value.toLowerCase().trim();

    $("table tr").each(function (index){
      if (!index) return;
      $(this).find("td").each(function (){

        var id = $(this).text().toLowerCase().trim();
        var not_found = (id.indexOf(value) == -1);
        $(this).closest('tr').toggle(!not_found);
        return not_found;
      });
    });
  });
  
});


     
    
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// EVENT DETAILS
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Create a table row from the item object
  createRow() {
    var row = $("<tr>");
    $("<td>").text(this.name).appendTo(row);
    $("<td>").text(this.price).appendTo(row);
    return row;
  }
}

$(document).ready(function() {
  var storedItem = JSON.parse(localStorage.getItem("eventDetails")) || [];

  // Load stored items and add them to the table
  for (var i = 0; i < storedItem.length; i++) {
    var item = new Item(storedItem[i].name, storedItem[i].price);
    var tableID = "";
    if (storedItem[i].type === "event") {
      tableID = "#event";
    } else if (storedItem[i].type === "service") {
      tableID = "#service";
    } else if (storedItem[i].type === "add-ons") {
      tableID = "#add-ons";
    }
    $(tableID).append(item.createRow());
  }

  // Add event listener to the "Add Item" button
  $("#btnAddOption").click(function() {
    var name = $("#tfItemName").val();
    var price = $("#tfItemPrice").val();
    var type = $("#item_type").val();

    // Create a new item object
    var item = new Item(name, price);
    item.type = type;

    // Get the table ID based on the selected item type
    var tableID = "";
    if (type === "event") {
      tableID = "#event";
    } else if (type === "service") {
      tableID = "#service";
    } else if (type === "add-ons") {
      tableID = "#add-ons";
    }

    // Add the new row to the table and clear the input fields
    if (!name.length == 0 || !price.length == 0) {
      $(tableID).append(item.createRow());
      $("#tfItemName").val("");
      $("#tfItemPrice").val("");

      // Save the item to local storage
      storedItem.push(item);
      localStorage.setItem("eventDetails", JSON.stringify(storedItem));
    }
  });
  });  




// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// VENUE DETAILS
class Item2 {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  
  // Create a table row from the item object
  createRow2() {
    var row = $("<tr>");
    $("<td>").text(this.name).appendTo(row);
    $("<td>").text(this.price).appendTo(row);
    return row;
  }
}

$(document).ready(function() {
  // Load stored items and add them to the table
  var storedItems = JSON.parse(localStorage.getItem("venueDetails")) || [];
  for (var i = 0; i < storedItems.length; i++) {
    var item = new Item2(storedItems[i].name, storedItems[i].price);
    var tableID = "";
    if (storedItems[i].type === "venue") {
      tableID = "#venue";
    } else if (storedItems[i].type === "styling") {
      tableID = "#styling";
    }
    $(tableID).append(item.createRow2());
  }
  
  // Add event listener to the "Add Item" button
  $("#btnAddOption2").click(function() {
    var name = $("#tfItemName2").val();
    var price = $("#tfItemPrice2").val();
    var type = $("#item_type2").val();
    
    // Create a new item object
    var item = new Item2(name, price);
    item.type = type;
    
    // Get the table ID based on the selected item type
    var tableID = "";
    if (type === "venue") {
      tableID = "#venue";
    } else if (type === "styling") {
      tableID = "#styling";
    }
    
    // Add the new row to the table and clear the input fields
    if (name.length !== 0 && price.length !== 0) {
      $(tableID).append(item.createRow2());
      $("#tfItemName2").val("");
      $("#tfItemPrice2").val("");
      
      // Save the item to local storage
      storedItems.push(item);
      localStorage.setItem("venueDetails", JSON.stringify(storedItems));
    }
  });
});




// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// CLIENT DETAILS 
// Retrieve client information from local storage and display as a table
       $(document).ready(function() {
  const users = JSON.parse(localStorage.getItem('client'));
  if (users) {
    const table = $('#clientInfo'); // Update the table selection to use the ID "clientInfo"
    users.forEach(function(user) {
      const row = $('<tr></tr>');
      row.append(`<td>${user.FName} ${user.LName}</td>`);
      row.append(`<td>${user.email}</td>`);
      row.append(`<td>${user.password}</td>`);
      table.append(row);
    });
  }

  //search
    $("#tfSearch2").keyup(function () {
        var value = this.value.toLowerCase().trim();

        $("table tr").each(function (index) {
            if (!index) return;
            $(this).find("td").each(function () {
                var id = $(this).text().toLowerCase().trim();
                var not_found = (id.indexOf(value) == -1);
                $(this).closest('tr').toggle(!not_found);
                return not_found;
            });
        });
    });
});
