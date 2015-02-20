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
                    loadComments()
                    setBullshitBtnState()
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
    document.getElementById("bullshitbtn").style.background = "black";
    document.getElementById("bullshitcount").label = 0;
    var number = document.getElementById("details-number").innerHTML;
    
    var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                    toggleDetails(true)
                    
                        var array = results.get("bullshitcount")
                        if(array == null){
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
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
    
}

function updateComments(){
    if (event.keyCode == 13){
      loadComments()
        }
}

function loadComments(){
 var newcomment = document.getElementById("comment-input").value;
    var number = document.getElementById("details-number").innerHTML;
    var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                    toggleDetails(true)
                    
                        var array = results.get("comments")
                        if(array == null || array == undefined){
                            array = new Array();
                        }
                        if(newcomment == "" || (newcomment == null || newcomment == undefined)){}else{
                            array.push(newcomment+"["+guid+"]");
                        }
                        results.set("comments",array)
                        results.save(null, {
                        success: function(userIntroData) {  
                            },
                        error: function(userIntroData, error) {
                              }
                            });
                        
                        document.getElementById("comments").innerHTML="";
                        for(var i=0; i<array.length; i++){
                            var element = "<p>"+array[i]+"</p><br>";
                            $('#comments').append(element);
                        }
                        
              },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });}


function setBullshitBtnState(){
    
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
                            document.getElementById("bullshitbtn").style.background = "red";
                            }else{
                            document.getElementById("bullshitbtn").style.background = "black";
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
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
    
}