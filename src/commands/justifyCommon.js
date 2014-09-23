(function(wysihtml5) {
  var NODE_NAME = "IMG";
  var TEXT_COMMANDS = {left: "justifyLeft", right: "justifyRight", center: "justifyCenter"};
  var IMAGE_CLASSES = {left: "wysiwyg-float-left", right: "wysiwyg-float-right", center: ""};
  wysihtml5.commands.justifyCommon = {
    // value in left right center
    exec: function(composer, command, value) {
      var image = this.state(composer);
      if (image){
        if (image.className === IMAGE_CLASSES[value]) {
          image.className = "";
        } else {
          image.className = IMAGE_CLASSES[value];
        }
      }else{
        text_command = TEXT_COMMANDS[value]
        return wysihtml5.commands[text_command].exec(composer, text_command);
      }
    },

    state: function(composer, command) {
      var selectedNode = composer.selection.getSelectedNode();
      if (selectedNode && selectedNode.nodeName === NODE_NAME)
        return selectedNode;
      if (selectedNode && selectedNode.nodeName === 'SPAN' && selectedNode.className === 'image-wrapper')
        if (selectedNode.childNodes.length === 1 && selectedNode.childNodes[0].nodeName === NODE_NAME)
          return selectedNode.childNodes[0]
      return false;
    }
  };
})(wysihtml5);
