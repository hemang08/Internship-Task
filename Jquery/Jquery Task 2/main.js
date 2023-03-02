var key = ["names","subject","mark"];
var obj = {names:null,subject:null,mark:null}
var arr = [{names:null,subject:null,mark:null},{names:null,subject:null,mark:null},{names:null,subject:null,mark:null},{names:null,subject:null,mark:null},{names:null,subject:null,mark:null}];
    $("#addBtn").click(()=>{
        $("table tbody").append(`<tr>
        <td></td>
        <td><input class="form-control nameField" type="text" placeholder="Enter Name"></td>
        <td><input class="form-control nameField" type="text" placeholder="Subject Name"></td>
        <td><input class="form-control markField" type="text" placeholder="Mark"></td>
        <td class="d-flex justify-content-evenly">
            <button class="btn btn-outline-success">Pass</button>
            <button class="btn btn-outline-danger">Fail</button>
        </td>
        <td><button class="btn btn-outline-danger removeBtn">Remove</button></td>
    </tr>`);
    arr.push({...obj});
    });
    $('tbody').on('click','.removeBtn',function(){ 
        if(!confirm("Ohh!! \n Are You Sure To Delete This Row")){
            return;
        }
        var index =$(this).closest('tr').index();
        arr.splice(index,1);
        $(this).closest('tr').remove();

    });

    $('tbody').on('change','.nameField',function(){
        var b =$(this).closest('td').index();
        (!$(this).val().trim()=="") ? arr[$(this).closest('tr').index()][key[b-1]]= $(this).val(): $(this).val("");
    });

    $('tbody').on('keydown','.nameField', function(evt){
        let asciiValue = evt.keyCode;
        return ((asciiValue >= 32 && asciiValue <= 40) || (asciiValue >= 65 && asciiValue <= 90) || asciiValue == 46 || asciiValue == 8)? true :  false;
    });

    $('tbody').on('keydown','.markField', function(evt){
        let asciiValue = evt.keyCode;
        return ((asciiValue >= 33 && asciiValue <= 40) || (asciiValue >= 46 && asciiValue <= 57) || (asciiValue >=96 && asciiValue <=105)||asciiValue == 144||asciiValue == 110||asciiValue==190 || asciiValue == 8)? true :  false;
    });

    $('tbody').on('change','.markField', function(){
        if($(this).val()<0 || $(this).val()>100){
            alert("Wrong Input \n Please Enter Mark Between 0 to 100");
            $(this).val("");
            return;
        }
        var b =$(this).closest('td').index();
        arr[$(this).closest('tr').index()][key[b-1]]= $(this).val();
    });
    
    var totalTime  = 480;
    var timeInterval = setInterval(updateTime, 1000);
    function updateTime(){
        if(totalTime ==0){
            clearInterval(timeInterval);
            $(".loading").addClass("d-block").removeClass("d-none");
            setTimeout(function(){
            $(".loading").addClass("d-none").removeClass("d-block");
                AlertBox();
            },2500)
        }
        else{
            totalTime--;
            (totalTime==30)?$(".timming").css("color","red"):null;
            var minute = Math.floor(totalTime/60);
            $(".minutes").html(minute<10?"0"+minute: minute);
            $(".seconds").html(((totalTime%60)<10)?"0"+(totalTime%60):(totalTime%60));
        }
    }

    function AlertBox(){
        Swal.fire({
            backdrop: 'rgba(148, 211, 204, 0.7)',
            icon: 'info',
            title: 'Oops... You are running out of the time',
            text: 'Click on "OK" to restart timer',
            allowOutsideClick: false,
            showClass: {
                popup: 'animate__animated animate__fadeInTopRight'
              }
          }).then(function(){
            Swal.fire({
                toast: true,
                position: 'top-right',
                icon: 'success',
                title: 'Timer Has been Reseted',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__fadeInTopRight'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutTopRight'
                  }
            })
            totalTime = 480;
            (totalTime>30)?$(".timming").css("color","white"):null;
            timeInterval = setInterval(updateTime, 1000);
          }) 
    }
    