function showDetail(element){
        var number = element.id
        console.log(number)
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                    toggleDetails(true)
                    
                        document.getElementById("details-number").innerHTML = number;
                        document.getElementById("submitter-guid").innerHTML = "등룩한 사람 : " + results.get("submitterguid");
                        document.getElementById("bullshitcount").label = results.get("bullshitcount").length;
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
    var number = document.getElementById("details-number").innerHTML;
    
    var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                    toggleDetails(true)
                    
                        var array = results.get("bullshitcount")
                        if(array == undefined || array == null){
                            console.log("Bullshitcount is null")
                            array = new Array();
                        }
                        var index = array.indexOf(guid);
                        if (index > -1) {
                            array.splice(index, 1);
                            console.log("bullshitcount minus")
                            document.getElementById("bullshitbtn").style.background = "black";
                            }else{
                            array.push(guid)
                            console.log("bullshitcount plus")
                            document.getElementById("bullshitbtn").style.background = "red";
                            }
                    document.getElementById("bullshitcount").label = array.length;
                        results.set("bullshitcount",array)
                        results.save(null, {
                        success: function(userIntroData) {  
                            },
                        error: function(userIntroData, error) {
                              }
                            });
              },
                error: function(error) {
                    showToast("번호가 없습니다.")
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}

function updateComment(){
}

//function searchStringInArray (str, strArray) {
//    for (var j=0; j<strArray.length; j++) {
//        if (strArray[j].match(str)) return j;
//    }
//    return -1;
//}