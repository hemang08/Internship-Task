window.onload = function () {
  start();
}; 
var arr = [] /*Main Array who store all the table data */, newarr /*active while any search perform on saved data*/, mainDisplayArr = [] /*Array which store all the pass student data */;

//Refresh or Strat Fumction
function start() {
  $("#tableBody").html("");
  $("#panel").css("display","none");
  for (let i = 0; i < 5; i++) {
    addRow();
  }
}
//Add New Row Click Change
$('.container').on('click','#addBtn', function(){
  addRow();
});

// Add new Row Function
function addRow() {
  let html = `<tr> <td class="counter">` + (arr.length+1) + `</td> <td><input class="form-control textField" type="text"  placeholder="Enter Name"></td><td><input class="form-control textField" type="text" placeholder="Subject Name"></td><td><input class="form-control mark" type="text" placeholder="Mark"></td><td class="d-flex justify-content-between"><button class="btn btn-outline-success passBtn">Pass</button><button class="btn btn-outline-danger failBtn" >Fail</button></td> <td><button class="btn deleteRow"><img src="trash-can-solid.svg" alt=""></button</td></tr>`;
  $("#tableBody").append(html);
  arr.push([null, null, null, null]);
  disabled();
}

//Validation on keydown
$('tbody').on('keydown','.textField', function(evt){
  let asciiValue = evt.keyCode;
  return ((asciiValue >= 32 && asciiValue <= 40) || (asciiValue >= 65 && asciiValue <= 90) || asciiValue == 46 || asciiValue == 8|| asciiValue == 9)? true :  false;
});
$('tbody').on('keydown','.mark', function(evt){
  let asciiValue = evt.keyCode;
  return ((asciiValue >= 33 && asciiValue <= 40) || (asciiValue >= 46 && asciiValue <= 57) || (asciiValue >=96 && asciiValue <=105)||asciiValue == 144||asciiValue == 110||asciiValue==190||asciiValue==8||asciiValue==9)? true :  false;
});

//Delete Row From Table 
$('tbody').on('click','.deleteRow', function(){
  if (!confirm("Ohh!!! \n Are you sure to delete record")) {
    return;
  };
  arr.splice($(this).closest('tr').index(), 1);
  $(this).closest('tr').remove();
  var num = $(".counter");
  for (let i = 1; i <= num.length; i++) {
    num[i - 1].innerHTML = i;
  }
  disabled();
});

// Saved Button action 

$('.container').on('click','#saveBtn', function(){
  let isValid = 0 ;
  for(let i=0;i < arr.length;i++) {
    for(let j=0;j<3;j++) {
       if(arr[i][j]==null){
        isValid=1;
        break;
       }
    }
    if(isValid){
      break;
    }
  }
  if (isValid) {
    alert("Please Enter All The Value In Table");
    return;
  }
  $("#panel").css("display","block");
  $("#myInput").val("");
  $("#sortingOrder").css("display","none");
  $("#sortingOrder").val(0);
  $("#sortDrop").val(0);
  newarr =[];
  mainDisplayArr = arr.filter(function (value) { return value[3] == "pass" })
  displayTable(mainDisplayArr, "finalTableBody");
  resultTable();
});

//Pass And fail Button click event
  $(".mainTable").on('click','.passBtn',function(){
    $(this).next().attr("class", 'btn failBtn btn-outline-danger');
    $(this).attr("class", 'btn passBtn btn-success');
    updateArray($(this).closest('tr').index(), $(this).closest('td').index(), "pass");
  });
  $(".mainTable").on('click','.failBtn',function(){ 
    $(this).attr("class", 'btn btn-danger failBtn');
    $(this).prev().attr("class", 'btn passBtn btn-outline-success');
    updateArray($(this).closest('tr').index(), $(this).closest('td').index(), "fail")
  });
  //Input Field change
  $(".mainTable").on('change','.mark',function(){
    let val = parseInt($(this).val());
      if ((val < 0 || val > 100)) {
        alert("wrong Input \nEnter Mark in between 0 to 100");
        $(this).val("");
        return;
      }
    updateArray($(this).closest('tr').index(), $(this).closest('td').index(), val);
  });
  $(".mainTable").on('change','.textField',function(){
    let val = ($(this).val().trim() == "") ?null : $(this).val();
    updateArray($(this).closest('tr').index(), $(this).closest('td').index(), val);
  });

//Update Array
  function updateArray(rowIndex, columIndex, value){
    arr[rowIndex][columIndex-1] = value;
  }

//Display Result Table
function displayTable(tempArr, tableid) {
  html="";
  let columCount = $(`#${tableid}`).prev().children('tr').children('th').length;
  for (let i = 0; i < tempArr.length; i++) {
    html += `<tr> <td>` + (i + 1) + `</td>`;
    for (let j = 0; j < columCount - 1; j++) {
      (j == (columCount - 2) && parseInt(tempArr[i][j]) < 33) ? (html += `<td class="failStudent">` + tempArr[i][j] + `</td>`) : (html += `<td>` + tempArr[i][j] + `</td>`);
    }
    html += "</tr>";
  }
  $(`#${tableid}`).html(html);
}
//Search data from table
function searchResult() {
  var vlue = $("#myInput").val();
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
  let deleteBtn = $(".deleteRow");
  if (arr.length <= 5) {
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
  $("#sortingOrder").css("display","block");
  tempArr =  (newarr.length==0) ? [...mainDisplayArr] : [...newarr];
  let sortingValue = parseInt($("#sortDrop").val());
  switch (sortingValue) {
    case 0:
      $("#sortingOrder").val(0);
      $("sortingOrder").css("display","none");
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
  if (parseInt($("#sortingOrder").val()) && ((sortingValue == 1) || (sortingValue == 2))) {
    tempArr.reverse();
    tempArr.sort(function (a, b) {
      return (a[sortingValue - 1] == b[sortingValue - 1]) ? -1 : null;
    });
  }
  displayTable(tempArr, "finalTableBody")
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
//Print 
$(".printBtn").off().on('click','button',function(){
  window.print();
});