window.onload = function () {
  start();
}; 
var arr = [] /*Main Array who store all the table data */, newarr /*active while any search perform on saved data*/, mainDisplayArr = [] /*Array which store all the pass student data */;
var count;/*Counter which calculate total rows in array */

//Refresh or Strat Fumction
function start() {
  count = 0;
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("panel").style.display = "none";
  for (let i = 0; i < 5; i++) {
    addRow();
  }
}

// Add new Row Function
function addRow() {
  count++;
  var add = document.getElementById("tableBody");
  let html = `<tr> <td class="counter">` + count + `</td> <td><input class="form-control" type="text" onchange="validation(this,1)" onkeypress="return onInputEvent(event,1)" placeholder="Enter Name"></td><td><input class="form-control" type="text" onchange="validation(this,1)" onkeypress="return onInputEvent(event,1)" placeholder="Subject Name"></td><td><input class="form-control " type="text" onchange="validation(this,2)" onkeypress="return onInputEvent(event,2)"  placeholder="Mark"></td><td class="d-flex justify-content-between"><button class="btn btn-outline-success" onclick="validation(this,3)">Pass</button><button class="btn btn-outline-danger" onclick="validation(this,4)">Fail</button></td> <td><button class="btn deleteRow" onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i></button</td></tr>`;
  add.insertAdjacentHTML("beforeend", html);
  arr.push([null, null, null, null]);
  disabled();
}
// On Input Event which restricted from wrong input in respected field
function onInputEvent(evt, eventPoint) {
  let asciiValue = evt.keyCode;
  switch (eventPoint) {
    case 1:
      return ((asciiValue >= 97 && asciiValue <= 122) || (asciiValue >= 65 && asciiValue <= 90) || asciiValue == 32)? true :  false;
      break;
    case 2:
      return ((asciiValue >= 48 && asciiValue <= 57) || asciiValue == 46)? true :  false;
      break;
  }
}

//Delete Row From Table
function deleteRow(deleteElement) {
  if (!confirm("Ohh!!! \n Are you sure to delete record")) {
    return;
  };
  count--;
  arr.splice(deleteElement.parentNode.parentNode.rowIndex - 1, 1);
  deleteElement.parentNode.parentNode.remove();
  var num = document.querySelectorAll(".counter");
  for (let i = 1; i <= num.length; i++) {
    num[i - 1].innerHTML = i;
  }
  disabled();
}

// Saved Button action 
function savedTable() {
  let isValid = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 3; j++) {
       if(arr[i][j]==null){
        isValid=1;
        break;
       } 
    }
    if(isValid){
      break;
    }
  }
  if (isValid == 1) {
    alert("Please Enter All The Value In Table");
    return;
  }
  document.getElementById("panel").style.display = "";
  document.getElementById('myInput').value = "";
  document.getElementById('sortingOrder').style.display = "none";
  document.getElementById('sortingOrder').value = "0";
  document.getElementById('sortDrop').value = "0";
  mainDisplayArr = arr.filter(function (value) { return value[3] == "pass" })
  displayTable(mainDisplayArr, "finalTableBody");
  resultTable();
}

//Display Result Table
function displayTable(tempArr, tableid) {
  document.getElementById(tableid).innerHTML = "";
  let columCount = document.getElementById(tableid).previousElementSibling.firstElementChild.childElementCount;
  var finalAdd = document.getElementById(tableid);
  for (let i = 0; i < tempArr.length; i++) {
    html = `<tr> <td>` + (i + 1) + `</td>`;
    for (let j = 0; j < columCount - 1; j++) {
      (j == (columCount - 2) && parseInt(tempArr[i][j]) < 33) ? (html += `<td class="failStudent">` + tempArr[i][j] + `</td>`) : (html += `<td>` + tempArr[i][j] + `</td>`);
    }
    html += "</tr>";
    finalAdd.insertAdjacentHTML("beforeend", html);
  }
}

//Validation From 
function validation(cell, actionValue) {
  let rowIndex = cell.parentNode.parentNode.rowIndex;
  let columIndex = cell.parentNode.cellIndex;
  let cellValue = cell.value;
  switch (actionValue) {
    case 1:
      (cellValue.trim() == "") ? cellValue = null : null;
      break;
    case 2:
      let val = parseInt((cellValue));
      if ((val < 0 || val > 100)) {
        alert("wrong Input At Row No. " + rowIndex + " and  Colum No. " + (columIndex + 1) + "\nEnter Mark in between 0 to 100");
        cell.value = "";
        return;
      }
      (cellValue.trim() == "") ? cellValue = null : null;
      break;
    case 3:
      cell.nextElementSibling.setAttribute("class", 'btn btn-outline-danger');
      cell.setAttribute("class", 'btn btn-success');
      cellValue = "pass";
      break;
    case 4:
      cell.previousElementSibling.setAttribute("class", 'btn btn-outline-success');
      cell.setAttribute("class", 'btn btn-danger');
      cellValue = "fail";
      break;
  }
  arr[rowIndex - 1][columIndex - 1] = cellValue;
}

//Search data from table
function searchResult() {
  document.getElementById("finalTableBody").innerHTML = ""; 
  var vlue = document.getElementById('myInput').value;
  newarr = mainDisplayArr.filter((ele) => {
    if (!(vlue.trim() == "")) {
      return ((ele[0].toUpperCase().startsWith(vlue.toUpperCase())) || (ele[1].toUpperCase().startsWith(vlue.toUpperCase())))? true : false;
    }
    else {return true;}
  });
  displayTable(newarr, "finalTableBody");
}

//Delete Button Disable or not Function
function disabled() {
  let deleteBtn = document.getElementsByClassName("deleteRow");
  if (count <= 5) {
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].disabled = "true";
      deleteBtn[i].classList.remove("btn-outline-danger");
      deleteBtn[i].classList.add("btn-danger");
    }
  } else {
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].disabled = false;
      deleteBtn[i].classList.remove("btn-danger");
      deleteBtn[i].classList.add("btn-outline-danger");
    }
  }
}

//Sort Data From Array
function sorting() {
  document.getElementById('sortingOrder').style.display = "";
  (!newarr) ? tempArr = [...mainDisplayArr] : tempArr = [...newarr];
  let sortingValue = parseInt(document.getElementById("sortDrop").value);
  switch (sortingValue) {
    case 0:
      document.getElementById('sortingOrder').value = "0";
      document.getElementById('sortingOrder').style.display = "none";
      tempArr;
      break;
    case 1:
      tempArr.sort(function (a, b) {
        return (a[0] == b[0]) ? 0 : (a[0] < b[0]) ? -1 : 1;
      });
      break;
    case 2:
      tempArr.sort(function (a, b) {
        return (a[1] == b[1]) ? 0 : (a[1] < b[1]) ? -1 : 1;
      });
      break;
  }
  if (parseInt(document.getElementById("sortingOrder").value) && ((sortingValue == 1) || (sortingValue == 2))) {
    tempArr.reverse();
    tempArr.sort(function (a, b) {
      return (a[sortingValue - 1] == b[sortingValue - 1]) ? -1 : null;
    });
  }
  displayTable(tempArr, "finalTableBody")
}

//Print Record
function printDiv() {
  window.print();
}

//Result Table Array
function resultTable() {
  let occurence = 0, mark = 0, flag;
  var resultArr = [];
  for (let i = 0; i < mainDisplayArr.length; i++) {
    flag = 0;
    for (let j = 0; j < resultArr.length; j++) {
      if (resultArr[j][0] == mainDisplayArr[i][0]) {
        flag = 1;
        break;
      }
    }
    if (flag){
      continue;
    }
    resultArr.push([mainDisplayArr[i][0], null]);
    occurence = 1;
    mark = parseFloat(mainDisplayArr[i][2]);
    for (let j = i + 1; j < mainDisplayArr.length; j++) {
      if (mainDisplayArr[i][0] == mainDisplayArr[j][0]) {
        occurence++;
        mark = mark + parseFloat(mainDisplayArr[j][2]);
      }
    }
    resultArr[resultArr.length - 1][1] = parseFloat(mark / occurence).toFixed(2) + "%";
  }
  displayTable(resultArr, "resultTableBody")
}