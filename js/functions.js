'use strict';

$(function () {
    var operation = "C";
    var selected_index = -1;
    var tblTimeTask = localStorage.getItem("tblTimeTask");
    tblTimeTask = JSON.parse(tblTimeTask);
    if (tblTimeTask === null)
    tblTimeTask = [];

  function Create() {
    var person = JSON.stringify({
      Calendar: $("#txtDate").val(),
      Time: $("#txtStartTime").val(),
      Time2: $("#txtEndTime").val(),
      Project: $("#txtProject").val(),
      Description: $("#txtDescription").val()
    });
    tblTimeTask.push(person);
    localStorage.setItem("tblTimeTask", JSON.stringify(tblTimeTask));
    return true;   
  }

  function Edit() {
    tblTimeTask[selected_index] = JSON.stringify({
      Calendar: $("#txtDate").val(),
      Time: $("#txtStartTime").val(),
      Time2: $("#txtEndTime").val(),
      Project: $("#txtProject").val(),
      Description: $("#txtDescription").val()
    });
    localStorage.setItem("tblTimeTask", JSON.stringify(tblTimeTask));
    return true;
  }

 $(function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // var s = today.getSeconds();
    // var ampm = h >=24 ? 'PM' : 'AM';
    // h = h % 24;
    // h = h ? h : 24;
    // m = m < 10 ? +m : m;
    m = checkTime(m);
     // s = checkTime(s);
    today = h + ":" + m;
    var t = setTimeout(startTime, 500);
    document.getElementById('txtStartTime').value = today;
    //document.getElementById('txtEndTime').value = today;

    });
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    $(function GetDate() {
        var param1 = new Date();
        var dd = param1.getDate();
        var mm = param1.getMonth()+1;
        var yyyy = param1.getFullYear();
        param1 = mm+'/'+dd+'/'+yyyy;
        document.getElementById('txtDate').value = param1;

  });

  function Delete() {
    tblTimeTask.splice(selected_index, 1);
    localStorage.setItem("tblTimeTask", JSON.stringify(tblTimeTask));
    location.reload();
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +
            "<th>Date</th>" +
            "<th>Start Time</th>" +
            "<th>End Time</th>" +
            "<th>Project</th>" +
            "<th>Description</th>" +
            "<th>Actions</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tblTimeTask) {
        var per = JSON.parse(tblTimeTask[i]);
        $("#tblList tbody").append("<tr>" +
                "<td>" + per.Calendar + "</td>" +
                "<td>" + per.Time + "</td>" +
                "<td>" + per.Time2 + "</td>" +
                "<td>" + per.Project + "</td>" +
                "<td>" + per.Description + "</td>" +
                "<td><img src='image/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    }
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  });

  List();
  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete();
    List();
    });
});
  