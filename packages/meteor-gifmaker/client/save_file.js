Meteor.saveFile = function (event) {
    FS.Utility.eachFile(event, function (file) {
        // Logging debug info
        console.log('file: ', file)
        var newFile = new FS.File(file);
        Images.insert(newFile, function (error, result) {
            if (error) {
                console.log("Error uploading image");
            } else {
                var numOfImages = Meteor.count();
                if (!!event.currentTarget.labels) {
                    event.currentTarget.labels[numOfImages - 1].innerHTML = file.name;
                }
                else { 
                    var $labelImages = document.getElementsByClassName("label-image");
                    $labelImages[numOfImages - 1].innerHTML = file.name;
                }
                console.log("successful upload");
            }
        });
    });
}

Meteor.count = function () {
    return Images.find().count();
}

Meteor.clearImages = function (event) {
    Images.find().forEach(function (file) {
        file.remove();
    });
}

Meteor.handleClear = function (event) {
    Meteor.clearImages();
    var displayNode = document.getElementById('displayGIF')
    while (displayNode.hasChildNodes()) {
        displayNode.removeChild(displayNode.lastChild);
    }
    var $labelImages = document.getElementsByClassName('label-image');
    for (var i = 0; i < $labelImages.length; i++) {
        $labelImages[i].innerHTML = '';
    }
}
