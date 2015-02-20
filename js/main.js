function addBullshITtask(){
      var input = document.getElementById("newnum").value;
        console.log(input)
         console.log(guid)
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var bullshITBankDB = new BullshITBankDB();
        bullshITBankDB.set("phone",input.toString())
        bullshITBankDB.set("submitterguid",guid)
        bullshITBankDB.save().then(function(object) {
            showToast("입력하신 번호가 저장되었습니다. : "+input.toString());
    });
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