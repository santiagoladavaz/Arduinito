import { sacarPin } from '../customtateti';



  var pines = [["1","1"], ["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"]];
  var app = angular.module("tercerEj", ['btford.socket-io']);
  var mySocket = app.factory('mySocket',function(socketFactory){
    return socketFactory();
  });

  app.controller("tercerEjercicioController", function($scope,mySocket) {

    var board =  [[null,null,null],
                  [null,null,null],
                  [null,null,null]];

    function getInitialBoard() {
      return [
        [null,null,null],
        [null,null,null],
        [null,null,null]];
    }

    // Devuelve las coordenadas como [fila,columna] de las posiciones
    // libres del tablero
    function getFreePositions(board) {
      var freePositions = [];
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            freePositions.push([row, col]);
          }
        }
      }
      return freePositions;
    }



    function winner(board) {

      // verificar columnas
      for (var c = 0; c <= 2; c++) {
        if (tatetiCol(c, board))
           validarGanador(board[0][c]);
      }
      // verificar filas
      for (var r = 0; r <= 2; r++) {
        if (tatetiRow(r, board))
         validarGanador( board[r][0]) ;
      }
      // verificar diagonales
      if (tatetiDiagonals(board))
         validarGanador(board[1][1]);
      // verificar empate
      if (getFreePositions(board) == 0)
        bootbox.alert("Hubo empate!");

      return null;
    }

    // 12
    // True si las celdas de la columna indicada son iguales y no nulas
    function tatetiCol(col, board) {
      return board[0][col] != null
          && (board[0][col] == board[1][col] && board[1][col] == board[2][col]);
    }

    // 13
    // True si las celdas de la fila indicada son iguales y no nulas
    function tatetiRow(row, board) {
      return board[row][0] != null
          && (board[row][0] == board[row][1] && board[row][1] == board[row][2]);
    }


    // 14
    // True si alguna de las diagonales tienen valores iguales y no nulos
    function tatetiDiagonals(board) {
      return (board[0][0] != null && (board[0][0] == board[1][1] && board[1][1] == board[2][2]))
        || (board[0][2] != null && (board[0][2] == board[1][1] && board[1][1] == board[2][0]));
    }

  Blockly.JavaScript["bloquePlayer1"] = function(block) {
    var dropdown_switch = block.getFieldValue("Switch");
    var pin = block.getFieldValue("PIN");
    removePinUsed(pin);
    removerCss("led-" + dropdown_switch,pin,dropdown_switch);
    swapPlayer2();
    winner(board);
    var code = "mySocket.emit('led:" + dropdown_switch + "'," + pin + ");";
    sacarPin(pin);
    return code;
  };


  Blockly.JavaScript["bloquePlayer2"] = function(block) {
    var dropdown_switch = block.getFieldValue("Switch");
    var pin = block.getFieldValue("PIN");
    removerCss("led-" + dropdown_switch,pin,dropdown_switch);
    var code = "mySocket.emit('led:" + dropdown_switch + "'," + pin + ");";
    swapPlayer1();
    winner(board);
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
                //generarDropdown();
            }catch(e){
              alert(e);
            }
      };


      function removerCss(newClass,pin){

       var clase = $('#led'+ pin).attr('class');

       $( "#led"+ pin).removeClass(clase).addClass(newClass);

       pin = pin - 1;
       var row = Math.floor(pin / 3);
       var col = (pin % 3);

       board[row][col] = newClass;

   };



      function swapPlayer2(){
            $('#btnPlayerTwo').prop('disabled', false);
            $('#btnPlayerOne').prop('disabled', true);
          };

     function swapPlayer1(){
          $('#btnPlayerOne').prop('disabled', false);
          $('#btnPlayerTwo').prop('disabled', true);
      }


        function remover(myArray,toRemove){
          for( var i=myArray.length - 1; i>=0; i--){
          for( var j=0; j<toRemove.length; j++){
             if(myArray[i][1] && (myArray[i][1] === toRemove[j][1])){
             	myArray.splice(i, 1);
             	}
             }
          }
          };

        function removePinUsed(pin){
          remover(pines,[pin,pin]);
        };

        function validarGanador(clase){
          if (clase =='led-prender'){
            bootbox.alert(' Gano el jugador 1');
          }
          else{
            bootbox.alert(' Gano el jugador 2');
          }
        }
  })
