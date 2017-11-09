Blockly.Blocks['bloqueLed'] = {
  init: function() {
    this.appendDummyInput("Left")
        .appendField("Led")
        .appendField(new Blockly.FieldDropdown([["prender","prender"], ["apagar","apagar"],["titilar","titilar"]]), "Switch");
    this.appendDummyInput("Left")
         .appendField("PIN")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"]]), "PIN");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['wait'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(60);
    this.appendDummyInput()
        .appendField("wait")
        .appendField(new Blockly.FieldDropdown([["half a second", "500"], ["a second", "1000"], ["two seconds", "2000"], ["five seconds", "5000"]]), "DELAY");
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};




//.appendField(new Blockly.FieldNumber('2','2','13'),"PIN");
