function showDetail(element){
        var number = element.id
        console.log(number)
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                    toggleDetails(true)
//                    
//                        var object = results[i];
//                        var phone = object.get('phone');
//                        var submitterip = object.get('submitterip');
//                        var element = '<paper-item onclick="showDetail("'+phone+'">'+phone+'</paper-item>'
//                        $('#results').append(element);
                    
                        document.getElementById("details-number").innerHTML = number;
                        document.getElementById("submitter-guid").innerHTML = "등룩한 사람 : " + results.get("submitterguid");
              },
                error: function(error) {
                    showToast("번호가 없습니다.")
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}

function toggleDetails(boolean){
    var area = document.getElementById("deails-section");
    area.opened = boolean;
}

function updateCount(){
}

function updateComment(){
}