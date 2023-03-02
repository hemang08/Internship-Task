window.onload = function () {
  start();
};
var arr, newarr;
var count;

//Refresh or Strat Fumction
function start() {
  count = 0;
  arr = [];
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
  let html = `<tr> <td class="counter">` + count + `</td> <td><input class="form-control" type="text" onchange="validation(this,1)" placeholder="Enter Name"></td><td><input class="form-control" type="text" onchange="validation(this,1)" placeholder="Subject Name"></td><td><input class="form-control " type="text" onchange="validation(this,2)" name="handle" placeholder="Mark"></td><td class="d-flex justify-content-between"><button class="btn btn-success rounded-0" id ="pass">Pass</button><button class="btn btn-danger rounded-0 ms-2" id ="fail">Fail</button></td> <td><button class="btn btn-danger  deleteRow" onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i></button</td>  `;
  add.insertAdjacentHTML("beforeend", html);
  arr.push([null, null, null, null]);
  disabled();
}

//Delete Row From Table
function deleteRow(deleteElement) {
  if(!confirm("Ohh!!! \n Are you sure to delete record")){
    return;
  };
  count--;
  arr.splice(deleteElement.parentNode.parentNode.rowIndex - 1, 1);
  deleteElement.parentNode.parentNode.remove();
  var num = document.querySelectorAll(".counter");
  for (let i = 1; i <= num.length; i++) {
    num[i - 1].innerHTML = i;
  }
  let deleteBtn = document.getElementsByClassName("deleteRow");
  disabled();
}

// Saved Button action 
function savedTable() {
  document.getElementById("panel").style.display = "";
  document.getElementById('myInput').value = "";
  document.getElementById('sortingOrder').style.display = "none";
  document.getElementById('sortingOrder').value = "0";
  document.getElementById('sortDrop').value = "0";
  displayTable(arr);
}

//Display Result Table
function displayTable(tempArr) {
  document.getElementById("finalTableBody").innerHTML = "";
  var finalAdd = document.getElementById("finalTableBody");
  for (let i = 0; i < tempArr.length; i++) {
    html = `<tr> <td>` + (i + 1) + `</td>`;
    for (let j = 0; j < 3; j++) {
      (j == 2 && parseInt(tempArr[i][j]) < 33) ? (html += `<td class="failStudent">` + tempArr[i][j] + `</td>`) : (html += `<td>` + tempArr[i][j] + `</td>`);
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
      if (!/^[a-zA-Z ]*$/.test(cellValue)) {
        alert("This field must be contain Characters");
        cell.value = "";
        return;
      }
      (cellValue.trim()==="")? cellValue=null: null;
      break;
    case 2: 
      let val = parseInt((cellValue));
      if ((val < 0 || val > 100) ) {
        alert("wrong Input At " + rowIndex + " Row and " + (columIndex + 1) + " Colum \nEnter Mark in between 0 to 100");
        cell.value = "";
        return;
      }
      (cellValue.trim()==="")? cellValue=null: null;
      break;
  }
  arr[rowIndex - 1][columIndex - 1] = cellValue;
}

//Search data from table
function searchResult() {
  document.getElementById("finalTableBody").innerHTML = "";
  var vlue = document.getElementById('myInput').value;
  newarr = arr.filter((ele) => {
    if (!(vlue.trim() === "")) {
      if ((ele[0] && ele[0].toUpperCase().startsWith(vlue.toUpperCase())) || (ele[1] && ele[1].toUpperCase().startsWith(vlue.toUpperCase()))) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  });
  displayTable(newarr);
}

//Delete Button Disable or not Function
function disabled() {
  let deleteBtn = document.getElementsByClassName("deleteRow");
  if (count <= 5) {
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].disabled = "true";
    }
  } else {
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].disabled = false;
    }
  }
}

//Sort Data From Array
function sorting() {
  document.getElementById('sortingOrder').style.display = "";
  (!newarr) ? tempArr = [...arr] : tempArr = [...newarr];
  let sortingValue = parseInt(document.getElementById("sortDrop").value);
  switch (sortingValue) {
    case 0:
    document.getElementById('sortingOrder').value = "0";
    document.getElementById('sortingOrder').style.display = "none";
      tempArr;
      break;
    case 1:
      tempArr.sort(function (a, b) {
        return a[0] == null ? 1 : b[0] == null ? -1 : (a[0] == b[0]) ? 0 : (a[0] < b[0]) ? -1 : 1;
      });
      break;
    case 2:
      tempArr.sort(function (a, b) {
        return a[1] == null ? 1 : b[1] == null ? -1 : (a[1] == b[1]) ? 0 : (a[1] < b[1]) ? -1 : 1;
      });
      break;
  }
  if(parseInt(document.getElementById("sortingOrder").value) && ((sortingValue == 1) || (sortingValue == 2))){
    tempArr.reverse();  
    tempArr.sort(function (a, b) {
      return a[sortingValue-1] == null ? 1 : b[sortingValue-1] == null ? -1 : (a[sortingValue-1] == b[sortingValue-1]) ? -1: null;
    });
  } 
  displayTable(tempArr)
}

//Print Record
  function printDiv(){
    var printContents = document.getElementById("panel-body").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }