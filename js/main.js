function addBullshITtask(){
      var input = document.getElementById("newnum").value;
    if(input.length>=6){
         console.log(input)
         console.log(guid)
       duplicationCheck()
    }else{
        showToast("입력하신 번호가 너무 짧습니다. : "+input.toString());
    }
        
}

function searchBullshITtask(){
        document.getElementById("results").innerHTML = "";
        showToast("찾는 중...")
        var input = document.getElementById("findnum").value;
        console.log(input)
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.startsWith("phone", input.toString());
            query.find({
                success: function(results) {
                    showToast(results.length+"개의 번호를 찾음")
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var phone = object.get('phone');
                        var submitterip = object.get('submitterguid');
                        var element = '<paper-item id="'+phone+'" onclick="showDetail(this)">'+phone+'</paper-item>'
                        $('#results').append(element);
                    }
              },
                error: function(error) {
                    showToast("번호가 없습니다.")
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}

function searchBullshIT(){
    if (event.keyCode == 13){
        searchBullshITtask()
    }
}

function addBullshIT(){
    if (event.keyCode == 13){
     addBullshITTask()
        }
}

function duplicationCheck(){
        var input = document.getElementById("newnum").value;
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", input.toString());
            query.first({
                success: function(results) {
                    if(results !=undefined){
                    showToast("이미 저장된 번호입니다.")
                    }else{
                        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
                        var bullshITBankDB = new BullshITBankDB();
                        bullshITBankDB.set("phone",input.toString())
                        bullshITBankDB.set("submitterguid",guid)
                        bullshITBankDB.save().then(function(object) {
                        showToast("입력하신 번호가 저장되었습니다. : "+input.toString());
    });
                    }
              },
                error: function(error) {
                    showToast("번호가 없습니다.")
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}