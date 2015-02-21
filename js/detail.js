function showDetail(element) {
            var number = element.id;
            console.log(number)
            var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
            var query = new Parse.Query(BullshITBankDB);
            query.equalTo("phone", number);
            query.first({
                success: function(results) {
                        toggleDetails(true)
                        document.getElementById("details-number").innerHTML = number;
                        document.getElementById("submitter-guid").innerHTML = "등룩한 사람 : " + results.get("submitterguid");
                        if(results.get("bullshitcount") != undefined){
                        document.getElementById("bullshitcount").innerHTML = results.get("bullshitcount").length;
                        }else{
                            document.getElementById("bullshitcount").innerHTML = "0";
                        }
                        loadComments()
                        setBullshitBtnState()
              },
                error: function(error) {}
                    });
}

function toggleDetails(boolean){
    var area = document.getElementById("deails-section");
    area.opened = boolean;
}

function updateCount(){
    document.getElementById("bullshitbtn").style.background = "black";
    document.getElementById("bullshitcount").innerHTML = "0";
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
                            array = new Array()
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
                    document.getElementById("bullshitcount").innerHTML = array.length;
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
    console.log("loading comments")
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
                    });
}


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
                    if(array!=undefined){
                    document.getElementById("bullshitcount").innerHTML = array.length;
                    }else{
                        document.getElementById("bullshitcount").innerHTML = "0";
                    }
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
//$("#comment-input").submit(function(){
//      loadComments()
//}
