  var app = angular.module("tercerEj", ['btford.socket-io']);
  var mySocket = app.factory('mySocket',function(socketFactory){
    return socketFactory();
  });
  app.controller("tercerEjercicioController", function($scope,mySocket) {

  Blockly.JavaScript["bloquePlayer1"] = function(block) {
    var code;
    var dropdown_switch = block.getFieldValue("Switch");
    var pin = block.getFieldValue("PIN");
    console.log("entre")
    removerCss("led-" + dropdown_switch,pin,dropdown_switch);
    swapPlayer2();
    code = "mySocket.emit('led:" + dropdown_switch + "'," + pin + ");";
    return code;
  };


  Blockly.JavaScript["bloquePlayer2"] = function(block) {
    var code;
    var dropdown_switch = block.getFieldValue("Switch");
    var pin = block.getFieldValue("PIN");
    removerCss("led-" + dropdown_switch,pin,dropdown_switch);
    code = "mySocket.emit('led:" + dropdown_switch + "'," + pin + ");";
    swapPlayer1();
    return code;
  };



       $scope.runCode = function (){
  		     // $("#leds").html('');
            window.LoopTrap = 1000;
            Blockly.JavaScript.INFINITE_LOOP_TRAP =
                'if(--window.LoopTrap == 0) throw "Inifinite Loop";\n';
            var code = Blockly.JavaScript.workspaceToCode(workspace);
            var code = Blockly.JavaScript.workspaceToCode(workspace2);
            Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
            try{
                if (Blockly.mainWorkspace !== null) 
                {
                    Blockly.mainWorkspace.clear();
                }
                eval(code);
            }catch(e){
              alert(e);
            }
      };


      function removerCss(newClass,pin,estado){

        var tooltip;
        switch(estado) {
        case "prender":
            tooltip = "Prendido";
            break;
        case "apagar":
             tooltip = "Apagado";
            break;
        case "titilar":
            tooltip = "Titilando";
        }

    		if($("#" + pin).hasClass('led-prender') || $("#" + pin).hasClass('led-apagar') || $("#" + pin).hasClass('led-titilar') )
    		{
    			var clase = $('#'+ pin).attr('class');
    			$( "#"+ pin).removeClass(clase).addClass(newClass);
    		}
    		else
    		{
    			var html = "<div class='led-box'> <div id ='"+ pin + "' class='" + newClass + "' data-toggle='tooltip' title=' Led "+pin+ ": "+ tooltip +"'></div></div>";
    			$("#leds").append(html);
    		}
      };


      function swapPlayer2(){
            $('#btnPlayerTwo').prop('disabled', false);
            $('#btnPlayerOne').prop('disabled', true);
          };

     function swapPlayer1(){
          $('#btnPlayerOne').prop('disabled', false);
          $('#btnPlayerTwo').prop('disabled', true);
      }

  })
