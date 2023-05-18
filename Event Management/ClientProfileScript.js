$(document).ready(function () {
  const users = JSON.parse(localStorage.getItem("client"));
  if (users && users.length > 0) {
    const email = localStorage.getItem("currentEmail");
    const password = localStorage.getItem("currentPassword");
    const user = users.find((client) => client.email === email && client.password === password);
    if (user) {
      let clientName = user.FName + " " + user.LName;
      $("#clientName").text(clientName);
        $("#FName").text(user.FName);
      $("#LName").text(user.LName);
      $("#email").text(user.email);
      $("#password").text(user.password);

      // Update button click event
      $("#updateBtn").click(function () {
        $("#FName").html(`<input type="text" id="editFName" value="${user.FName}">`);
        $("#LName").html(`<input type="text" id="editLName" value="${user.LName}">`);
        $("#email").html(`<input type="text" id="editEmail" value="${user.email}">`);
        $("#password").html(`<input type="password" id="editPassword" value="${user.password}">`);
        $("#updateBtn").hide();
        $("#saveBtn").show();
        $("#cancelBtn").show();
      });

      // Save button click event
      $("#saveBtn").click(function () {
        const updatedFName = $("#editFName").val();
        const updatedLName = $("#editLName").val();
        const updatedEmail = $("#editEmail").val();
        const updatedPassword = $("#editPassword").val();

        user.FName = updatedFName;
        user.LName = updatedLName;
        user.email = updatedEmail;
        user.password = updatedPassword;

        $("#FName").text(updatedFName);
        $("#LName").text(updatedLName);
        $("#email").text(updatedEmail);
        $("#password").text(updatedPassword);

        // Update clientName
        clientName = updatedFName + " " + updatedLName;
        $("#clientName").text(clientName);

        localStorage.setItem("client", JSON.stringify(users));
        $("#saveBtn").hide();
        $("#updateBtn").show();
        $("#cancelBtn").hide();
      });

      // Cancel button click event
      $("#cancelBtn").click(function () {
        $("#FName").text(user.FName);
        $("#LName").text(user.LName);
        $("#email").text(user.email);
        $("#password").text(user.password);

        $("#saveBtn").hide();
        $("#updateBtn").show();
        $("#cancelBtn").hide();
      });
    }
  }


// ANIMATION FOR SECTIONS
 // Get all the links with the "Client" class
  const links = document.querySelectorAll('.Client');

  // Add an event listener to each link
  links.forEach(link => {
    link.addEventListener('click', () => {
      handleLinkClick(link);
    });
  });

  function handleLinkClick(clickedLink) {
    // Remove the active class from all the links
    links.forEach(link => link.classList.remove('active'));

    // Add the active class to the clicked link
    clickedLink.classList.add('active');

    // Show the selected section with animation
    const sectionId = clickedLink.getAttribute('data-section');
    showSection(sectionId);
  }

  function showSection(sectionId) {
    // Hide all the sections
    $('section').hide();

    // Show the selected section with animation
    $('.' + sectionId).fadeIn();
  }
});

// ANIMATION FOR HEADER
$(function() {
  var shrinkHeader = 100;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
    if (scroll >= shrinkHeader) {
      $('header').addClass('shrink');
    } else {
      $('header').removeClass('shrink');
    }
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});




// RETRIEVE RESERVATION AND DIPLAY TO THE BOOKED EVENT
$(document).ready(function () {
  // Display booked events in the table
  var reservations = localStorage.getItem('reservations');
  if (reservations) {
    reservations = JSON.parse(reservations);
    var eventTable = $('#eventTable');
    for (var i = 0; i < reservations.length; i++) {
      var reservation = reservations[i];
      var row = '<tr>' +
        '<td>' + reservation.status + '</td>' +
        '<td>' + reservation.name + '</td>' +
        '<td>' + reservation.email + '</td>' +
        '<td>' + reservation.phone + '</td>' +
        '<td>' + reservation.eventDate + '</td>' +
        '<td>' + reservation.eventTime + ' ' + reservation.eventTimeAmPm + '</td>' +
        '<td>' + reservation.eventType + '</td>' +
        '<td>' + reservation.venue + '</td>' +
        '<td>' + reservation.theme + '</td>' +
        '<td>' + reservation.numAttendees + '</td>' +
        '<td>' + reservation.services.join(', ') + '</td>' +
        '<td>' + reservation.addons.join(', ') + '</td>' +
        '<td>' + reservation.additionalMessage + '</td>' +
        '</tr>';
      eventTable.append(row);
    }
  }

  // Add click event listener to bookingUpdate button
  var bookingUpdateBtn = $('#bookingUpdate');
  var bookingCancelBtn = $('#bookingCancel');
  var bookingDeleteBtn = $('#bookingDelete');
  var isEditMode = false; // Flag variable for edit mode
  var originalReservations; // Variable to store the original reservations
  var selectedRow; // Variable to store the selected row for deletion

  bookingUpdateBtn.click(function() {
    if (!isEditMode) {
      // Switch to edit mode
      isEditMode = true;
      bookingUpdateBtn.text("SAVE");
      bookingCancelBtn.prop('disabled', false); // Enable the cancel button
      bookingDeleteBtn.prop('disabled', true); // Disable the delete button
      $('#eventTable td:not(:first-child)').prop('contenteditable', true);
      $('#eventTable tr:not(:first-child) td:nth-child(2)').prop('contenteditable', 'false'); // Make the second child not editable
      // Store a copy of the original reservations
      originalReservations = JSON.parse(localStorage.getItem('reservations'));
    } else {
      // Save changes and switch back to display mode
      isEditMode = false;
      bookingUpdateBtn.text("UPDATE");
      bookingCancelBtn.prop('disabled', true); // Disable the cancel button
      bookingDeleteBtn.prop('disabled', false); // Enable the delete button
      $('#eventTable td:not(:first-child)').prop('contenteditable', false);
      // Save changes to local storage
      var rows = $('#eventTable tr:not(:first-child)');
      var reservations = [];
      rows.each(function(index, row) {
        var cells = $(row).find('td');
        var reservation = {
        status: cells.eq(0).text(),
        name: cells.eq(1).text(),
        email: cells.eq(2).text(),
        phone: cells.eq(3).text(),
        eventDate: cells.eq(4).text(),
        eventTime: cells.eq(5).text().split(' ')[0],
        eventTimeAmPm: cells.eq(5).text().split(' ')[1],
        eventType: cells.eq(6).text(),
        venue: cells.eq(7).text(),
        theme: cells.eq(8).text(),
        numAttendees: cells.eq(9).text(),
        services: cells.eq(10).text().split(','),
        addons: cells.eq(11).text().split(','),
        additionalMessage: cells.eq(12).text()
        };
        reservations.push(reservation);
      });
            localStorage.setItem('reservations', JSON.stringify(reservations));
      originalReservations = null; // Reset the original reservations
    }
  });

  // Add click event listener to bookingCancel button
  bookingCancelBtn.click(function() {
    if (isEditMode && originalReservations) {
      // Restore the original reservations
      localStorage.setItem('reservations', JSON.stringify(originalReservations));
      // Clear the table and display the original reservations
      eventTable.find('tr:not(:first-child)').remove();
      for (var i = 0; i < originalReservations.length; i++) {
        var reservation = originalReservations[i];
        var row = '<tr>' +
          '<td>' + reservation.status + '</td>' +
          '<td>' + reservation.name + '</td>' +
          '<td>' + reservation.email + '</td>' +
          '<td>' + reservation.phone + '</td>' +
          '<td>' + reservation.eventDate + '</td>' +
          '<td>' + reservation.eventTime + ' ' + reservation.eventTimeAmPm + '</td>' +
          '<td>' + reservation.eventType + '</td>' +
          '<td>' + reservation.venue + '</td>' +
          '<td>' + reservation.theme + '</td>' +
          '<td>' + reservation.numAttendees + '</td>' +
          '<td>' + reservation.services.join(', ') + '</td>' +
          '<td>' + reservation.addons.join(', ') + '</td>' +
          '<td>' + reservation.additionalMessage + '</td>' +
          '</tr>';
        eventTable.append(row);
      }
      // Switch back to display mode
      isEditMode = false;
      bookingUpdateBtn.text("UPDATE");
      bookingCancelBtn.prop('disabled', true); // Disable the cancel button
      bookingDeleteBtn.prop('disabled', false); // Enable the delete button
      $('#eventTable td:not(:first-child)').prop('contenteditable', false);
      originalReservations = null; // Reset the original reservations
    }
  });

  // Add click event listener to bookingDelete button
  var confirmDelete = false; // Variable to track delete confirmation

  bookingDeleteBtn.click(function() {
    if (!confirmDelete) {
      confirmDelete = true;
      alert("Please select a row from the table to delete.");
      return;
    }

    if (!selectedRow) {
      confirmDelete = false;
      alert("Please select a row from the table to delete.");
      return;
    }

    var confirmation = confirm("Are you sure you want to delete the selected row?");
    if (confirmation) {
      selectedRow.remove();

      // Update the reservations array and save changes to local storage
      var rows = $('#eventTable tr:not(:first-child)');
      var reservations = [];
      rows.each(function(index, row) {
        var cells = $(row).find('td');
        var reservation = {
          status: cells.eq(0).text(),
          name: cells.eq(1).text(),
          email: cells.eq(2).text(),
          phone: cells.eq(3).text(),
          eventDate: cells.eq(4).text(),
          eventTime: cells.eq(5).text().split(' ')[0],
          eventTimeAmPm: cells.eq(5).text().split(' ')[1],
          eventType: cells.eq(6).text(),
          venue: cells.eq(7).text(),
          theme: cells.eq(8).text(),
          numAttendees: cells.eq(9).text(),
          services: cells.eq(10).text().split(','),
          addons: cells.eq(11).text().split(','),
          additionalMessage: cells.eq(12).text()
        };
        reservations.push(reservation);
      });

      localStorage.setItem('reservations', JSON.stringify(reservations));
      selectedRow = null; // Reset the selected row
    } else {
      alert("Deletion process canceled.");
      selectedRow = null; // Reset the selected row
    }
    confirmDelete = false; // Reset the delete confirmation
  });

  // Add click event listener to table rows
  var eventTable = $('#eventTable'); // Retrieve the eventTable element

eventTable.on('click', 'tr:not(:first-child)', function() {
  if (confirmDelete) {
    var confirmation = confirm("Are you sure you want to delete the selected row?");
    if (confirmation) {
      $(this).remove();

      // Update the reservations array and save changes to local storage
      var rows = $('#eventTable tr:not(:first-child)');
      var reservations = [];
      rows.each(function(index, row) {
        var cells = $(row).find('td');
        var reservation = {
          status: cells.eq(0).text(),
          name: cells.eq(1).text(),
          email: cells.eq(2).text(),
          phone: cells.eq(3).text(),
          eventDate: cells.eq(4).text(),
          eventTime: cells.eq(4).text().split(' ')[0],
          eventTimeAmPm: cells.eq(5).text().split(' ')[1],
          eventType: cells.eq(6).text(),
          venue: cells.eq(7).text(),
          theme: cells.eq(8).text(),
          numAttendees: cells.eq(9).text(),
          services: cells.eq(10).text().split(','),
          addons: cells.eq(11).text().split(','),
          additionalMessage: cells.eq(12).text()
        };
        reservations.push(reservation);
      });

      localStorage.setItem('reservations', JSON.stringify(reservations));
      selectedRow = null; // Reset the selected row
    } else {
      alert("Deletion process canceled.");
      selectedRow = null; // Reset the selected row
    }

    confirmDelete = false; // Reset the delete confirmation
  } else {
    // Highlight the selected row
    eventTable.find('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    selectedRow = $(this);
    bookingDeleteBtn.prop('disabled', false); // Enable the delete button
  }
});

// Disable delete button if there are no rows to delete on page load
if ($('#eventTable tr:not(:first-child)').length === 0) {
  bookingDeleteBtn.prop('disabled', true);
  bookingUpdateBtn.prop('disabled', true);
  bookingCancelBtn.prop('disabled', true);
}

  $('#logOutBtn').click(function() {
    // Navigate to FrontPage.html
    window.location.href = 'FrontPage.html';
  });
});